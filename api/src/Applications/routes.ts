import { Application } from "express";
import { Connection } from "mysql2/promise";
import methods from "./methods";

const routes = (app: Application, db: Connection) => {
	app.post("/applications", methods(db).postApplication);
};

export default routes;
