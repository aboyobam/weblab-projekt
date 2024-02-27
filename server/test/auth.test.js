import request from "supertest";
import mongoose from "mongoose";
import { app } from "../dist";
import User from "../dist/models/User";
import resetDb from "./reset-db";

const express = request(app);

describe("Should test the Auth API", () => {
    it("Should register a User via API", async () => {
        const res = await express
            .post("/api/register")
            .send({
                username: "test",
                email: "test.test",
                password: "testIsVerySafe1!"
            });
        
        expect(res.body.success).toEqual(true);
    });

    it("Should have created the user", async () => {
        const user = await User.findOne({ username: "test" });

        // check if user exists
        expect(user).toBeTruthy();
    });

    it("Should be able to login with user via API", async () => {
        const res = await express
            .post("/api/login")
            .send({
                username: "test",
                password: "testIsVerySafe1!"
            });

        expect(res.body.success).toEqual(true);
    });

    it("Should clean the database", async () => {
        await resetDb();
    });

    // make sure it shuts down the server
    afterAll(async () => {
        await resetDb();
        mongoose.connection.close();
    });
});
