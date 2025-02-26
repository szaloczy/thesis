import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || '5432'),
});

( async () => {
    try {
        await db.connect();
        console.log("Database connected siccessfully");
    } catch (error) {
        console.error("Database connection failed: ", error);
        process.exit(1);
    }
})();

export const closeDb = async () => {
    try {
        await db.end();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Error closing the database connection: ", error);
    }
}

export default db;