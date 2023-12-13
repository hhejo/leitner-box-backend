import dotenv from "dotenv";

dotenv.config();

export const { MONGODB_URI } = process.env || "";
export const { MONGODB_DB_NAME } = process.env;
