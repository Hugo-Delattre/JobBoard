import { Request, Response } from "express";
import { User } from "./model";

export const getUsers = (req: Request, res: Response): void => {
	try {
		const users = User.findAll();
		res.status(200).json(users);
	} catch (error) {
		res.status(500);
	}
};

export const postUsers = (req: Request, res: Response) => {
	const {
		firstname,
		lastname,
		email,
		password,
		profile_picture,
		company,
		resume
	} = req.body;

	res.send();
};
