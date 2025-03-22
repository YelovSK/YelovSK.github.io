import { HomeComponent } from './home/home.component';
import { SpecsComponent } from './specs/specs.component';
import { ClickComponent } from './click/click.component';
import { WordComponent } from './word/word.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'specs', component: SpecsComponent },
  { path: 'click', component: ClickComponent },
  { path: 'word', component: WordComponent },
];