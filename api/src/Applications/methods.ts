import { Request, Response } from "express";
import { Connection } from "mysql2/promise";
import { ResultSetHeader } from "mysql2/promise";

export default (
	db: Connection
): Record<string, (req: Request, res: Response) => Promise<void>> => {
	const postApplication = async (req: Request, res: Response): Promise<void> => {
		const keys = Object.keys(req.body);

		if (!keys.includes("resume")) {
			res.status(400).json({ message: "Missing resume." });
			return;
		}

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

	return { postApplication };
};
