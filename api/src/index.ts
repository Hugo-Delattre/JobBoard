import express from "express";
import Users from "./Users";
import Companies from "./Companies";
import Advertisements from "./Advertisements";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import Applications from "./Applications";
import Uploads from "./Uploads";

import "dotenv/config";
import cors from "cors";
import database from "./database";

const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
});

(async () => {
	const db = await database();

	Users(app, db);
	Companies(app, db);
	Advertisements(app, db);
	Auth(app, db);
	Applications(app, db);
	Uploads(app, db);
	Dashboard(app, db);
})();

app.listen(port, () => console.log(`Listening on port ${port}`));
