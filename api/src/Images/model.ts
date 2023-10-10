import { DataTypes } from "sequelize";
import db from "~/db";

export const Image = db.define(
	"Advertisement",
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		url: { type: DataTypes.STRING, allowNull: false },
	},
	{ underscored: true }
);
