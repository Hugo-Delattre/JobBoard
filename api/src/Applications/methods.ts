import { Request, Response } from "express";
import { Connection } from "mysql2/promise";

export default (
	db: Connection
): Record<string, (req: Request, res: Response) => Promise<void>> => {
	const getApplications = async (req: Request, res: Response): Promise<void> => {
		try {
			const [result] = await db.query(
				`
				SELECT *
				FROM applications
				INNER JOIN advertisements
				ON advertisements.id = applications.advertisementId;
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

	return { getApplications, postApplication };
};
