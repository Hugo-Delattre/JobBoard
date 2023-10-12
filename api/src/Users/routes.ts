import { Application } from "express";
import methods from "./methods";
import { Connection } from "mysql2/promise";

export default (app: Application, db: Connection) => {
	app.get("/users/:id", methods(db).getUser);
	app.get("/users", methods(db).getUsers);
	app.post("/users", methods(db).postUser);
	app.put("/users/:id", methods(db).putUser);
	app.delete("/users/:id", methods(db).deleteUser);
};
