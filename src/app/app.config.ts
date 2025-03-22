
import { ApplicationConfig } from '@angular/core';
import { routes } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient()
    ]
};