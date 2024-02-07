import { Request, Response } from "express";
import User from "../../models/User.js";

export default async function getUser(req: Request, res: Response) {
    const user = await User.findById(req.session.userId);

    if (user) {
        return res.json({ success: true, username: user.username });
    }

    return res.json({ success: false });
}