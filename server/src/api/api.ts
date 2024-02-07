import { Router } from "express";
import login from "./auth/login.js";
import register from "./auth/register.js";
import getUser from "./auth/get-user.js";
import newModule from "./modules/new-module.js";
import getModules from "./modules/get-modules.js";
import rateModule from "./modules/rate.js";
import getModuleDetails from "./modules/get-details.js";
import postComment from "./modules/post-comment.js";

const api = Router();


// auth
api.get("/user", getUser);
api.post("/login", login);
api.post("/register", register);

// modules
api.get("/modules", getModules);
api.post("/modules/new", newModule);
api.post("/modules/rate", rateModule);
api.post("/modules/comment", postComment);
api.get("/modules/:slug", getModuleDetails);

export default api;