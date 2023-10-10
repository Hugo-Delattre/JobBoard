import { Application } from "express";
import { getAdvertisements } from "./methods";

const routes = (app: Application) => {
	app.get("/advertisements", getAdvertisements);
};

export default routes;
