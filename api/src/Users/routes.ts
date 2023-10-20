import { Application } from "express";
import { Connection } from "mysql2/promise";
import methods from "./methods";

export default (app: Application, db: Connection) => {
	app.get("/users/:id", methods(db).getUser);
	app.get("/users", methods(db).getUsers);
	app.post("/users", methods(db).postUser);
	app.put("/users/:id", methods(db).putUser);
	app.delete("/users/:id", methods(db).deleteUser);
};
