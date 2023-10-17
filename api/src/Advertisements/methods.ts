import { Request, Response } from "express";
import { Connection } from "mysql2/promise";

export default (
	db: Connection
): Record<string, (req: Request, res: Response) => Promise<void>> => {
	const getAdvertisement = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(
				`
				SELECT a.*,
				(
					SELECT JSON_OBJECT(
						'id', c.id,
						'name', c.name,
						'sector', c.sector,
						'representative',
						(
							SELECT JSON_OBJECT(
								'id', u.id,
								'firstName', u.firstName,
								'lastName', u.lastName,
								'email', u.email
							)
							FROM users u
							WHERE u.id = c.representative
						)
					)
					FROM companies c
					WHERE c.id = a.company
				) AS company
			  	FROM advertisements a
			  	WHERE a.id = ${id};
				`
			);

			const advertisement = result[0 as keyof typeof result];
			res.status(200).json({ data: advertisement });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const getAdvertisements = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const [result] = await db.query(
				`
				SELECT a.*,
				(
					SELECT JSON_OBJECT(
						'id', c.id,
						'name', c.name,
						'sector', c.sector,
						'representative',
						(
							SELECT JSON_OBJECT(
								'id', u.id,
								'firstName', u.firstName,
								'lastName', u.lastName,
								'email', u.email
							)
							FROM users u
							WHERE u.id = c.representative
						)
					)
					FROM companies c
					WHERE c.id = a.company
				) AS company
			  	FROM advertisements a;
				`
			);
			const advertisements = result;
			res.status(200).json({ data: advertisements });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const postAdvertisement = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const keys = Object.keys(req.body);

		if (!keys.includes("title")) {
			res.status(400).json({ message: "Error: Title is missing." });
			return;
		}

		if (!keys.includes("company")) {
			res.status(400).json({ message: "Error: Company is missing." });
			return;
		}

		try {
			const [result] = await db.query(`
			INSERT INTO advertisements (
				${keys.join(",")}
			) VALUES (
				${keys.map((key) => `"${req.body[key]}"`).join(",")}
			)`);

			const id = result["insertId" as keyof typeof result];

			res.status(200).json({ id });
		} catch (error) {
			res.status(400).json(error);
		}
	};

	const putAdvertisement = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { id } = req.params;
		const keys = Object.keys(req.body);

		if (!keys.length) {
			res.status(400).json({ message: "No fields provided." });
			return;
		}

		try {
			const [result] = await db.query(
				`UPDATE advertisements SET ${keys
					.map((key) => `${key} = "${req.body[key]}"`)
					.join(",")} WHERE id = ${id};
				`
			);

			const modifiedCount = result["affectedRows" as keyof typeof result];

			if (modifiedCount > 0)
				res.status(200).send({ message: `Advertisement ${id} modified.` });
			else res.status(400).json({ message: `Couldn't find advertisement ${id}` });
		} catch (error) {
			res.status(400).json(error);
		}
	};

	const deleteAdvertisement = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(
				`DELETE FROM advertisements WHERE id = ${id}`
			);
			const deletedCount = result["affectedRows" as keyof typeof result];

			if (deletedCount > 0)
				res.status(200).json({ message: `Advertisement ${id} deleted.` });
			else res.status(400).json({ message: `Couldn't find advertisement ${id}` });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return {
		getAdvertisement,
		getAdvertisements,
		postAdvertisement,
		putAdvertisement,
		deleteAdvertisement,
	};
};
