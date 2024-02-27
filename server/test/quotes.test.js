import request from "supertest";
import mongoose from "mongoose";
import { app } from "../dist";
import cookie from "cookie";
import Module from "../dist/models/Module";
import resetDb from "./reset-db";

const express = request(app);

describe("Should test the quotes API", () => {
    const module = "TEST";
    const desc = "Testing is fun!";

    let authCookie;
    let slug; // dynamically set by server

    // login before all tests
    beforeAll(async () => {
        const register = await express
            .post("/api/register")
            .send({
                username: "test",
                email: "test.test",
                password: "testIsVerySafe1!"
            });

        expect(register.body.success).toEqual(true);

        const login = await express
            .post("/api/login")
            .send({
                username: "test",
                password: "testIsVerySafe1!"
            });

        const cookies = cookie.parse(login.header["set-cookie"][0]);
        authCookie = cookies["connect.sid"];
    });


    it("Should create a quote over the API", async () => {
        const res = await express
            .post("/api/quotes/new")
            .set("Cookie", `connect.sid=${authCookie}`)
            .send({ module, desc, anonymous: false });
        
        expect(res.body.success).toEqual(true);
        slug = res.body.slug;
    });

    
    it("Should be on the database", async () => {
        const module = await Module.findOne({ slug });
        expect(module).toBeTruthy();
    });

    it("Should be visible when loading all quates", async () => {
        const res = await express.get("/api/quotes");

        expect(res.body.success).toEqual(true);
        expect(res.body.modules).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    module,
                    description: desc,
                    slug
                })
            ])
        );
    });

    // make sure it shuts down the server
    afterAll(async () => {
        await resetDb();
        mongoose.connection.close();
    });
});
