import { Request, Response } from "express";
import db from "../db";

export const getAdvertisements = (req: Request, res: Response): void => {
	try {
		// const advertisements = db.query("SELECT * FROM `advertisements`;");
		// res.status(200).json(advertisements);
	} catch (error) {
		res.status(500);
	}
};
