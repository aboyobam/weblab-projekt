import { Request, Response } from "express";
import Module from "../../models/Module.js";
import { z } from "zod";

const bodySchema = z.object({
    module: z.string(),
    desc: z.string(),
    anonymous: z.boolean(),
});

export default async function newQuote(req: Request, res: Response) {
    if (!req.session.userId) {
        return res.json({ success: false, error: "Du musst eingeloggt sein, um eine Beschreibung zu erfassen" });
    }

    const body = bodySchema.safeParse(req.body);
    if (!body.success) {
        return res.json({ success: false, error: "Ungültige Anfrage" });
    }

    const slug = makeid(16);

    await Module.create({
        abbreviation: body.data.module,
        description: body.data.desc,
        anonymous: body.data.anonymous,
        slug,
        author: req.session.userId,
        comments: [],
        ratings: [],
        type: "quote",
    });

    return res.json({ success: true, slug });
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