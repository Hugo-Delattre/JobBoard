import express from "express";
const app = express();

import Users from "./Users";
import Advertisements from "./Advertisements";
import Companies from "./Companies";
import Applications from "~/Applications";
import { initializeDb } from "./db";

const port = process.env.port || 8000;

app.use(express.json());

initializeDb().then(() => {
	app.listen(port, () => console.log(`Listening on port ${port}`));

	Users.routes(app);
	Advertisements.routes(app);
	Companies.routes(app);
	Applications.routes(app);
});
