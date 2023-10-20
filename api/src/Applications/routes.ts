import { Application } from "express";
import { Connection } from "mysql2/promise";
import methods from "./methods";

const routes = (app: Application, db: Connection) => {
	app.get("/applications/:id", methods(db).getApplication);
	app.get("/applications", methods(db).getApplications);
	app.post("/applications", methods(db).postApplication);
	app.put("/applications/:id", methods(db).putApplication);
	app.delete("/applications/:id", methods(db).deleteApplication);
};

export default routes;
