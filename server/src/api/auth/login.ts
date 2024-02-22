import { Request, Response } from "express";
import { z } from "zod";
import User from "../../models/User.js";
import crypto from "node:crypto";

const bodySchema = z.object({
    username: z.string(),
    password: z.string()
});

const authFailError = "Ungültiger Benutzername oder Passwort";

export default async function login(req: Request, res: Response) {
    const body = bodySchema.safeParse(req.body);
    if (!body.success) {
        return res.json({ success: false, error: "Etwas ist schief gelaufen" });
    }

    const user = await User.findOne({ username: body.data.username });

    if (!user) {
        return res.json({ success: false, error: authFailError });
    }

    const hash = crypto.scryptSync(body.data.password, user.salt, 64).toString('hex');
    if (hash !== user.password) {
        return res.json({ success: false, error: authFailError })
    }

    req.session.userId = user._id.toString();
    req.session.save();
    
    res.json({ success: true });
}