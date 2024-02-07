import { Request, Response } from "express";
import _ from "lodash";
import Module from "../../models/Module.js";

export default async function getModules(req: Request, res: Response) {
    const all = await Module.find()
        .populate("author", "username")
        .populate("ratings", ["positive", "author", "createdAt"])
    
    const grouped = _.groupBy(all, "abbreviation");

    const result = [];

    for (const module in grouped) {
        const sorted = grouped[module].sort((a, b) => b.getRatings()[0] - a.getRatings()[0]);
        const first = sorted[0];

        result.push({
            module: first.abbreviation,
            slug: first.slug,
            description: first.description,
            updated: first.updatedAt,
            author: first.anonymous ? "Anonymous" : first.author.username,
            rating: first.getRatings(),
            rated: first.ratings.find(r => r.author?.toString() == req.session.userId)?.forClient(),
            comments: first.comments.length,
            _id: first._id,
            others: sorted.slice(1).map(m => ({
                slug: m.slug,
                updated: m.updatedAt,
                author: m.anonymous ? "Anonymous" : m.author.username,
                rating: m.getRatings(),
                comments: m.comments.length
            }))
        });
    }

    return res.json({ success: true, modules: result });
}