import { Request, Response } from "express";
import Module from "../../models/Module.js";
import Rating from "../../models/Rating.js";

export default async function rateModule(req: Request, res: Response) {
    const module = req.body.module;
    const positive = req.body.positive;

    if (typeof module != "string" || typeof positive != "boolean") {
        return res.json({ success: false, error: "Invalid request" });
    }

    const mod = await Module.findById(module).populate("ratings");
    if (!mod) {
        return res.json({ success: false, error: "Module not found" });
    }

    let rating = mod.ratings.find(r => r.author?._id.toString() == req.session.userId || r.sessionID == req.sessionID);
    if (rating) {
        if (rating.positive == positive) {
            return res.json({ success: false, error: "Already rated" });
        }

        rating.positive = positive;
        await rating.save();
    } else {
        rating = await Rating.create({ positive, sessionID: req.sessionID, author: req.session.userId });
        mod.ratings.push(rating);
    }

    await mod.save();
    return res.json({
        success: true,
        rating: { positive },
        newRating: mod.getRatings()
    });
}