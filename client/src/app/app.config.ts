import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { MarkdownService, provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ApiService,
    AuthService,
    MarkdownService,
    provideMarkdown()
  ]
};
