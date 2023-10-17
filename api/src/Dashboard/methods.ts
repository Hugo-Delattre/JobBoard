import { Request, Response } from "express";
import { Connection } from "mysql2/promise";
import { Column, RemoteColumn } from "~/types/Database";
import { parseColumn } from "~/utils/parsing";

export default (db: Connection) => {
	const getTables = async (req: Request, res: Response): Promise<void> => {
		try {
			const [result] = await db.query("SHOW TABLES;");
			const tables: string[] = [];

			(result as Array<Record<string, string>>).forEach((r) =>
				tables.push(...Object.values(r))
			);
			res.status(200).json({ data: tables });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const getColumns = async (req: Request, res: Response): Promise<void> => {
		const { table } = req.params;

		try {
			const queryResult = await db.query(`DESCRIBE ${table};`);
			const result: RemoteColumn[] = queryResult[0] as RemoteColumn[];
			const columns: Column[] = [];

			console.log(queryResult);

			result.forEach((r: RemoteColumn) => {
				columns.push(parseColumn(r));
			});

			res.status(200).json({ data: columns });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return { getTables, getColumns };
};
