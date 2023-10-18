import { Connection } from "mysql2/promise";
import { faker } from "@faker-js/faker";
import { Request, Response } from "express";

export default (db: Connection) => {
	const generateUsers = async (req: Request, res: Response): Promise<void> => {
		const { number } = req.body;

		const users = [];

		try {
			for (let i = 0; i < number; i++) {
				const response = await fetch(faker.internet.avatar());
				const blob = await response.blob();
				const data = await blob.arrayBuffer();
				const base64 = Buffer.from(data).toString("base64");
				const base64Url = `data:${blob.type};base64,${base64}`;

				const result = await db.query(
					`INSERT INTO uploads (url) VALUES ("${base64Url}");`
				);

				const uploadId = result[0]["insertId" as keyof (typeof result)[0]];

				users.push({
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
					gender: faker.person.sex(),
					email: faker.internet.email(),
					password: faker.internet.password(),
					profilePicture: uploadId,
					resume: null,
					role: faker.helpers.arrayElement(["user", "admin"]),
					company: faker.helpers.rangeToNumber({ min: 1, max: 1 }),
				});

				await db.query(
					`
				INSERT INTO users (
				    firstName,
				    lastName,
				    gender,
				    email,
				    password,
				    profilePicture,
				    role
				) VALUES (
				    "${users[i].firstName}",
				    "${users[i].lastName}",
				    "${users[i].gender}",
				    "${users[i].email}",
				    "${users[i].password}",
				    "${users[i].profilePicture}",
				    "${users[i].role}"
				);
				`
				);
			}
			res.status(200).json({ data: users });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return { generateUsers };
};
