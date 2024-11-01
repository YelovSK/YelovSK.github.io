import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpecsComponent } from './specs/specs.component';
import { ClickComponent } from './click/click.component';
import { WordComponent } from './word/word.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'specs', component: SpecsComponent },
  { path: 'click', component: ClickComponent },
  { path: 'word', component: WordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
