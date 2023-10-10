import { DataTypes} from "sequelize";
import db from "~/db";

export const Advertisement = db.define("Advertisement", {
	id: {
		primaryKey: true,
		type:       DataTypes.INTEGER
	},
	title:         {type: DataTypes.STRING, allowNull: false},
	company:       {type: DataTypes.INTEGER, allowNull: false},
	description:   {type: DataTypes.TEXT},
	salary:        {type: DataTypes.FLOAT},
	location:      {type: DataTypes.STRING},
	working_hours: {type: DataTypes.INTEGER},
	type:          {type: DataTypes.ENUM("CDI", "CDD", "Seasonal")},
	images:        {type: DataTypes.INTEGER},
	applications:  {type: DataTypes.INTEGER},
	active:        {type: DataTypes.BOOLEAN, defaultValue: true},
}, {underscored: true});
