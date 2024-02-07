import { Request, Response } from "express";
import { z } from "zod";
import User from "../../models/User.js";
import crypto from "node:crypto";

const bodySchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string()
});

export default async function register(req: Request, res: Response){
    const body = bodySchema.safeParse(req.body);
    if (!body.success) {
        return res.json({ success: false, error: "Etwas ist schief gelaufen" });
    }

    const exists = await User.findOne({ $or: [{ username: body.data.username }, { email: body.data.email }] });
    if (exists) {
        return res.json({ success: false, error: "Benutzername oder E-Mail-Adresse bereits vergeben" });
    }

    // TODO: validate email, password and username

    const salt = makeid(16);
    const hash = crypto.scryptSync(body.data.password, salt, 64).toString('hex');
    const user = await User.create({ username: body.data.username, email: body.data.email, password: hash, salt });

    // TODO: send email to user with verification link
    
    req.session.userId = user._id.toString();
    res.json({ success: true });
}

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}