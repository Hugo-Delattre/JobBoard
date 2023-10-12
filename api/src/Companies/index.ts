import { Application } from "express";
import routes from "./routes";
import { Connection } from "mysql2/promise";

export default (app: Application, db: Connection) => {
	routes(app, db);
};
