
import { ApplicationConfig } from '@angular/core';
import { routes } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
};