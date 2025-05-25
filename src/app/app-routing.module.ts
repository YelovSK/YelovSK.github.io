import { HomeComponent } from './pages/home/home.component';
import { SpecsComponent } from './pages/specs/specs.component';
import { ClickComponent } from './pages/click/click.component';
import { WordComponent } from './pages/word/word.component';
import { CanvasComponent } from './pages/canvas/canvas.component';
import { SoftwareComponent } from './pages/software/software.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'specs', component: SpecsComponent },
  { path: 'software', component: SoftwareComponent },
  { path: 'click', component: ClickComponent },
  { path: 'word', component: WordComponent },
  { path: 'canvas', component: CanvasComponent },
];
