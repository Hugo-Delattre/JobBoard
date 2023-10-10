import { Sequelize } from "sequelize";

const db: Sequelize = new Sequelize({
	storage: "job_board.sqlite",
	dialect: "sqlite",
});

const initializeDb = async () => {
	try {
		await db.authenticate();
		console.log("Database initialized successfully.");
	} catch {
		console.log("Database initialization failed.");
	}

	try {
		await db.sync();
		console.log("Database synchonized successfully.");
	} catch {
		console.log("Database synchronization failed.");
	}
};

export { initializeDb };
export default db;
