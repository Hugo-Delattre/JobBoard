import { Application } from "express";
import { Connection } from "mysql2/promise";
import methods from "./methods";

export default (app: Application, db: Connection) => {
	app.get("/dashboard/tables", methods(db).getTables);
	app.get("/dashboard/tables/:table", methods(db).getColumns);
};
