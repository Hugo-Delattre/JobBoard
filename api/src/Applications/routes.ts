import { Application } from "express";
import { Connection } from "mysql2/promise";
import methods from "./methods";

const routes = (app: Application, db: Connection) => {
	app.get("/applications", methods(db).getApplications);
	app.post("/applications", methods(db).postApplication);
};

export default routes;
