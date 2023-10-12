import { Connection } from "mysql2/promise";
import mysql from "mysql2/promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db: () => Promise<Connection> = async () =>
	await mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "noogs",
		password: "noogs",
		database: "job_board",
	});

export default db;
