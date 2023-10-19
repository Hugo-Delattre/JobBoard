import { Application } from "express";
import { Connection } from "mysql2/promise";
import methods from "./methods";

export default (app: Application, db: Connection) => {
	app.post("/faker/users", methods(db).generateUsers);
	app.post("/faker/advertisements", methods(db).generateAdvertisements);
};
