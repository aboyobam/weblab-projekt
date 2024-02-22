import { Request, Response } from "express";

export default async function logout(req: Request, res: Response){
    delete req.session.userId;
    res.json({ success: true });
}