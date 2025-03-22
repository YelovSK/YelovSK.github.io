import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SpecsComponent } from './specs/specs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClickComponent } from './click/click.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { WordComponent } from './word/word.component';

@NgModule({ declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        SpecsComponent,
        ClickComponent,
        WordComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatExpansionModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
