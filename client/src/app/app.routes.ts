import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", pathMatch: "full", loadComponent: () => import("./pages/home/home.component").then(p => p.HomeComponent) },

    { path: "modules", loadComponent: () => import("./pages/modules/modules.component").then(p => p.ModulesComponent) },
    { path: "modules/new", loadComponent: () => import("./pages/modules/new/new.component").then(p => p.NewComponent) },
    
    { path: "articles", loadComponent: () => import("./pages/articles/articles.component").then(p => p.ArticlesComponent) },
    { path: "articles/new", loadComponent: () => import("./pages/articles/new/new.component").then(p => p.NewComponent) },
    
    { path: "quotes", loadComponent: () => import("./pages/quotes/quotes.component").then(p => p.QuotesComponent) },
    { path: "quotes/new", loadComponent: () => import("./pages/quotes/new/new.component").then(p => p.NewComponent) },
    
    { path: "login", loadComponent: () => import("./pages/login/login.component").then(p => p.LoginComponent) },
    { path: "register", loadComponent: () => import("./pages/register/register.component").then(p => p.RegisterComponent) },
    { path: "forgot-password", loadComponent: () => import("./pages/forgot-password/forgot-password.component").then(p => p.ForgotPasswordComponent) },
    { path: ":type/:slug", loadComponent: () => import("./pages/modules/details/details.component").then(p => p.DetailsComponent) },
];
