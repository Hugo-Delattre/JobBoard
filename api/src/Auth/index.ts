import { Application } from "express";
import { Connection } from "mysql2/promise";
import routes from "./routes";

export default (app: Application, db: Connection) => {
	routes(app, db);
};
