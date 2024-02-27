import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import http from "node:http";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import api from "./api/api.js";

declare module 'express-session' {
    interface SessionData {
        userId: string;
    }
}

export const app = express();

await mongoose.connect(global.__MONGO_URI__ || process.env.MONGO, { dbName: process.env.DB_NAME });

const server = http.createServer(app);
app.use(cors());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 100 * 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
    store: MongoStore.create({ client: mongoose.connection.getClient() }),
}));

app.use(bodyParser.json());
app.use("/api", api);

app.use(express.static("public/browser"));
app.use((_req, res) => res.sendFile("index.html", { root: "public/browser" }));

if (!process.env.JEST_WORKER_ID) {
    server.listen(3000, () => console.log("Listening"));
}