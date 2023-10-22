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

				users.push(
					Object.assign(user, {
						firstName: faker.person.firstName(),
						lastName: faker.person.lastName(),
						gender: faker.helpers.arrayElement(["male", "female", "other"]),
						email: faker.internet.email(),
						password: faker.internet.password(),
						role: faker.helpers.arrayElement(["user", "admin"]),
						profilePicture: faker.internet.avatar(),
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

	const generateCompanies = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { number } = req.body;
		const companies = [];

		try {
			for (let i = 0; i < number; i++) {
				const company = {
					name: faker.company.name(),
					sector: faker.commerce.department(),
				};

				companies.push(company);

				const companyKeys = Object.keys(company).join(",");
				const companyValues = Object.values(company).map((value) => `"${value}"`);
				await db.query(
					`
				INSERT INTO companies (${companyKeys})
				VALUES (${companyValues})
				`
				);
			}

			res.status(200).json({ data: companies });
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
					companyId: companyId,
					description: faker.lorem.paragraphs(2),
					salary: faker.helpers.rangeToNumber({ min: 10, max: 30 }),
					location: faker.location.city(),
					workingHours: faker.helpers.arrayElement([15, 24, 35]),
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

	const generateApplications = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { number, advertisementId } = req.body;
		const applications = [];

		try {
			for (let i = 0; i < number; i++) {
				const application = {
					firstName: faker.person.firstName(),
					lastName: faker.person.lastName(),
					email: faker.internet.email(),
					phone: faker.phone.number(),
					message: faker.lorem.paragraphs(),
					advertisementId: advertisementId,
				};

				applications.push(application);

				const applicationKeys = Object.keys(application).join(",");
				const applicationValues = Object.values(application).map(
					(value) => `"${value}"`
				);

				await db.query(
					`
					INSERT INTO applications (${applicationKeys})
					VALUES (${applicationValues});
					`
				);
			}

			res.status(200).json({ data: applications });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	};

	return {
		generateUsers,
		generateCompanies,
		generateAdvertisements,
		generateApplications,
	};
};
