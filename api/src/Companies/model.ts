import { DataTypes } from "sequelize";
import db from "../db";

export const Company = db.define(
	"Company",
	{
		id: {
			primaryKey: true,
			type:       DataTypes.INTEGER,
		},
		name:           DataTypes.STRING,
		representative: DataTypes.INTEGER,
		advertisements: DataTypes.INTEGER,
		sector:         DataTypes.STRING,
	},
	{ underscored: true }
);
