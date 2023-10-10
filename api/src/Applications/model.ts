import { DataTypes, NOW } from "sequelize";
import db from "../db";

export const Application = db.define("Company", {
	id: {
		primaryKey: true,
		type:       DataTypes.INTEGER,
	},
	applicant:        DataTypes.INTEGER,
	resume:           DataTypes.TEXT,
	message:          DataTypes.TEXT,
	application_date: {type: DataTypes.DATE, defaultValue: NOW}
}, {underscored: true});