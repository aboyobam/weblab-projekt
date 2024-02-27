import request from "supertest";
import mongoose from "mongoose";
import { app } from "../dist";
import User from "../dist/models/User";

const express = request(app);

describe("Should test the Auth API", () => {
    it("Should create a User", async () => {
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

    it("Should login the user", async () => {
        const res = await express
            .post("/api/login")
            .send({
                username: "test",
                password: "testIsVerySafe1!"
            });

        expect(res.body.success).toEqual(true);
    });

    // make sure it shuts down the server
    afterAll(() => {
        mongoose.connection.close();
    });
});
