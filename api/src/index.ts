import express from "express";
import Users from "./Users";
import Companies from "./Companies";
import Advertisements from "./Advertisements";
import Auth from "./Auth";
// import Applications from "./Applications";
// import Files from "./Files";
import "dotenv/config";
import database from "./database";

const app = express();
const port = process.env.port || 8000;

app.use(express.json());

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
	// Applications.routes(app);
	// Files.routes(app);
})();

app.listen(port, () => console.log(`Listening on port ${port}`));
