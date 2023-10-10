import { Application } from "express";
import { getUsers, postUsers } from "./methods";

export default (app: Application) => {
	app.get("/users", getUsers);
	app.post("/users", postUsers);
};
