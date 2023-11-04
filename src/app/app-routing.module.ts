import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpecsComponent } from './specs/specs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'specs', component: SpecsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
