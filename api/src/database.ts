import { Connection } from "mysql2/promise";
import mysql from "mysql2/promise";

const db: () => Promise<Connection> = async () =>
	await mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "noogs",
		password: "noogs",
		database: "job_board",
	});

export default db;
