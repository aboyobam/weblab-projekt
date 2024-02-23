import { Request, Response } from "express";
import _ from "lodash";
import Module from "../models/Module.js";

export default async function apiHome(req: Request, res: Response) {
    const [modules, quotes, articles] = await Promise.all([
        trendingModules(req),
        trendingArticlesAndQuotes(req, "quote"),
        trendingArticlesAndQuotes(req, "article")
    ]);

    return res.json({
        success: true,
        modules,
        quotes,
        articles
    });
}

async function getTrending(type: string) {
    const modules = await Module.find({ type })
        .populate("author", "username")
        .populate("ratings");

    return modules.sort((a, b) => b.getRatings()[0] - a.getRatings()[0]);
}

async function trendingModules(req: Request) {
    const modules = await getTrending("module");
    const seen = new Set();

    const out: any[] = [];
    for (let i = 0; i < 3 && modules.length;) {
        const module = modules.shift();
        if (!seen.has(module.abbreviation)) {
            out.push({
                module: module.abbreviation,
                slug: module.slug,
                description: module.description,
                updated: module.updatedAt,
                author: module.anonymous ? "Anonymous" : module.author.username,
                rating: module.getRatings(),
                rated: module.ratings.find(r => r.author?.toString() == req.session.userId)?.forClient(),
                comments: module.comments.length,
                _id: module._id,
            });
            seen.add(module.abbreviation);
            i++;
        }
    }

    return out;
}

async function trendingArticlesAndQuotes(req: Request, type: string) {
    const modules = await getTrending(type);

    const out: any[] = [];
    for (let i = 0; i < 3 && modules.length;) {
        const module = modules.shift();
        out.push({
            module: module.abbreviation,
            slug: module.slug,
            description: module.description,
            updated: module.updatedAt,
            author: module.anonymous ? "Anonymous" : module.author.username,
            rating: module.getRatings(),
            rated: module.ratings.find(r => r.author?.toString() == req.session.userId)?.forClient(),
            comments: module.comments.length,
            _id: module._id
        });
        i++;
    }

    return out;
}