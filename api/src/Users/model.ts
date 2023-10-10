import db from "../db";
import { DataTypes } from "sequelize";

export const User = db.define(
	"User",
	{
		id: {
			primaryKey: true,
			type:       DataTypes.INTEGER
		},
		firstname:       DataTypes.STRING,
		lastname:        DataTypes.STRING,
		gender:          DataTypes.ENUM("male", "female"),
		email:           DataTypes.STRING,
		password:        DataTypes.STRING,
		role:            DataTypes.ENUM("applicant", "representative", "admin"),
		profile_picture: DataTypes.INTEGER,
		company:         { type: DataTypes.INTEGER, allowNull: true },
		resume:          DataTypes.STRING
	},
	{ underscored: true }
);
