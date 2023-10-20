import { Request, Response } from "express";
import { Connection } from "mysql2/promise";

export default (
	db: Connection
): Record<string, (req: Request, res: Response) => Promise<void>> => {
	const getApplication = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(
				`
				SELECT a.*,
				(
					SELECT JSON_OBJECT(
						'id', c.id,
						'name', c.name,
						'sector', c.sector
					)
					FROM advertisements ads
					WHERE ads.id = a.advertisementId
				) AS advertisement
				FROM applications a
				WHERE a.id = ${id};
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

	const getApplications = async (req: Request, res: Response): Promise<void> => {
		try {
			const [result] = await db.query(
				`
				SELECT *, a.id
				FROM applications a
				INNER JOIN advertisements ads
				ON ads.id = a.advertisementId;
				`
			);

			const advertisements = result;

			res.status(200).json({ data: advertisements });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const postApplication = async (req: Request, res: Response): Promise<void> => {
		const keys = Object.keys(req.body);

		if (!keys.includes("message")) {
			res.status(400).json({ message: "Missing message." });
			return;
		}

		try {
			const [result] = await db.query(
				`INSERT INTO applications (${keys.join(",")}) VALUES (${keys
					.map((key) => `"${req.body[key]}"`)
					.join(",")})`
			);

			if ("insertId" in result) {
				const id = result.insertId;
				res.status(200).json({ id });
			} else {
				res.status(500).json({ message: "Unexpected result from database query." });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const putApplication = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const keys = Object.keys(req.body);

		if (!keys.length) {
			res.status(400).json({ message: "No fields provided." });
			return;
		}

		try {
			const [result] = await db.query(
				`UPDATE applications SET ${keys
					.map((key) => `${key} = "${req.body[key]}"`)
					.join(",")} WHERE id = ${id};
				`
			);

			const modifiedCount = result["affectedRows" as keyof typeof result];

			if (modifiedCount > 0)
				res.status(200).send({ message: `Application ${id} modified.` });
			else res.status(404).json({ message: `Couldn't find application ${id}` });
		} catch (error) {
			res.status(500).json(error);
		}
	};

	const deleteApplication = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(`DELETE FROM applications WHERE id = ${id}`);
			const deletedCount = result["affectedRows" as keyof typeof result];

			if (deletedCount > 0)
				res.status(200).json({ message: `Application ${id} deleted.` });
			else res.status(404).json({ message: `Couldn't find application ${id}` });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return {
		getApplication,
		getApplications,
		postApplication,
		putApplication,
		deleteApplication,
	};
};
