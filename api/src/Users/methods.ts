import { Request, Response } from "express";
import { Connection } from "mysql2/promise";

export default (db: Connection) => {
	const getUser = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(
				`
				SELECT u.*,
				(
					SELECT JSON_OBJECT(
						'id', c.id,
						'name', c.name,
						'sector', c.sector
					)
					FROM companies c
					WHERE c.representative = u.id
				) AS company
				FROM users u
				WHERE u.id = ${id};
				`
			);

			const user = result[0 as keyof typeof result];
			if (user)
				res.status(200).json({
					data: user,
				});
			else res.status(400).json({ message: `Couldn't find user ${id}.` });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const getUsers = async (req: Request, res: Response): Promise<void> => {
		try {
			const [result] = await db.query(
				`
				SELECT u.*,
				(
					SELECT JSON_OBJECT(
						'id', c.id,
						'name', c.name,
						'sector', c.sector
					)
					FROM companies c
					WHERE c.representative = u.id
				) AS company
				FROM users u
				`
			);

			const users = result;
			res.status(200).json({ data: users });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const postUser = async (req: Request, res: Response): Promise<void> => {
		const keys = Object.keys(req.body);

		if (!keys.includes("firstName")) {
			res.status(400).json({ message: "First name(firstName) is missing." });
			return;
		}

		if (!keys.includes("lastName")) {
			res.status(400).json({ message: "Last name(lastName) is missing." });
			return;
		}

		if (!keys.includes("email")) {
			res.status(400).json({ message: "Email(email) is missing." });
			return;
		}

		if (!keys.includes("password")) {
			res.status(400).json({ message: "Password(password) is missing." });
			return;
		}

		try {
			const [result] = await db.query(
				`
				INSERT INTO users(${keys.map((key) => key).join(",")})
				VALUES (${keys.map((key) => `"${req.body[key]}"`).join(",")});
				`
			);

			const id = result["insertId" as keyof typeof result];
			res.status(200).json({ id });
		} catch (error) {
			console.log(error);
			res.status(400).json(error);
		}
	};

	const putUser = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const keys = Object.keys(req.body);

		if (!keys.length) {
			res.status(400).json({ message: "No fields provided." });
			return;
		}

		try {
			const [result] = await db.query(
				`UPDATE users SET ${keys
					.map((key) => `${key} = "${req.body[key]}"`)
					.join(",")} WHERE id = ${id};
				`
			);

			const modifiedCount = result["affectedRows" as keyof typeof result];

			if (modifiedCount > 0)
				res.status(200).send({ message: `User ${id} modified.` });
			else res.status(400).json({ message: `Couldn't find user ${id}` });
		} catch (error) {
			res.status(400).json(error);
		}
	};

	const deleteUser = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(`DELETE FROM users WHERE id = ${id}`);
			const deletedCount = result["affectedRows" as keyof typeof result];

			if (deletedCount > 0)
				res.status(200).json({ message: `User ${id} deleted.` });
			else res.status(404).json({ message: `Couldn't find user ${id}` });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return { getUser, getUsers, postUser, putUser, deleteUser };
};
