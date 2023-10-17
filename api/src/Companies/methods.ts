import { Request, Response } from "express";
import { Connection } from "mysql2/promise";

export default (
	db: Connection
): Record<string, (req: Request, res: Response) => Promise<void>> => {
	const getCompany = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(
				`SELECT c.*,
				(
				  SELECT JSON_OBJECT(
					'id', u.id,
					'firstName', u.firstName,
					'lastName', u.lastName,
					'email', u.email,
					'company', u.company
				  )
				  FROM users u
				  WHERE u.id = c.representative
				) AS representative
			  FROM companies c
			  WHERE c.id = ${id};`
			);

			const company = result[0 as keyof typeof result];
			res.status(200).json({ data: company });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const getCompanies = async (req: Request, res: Response): Promise<void> => {
		try {
			const [result] = await db.query("SELECT * FROM companies;");
			const companies = result;
			res.status(200).json({ data: companies });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const postCompany = async (req: Request, res: Response): Promise<void> => {
		const { name, sector, representative } = req.body;

		try {
			const [status] = await db.query(
				`INSERT INTO companies (name, sector, representative) VALUES ("${name}", "${sector}", "${representative}");`
			);

			res.status(200).json(status);
		} catch (error) {
			res.status(400).json(error);
		}
	};

	const putCompany = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const [status] = await db.query(
				`UPDATE companies SET ${Object.keys(req.body).map(
					(key) => `${key}=${req.body[key]} `
				)}WHERE id = ${id};`
			);
			res.status(200).json(status);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return { getCompany, getCompanies, postCompany, putCompany };
};
