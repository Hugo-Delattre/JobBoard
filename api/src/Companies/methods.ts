import { Request, Response } from "express";
import { Connection } from "mysql2/promise";

export default (
	db: Connection
): Record<string, (req: Request, res: Response) => Promise<void>> => {
	const getCompany = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(
				`
				SELECT *, c.id
				FROM companies c
				LEFT JOIN users u
				ON u.id = c.userId
			  	WHERE c.id = ${id};
				`
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
			const [result] = await db.query(
				`
				SELECT *
				FROM companies c
				LEFT JOIN users as u
				ON u.id = c.userId;
				`
			);
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
				`INSERT INTO companies
				(
					name,
					sector,
					representative
				)
				VALUES
				(
					"${name}",
					"${sector}",
					"${representative}"
				);
				`
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

	const deleteCompany = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		try {
			const [result] = await db.query(`DELETE FROM companies WHERE id = ${id}`);
			const deletedCount = result["affectedRows" as keyof typeof result];

			if (deletedCount > 0)
				res.status(200).json({ message: `Company ${id} deleted.` });
			else res.status(404).json({ message: `Couldn't find company ${id}` });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return { getCompany, getCompanies, postCompany, putCompany, deleteCompany };
};
