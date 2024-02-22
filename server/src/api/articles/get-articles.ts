import { Request, Response } from "express";
import _ from "lodash";
import Module from "../../models/Module.js";

export default async function getArticles(req: Request, res: Response) {
    const all = await Module.find({ type: "article" })
        .populate("author", "username")
        .populate("ratings", ["positive", "author", "createdAt"])
    
    const result = [];

    for (const first of all) {
        result.push({
            module: first.abbreviation,
            slug: first.slug,
            description: first.description,
            updated: first.updatedAt,
            author: first.anonymous ? "Anonymous" : first.author.username,
            rating: first.getRatings(),
            rated: first.ratings.find(r => r.author?.toString() == req.session.userId)?.forClient(),
            comments: first.comments.length,
            _id: first._id
        });
    }

    return res.json({ success: true, modules: result });
}