import { Request, Response } from "express";
import Module from "../../models/Module.js";

export default async function getModuleDetails(req: Request, res: Response) {
    const slug = req.params.slug;
    if (!slug) {
        return res.json({ success: false, error: "No slug provided" });
    }

    const module = await Module.findOne({ slug, type: req.params.type })
        .populate("author", "username")
        .populate({ path: "comments", populate: { path: "author", select: "username" }})
        .populate("ratings");
    
    if (!module) {
        return res.json({ success: false, error: "Module not found" });
    }

    return res.json({
        success: true,
        module: {
            abbreviation: module.abbreviation,
            description: module.description,
            author: module.anonymous ? "Anonymous" : module.author.username,
            slug: module.slug,
            rating: module.getRatings(),
            _id: module._id,
            updated: module.updatedAt,
            rated: module.ratings.find(r => r.author?.toString() == req.session.userId)?.forClient(),
            comments: module.comments.map(c => ({
                text: c.text,
                author: c.anonymous ? "Anonymous" : c.author.username,
                updated: c.updatedAt
            }))
        }
    });
}