import { Connection } from "mysql2/promise";
import mysql from "mysql2/promise";

const DB_HOST = process.env.DB_HOST;
const DB_PORT = parseInt(process.env.DB_PORT!);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const db: () => Promise<Connection> = async () =>
	await mysql.createConnection({
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
	});

export default db;
