import { Application } from "express";
import { Connection } from "mysql2/promise";
import methods from "./methods";

const routes = (app: Application, db: Connection) => {
	app.get("/advertisements/:id", methods(db).getAdvertisement);
	app.get("/advertisements", methods(db).getAdvertisements);
	app.post("/advertisements", methods(db).postAdvertisement);
	app.put("/advertisements/:id", methods(db).putAdvertisement);
	app.delete("/advertisements/:id", methods(db).deleteAdvertisement);
};

export default routes;
