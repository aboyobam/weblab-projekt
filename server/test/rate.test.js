import request from "supertest";
import mongoose from "mongoose";
import { app } from "../dist";
import Module from "../dist/models/Module";
import resetDb from "./reset-db";

const express = request(app);

describe("Should test the rating API", () => {
    let articleId;

    beforeAll(async () => {
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
    });

    it("Should rate an article", async () => {
        const res = await express
            .post(`/api/modules/rate`)
            .send({
                module: articleId,
                positive: true
            });

        expect(res.body.success).toEqual(true);
    });

    it("Should recalculate the overall rating", async () => {
        const article = await Module.findOne({ _id: articleId }).populate("ratings");
        expect(article.getRatings()).toEqual([1, 1, 0]);
    });

    // make sure it shuts down the server
    afterAll(async () => {
        await resetDb();
        mongoose.connection.close();
    });
});
