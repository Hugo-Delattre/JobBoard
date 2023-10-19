import { Application } from "express";
import methods from "./methods";
import { Connection } from "mysql2/promise";

export default (app: Application, db: Connection) => {
	app.get("/companies/:id", methods(db).getCompany);
	app.get("/companies", methods(db).getCompanies);
	app.post("/companies", methods(db).postCompany);
	app.put("/companies/:id", methods(db).putCompany);
	app.delete("/companies/:id", methods(db).deleteCompany);
};
