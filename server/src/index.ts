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

await mongoose.connect(process.env.MONGO, { dbName: process.env.DB_NAME });

const app = express();
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
    store: MongoStore.create({
        autoRemove: "disabled",
        collectionName: "sessions",
        dbName: process.env.DB_NAME,
        mongoUrl: process.env.MONGO
    })
}));

app.use(bodyParser.json());
app.use("/api", api);

app.use(express.static("public/browser"));
app.use((_req, res) => res.sendFile("index.html", { root: "public/browser" }));

server.listen(3000, () => console.log("Listening"));