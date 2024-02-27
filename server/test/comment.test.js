import request from "supertest";
import mongoose from "mongoose";
import cookie from "cookie";
import { app } from "../dist";
import Module from "../dist/models/Module";
import resetDb from "./reset-db";

const express = request(app);

describe("Should test the comments API", () => {
    const commentText = "This is a comment";
    let authCookie, articleId, slug;
    
    // create a user/author and a article to comment
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

        const article = await Module.create({
            abbreviation: "TEST",
            description: "Testing is fun!",
            anonymous: true,
            author: null,
            comments: [],
            type: "article",
            slug: "TEST-1",
            ratings: []
        });

        articleId = article._id;
        slug = article.slug;
    });

    it("Should post a comment on the article", async () => {
        const res = await express
            .post(`/api/modules/comment`)
            .set("Cookie", `connect.sid=${authCookie}`)
            .send({
                module: articleId,
                text: commentText,
                anonymous: false
            });

        expect(res.body.success).toEqual(true);
    });

    it("Should be on the database", async () => {
        const article = await Module.findOne({ _id: articleId });
        expect(article.comments.length).toEqual(1);
    });

    it("Should be visible when looking at the article details", async () => {
        const res = await express.get("/api/modules/article/" + slug);

        expect(res.body.success).toEqual(true);
        expect(res.body.module.comments).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    text: commentText
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
