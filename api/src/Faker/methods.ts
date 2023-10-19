import { Connection } from "mysql2/promise";
import { faker } from "@faker-js/faker";
import { Request, Response } from "express";

export default (db: Connection) => {
	const generateUsers = async (req: Request, res: Response): Promise<void> => {
		const { number } = req.body;
		const users = [];

		try {
			for (let i = 0; i < number; i++) {
				const user = {};

				const response = await fetch(faker.internet.avatar());
				const blob = await response.blob();
				const data = await blob.arrayBuffer();
				const base64 = Buffer.from(data).toString("base64");
				const base64Url = `data:${blob.type};base64,${base64}`;

				users.push(
					Object.assign(user, {
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
						gender: faker.person.sex(),
						email: faker.internet.email(),
						password: faker.internet.password(),
						role: faker.helpers.arrayElement(["user", "admin"]),
						profilePicture: base64Url,
					})
				);

				const userKeys = Object.keys(user).join(",");
				const userValues = Object.values(user).map((value) => `"${value}"`);

				await db.query(
					`
					INSERT INTO users (${userKeys})
					VALUES (${userValues});
					`
				);
			}
			res.status(200).json({ data: users });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	const generateAdvertisements = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { number, companyId } = req.body;
		const advertisements = [];

		try {
			for (let i = 0; i < number; i++) {
				const advertisement = {
					title: faker.person.jobTitle(),
					company: companyId,
					description: faker.lorem.paragraphs(2),
					salary: faker.helpers.rangeToNumber({ min: 10, max: 30 }),
					location: faker.location.city(),
					workingHours: faker.helpers.rangeToNumber({ min: 24, max: 45 }),
					type: faker.helpers.arrayElement([
						"CDD",
						"CDI",
						"Seasonnal",
						"Internship",
						"Interim",
					]),
					active: 1,
				};

				advertisements.push(advertisement);

				const advertisementKeys = Object.keys(advertisement).join(",");
				const advertisementValues = Object.values(advertisement).map(
					(value) => `"${value}"`
				);

				await db.query(
					`
					INSERT INTO advertisements (${advertisementKeys})
					VALUES (${advertisementValues});
					`
				);
			}
			res.status(200).json({ data: advertisements });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return { generateUsers, generateAdvertisements };
};
