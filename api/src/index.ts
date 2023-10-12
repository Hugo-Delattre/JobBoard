import express from "express";
import Users from "./Users";
import Companies from "./Companies";
import Advertisements from "./Advertisements";
import Auth from "./Auth";
// import Applications from "./Applications";
// import Files from "./Files";
import database from "./database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.port || 8000;

app.use(express.json());

(async () => {
	const db = await database();

	Users(app, db);
	Companies(app, db);
	Advertisements(app, db);
	Auth(app, db);
	// Applications.routes(app);
	// Files.routes(app);
})();

app.listen(port, () => console.log(`Listening on port ${port}`));
