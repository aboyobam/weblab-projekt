import { Request, Response } from "express";
import User from "../../models/User.js";
import Module from "../../models/Module.js";
import { z } from "zod";

const bodySchema = z.object({
    module: z.string(),
    desc: z.string(),
    anonymous: z.boolean(),
});

export default async function newModule(req: Request, res: Response) {
    if (!req.session.userId) {
        return res.json({ success: false, error: "Du musst eingeloggt sein, um eine Beschreibung zu erfassen" });
    }

    const body = bodySchema.safeParse(req.body);
    if (!body.success) {
        return res.json({ success: false, error: "Ungültige Anfrage" });
    }

    const hasCount = await Module.countDocuments({ abbreviation: body.data.module });
    const slug = `${body.data.module}-${hasCount + 1}`;

    await Module.create({
        abbreviation: body.data.module,
        description: body.data.desc,
        anonymous: body.data.anonymous,
        slug,
        author: req.session.userId,
        comments: [],
        ratings: [],
    });

    return res.json({ success: true, slug });
}