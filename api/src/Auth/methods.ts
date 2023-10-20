import { Request, Response } from "express";
import { Connection } from "mysql2/promise";

export default (
	db: Connection
): Record<string, (req: Request, res: Response) => Promise<void>> => {
	const register = async (req: Request, res: Response) => {
		const keys = Object.keys(req.body);

		try {
			const [result] = await db.query(
				`
                INSERT INTO users (
                    ${keys.join(",")}
                )
                VALUES
                (
                    ${keys.map((key) => `"${req.body[key]}"`)}
                );
                `
			);

			const id = result["insertId" as keyof typeof result];

			res.status(200).json({ id });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const login = async (req: Request, res: Response) => {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(404).json({ message: "Missing email or password." });
			return;
		}

		try {
			const [result] = await db.query(
				`
                SELECT id, email, password, role
                FROM users
                WHERE email = "${email}";
                `
			);

			const user = result[0 as keyof typeof result];

			if (!user || password !== user["password" as keyof typeof user])
				res.status(404).json({ message: "Invalid credentials." });
			else {
				const id = user["id" as keyof typeof user];
				const role = user["role" as keyof typeof user];

				res.status(200).json({ id, role });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return { register, login };
};
