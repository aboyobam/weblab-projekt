import { Router } from "express";
import login from "./auth/login.js";
import register from "./auth/register.js";
import getUser from "./auth/get-user.js";
import newModule from "./modules/new-module.js";
import getModules from "./modules/get-modules.js";
import rateModule from "./modules/rate.js";
import getModuleDetails from "./modules/get-details.js";
import postComment from "./modules/post-comment.js";
import logout from "./auth/logout.js";
import newArticle from "./articles/new-article.js";
import getArticles from "./articles/get-articles.js";
import newQuote from "./quotes/new-quote.js";
import getQuotes from "./quotes/get-quotes.js";
import apiHome from "./home.js";

const api = Router();

// auth
api.get("/user", getUser);
api.post("/login", login);
api.post("/register", register);
api.post("/logout", logout);

// general
api.get("/modules/:type/:slug", getModuleDetails);
api.post("/modules/rate", rateModule);
api.post("/modules/comment", postComment);

// modules
api.post("/modules/new", newModule);
api.get("/modules", getModules);

// articles
api.post("/articles/new", newArticle);
api.get("/articles", getArticles);

// quotes
api.post("/quotes/new", newQuote);
api.get("/quotes", getQuotes);

// home
api.get("/trending", apiHome);

export default api;