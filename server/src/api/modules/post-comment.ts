import { Request, Response } from "express";
import { z } from "zod";
import Module from "../../models/Module.js";
import Comment from "../../models/Comment.js";
import User from "../../models/User.js";

const bodySchema = z.object({
    module: z.string(),
    text: z.string(),
    anonymous: z.boolean()
});

export default async function postComment(req: Request, res: Response) {
    const body = bodySchema.safeParse(req.body);

    if (!req.session.userId) {
        return res.json({ success: false, error: "Not logged in" });
    }

    if (!body.success) {
        return res.json({ success: false, error: "Invalid body" });
    }

    const module = await Module.findById(body.data.module);
    if (!module) {
        return res.json({ success: false, error: "Module not found" });
    }

    const comment = await Comment.create({
        anonymous: body.data.anonymous,
        author: req.session.userId,
        text: body.data.text
    });

    module.comments.push(comment._id);
    await module.save();

    const user = await User.findById(req.session.userId);

    return res.json({
        success: true,
        comment: {
            author: comment.anonymous ? "Anonymous" : user.username,
            text: comment.text,
            updated: comment.updatedAt
        }
    });
}