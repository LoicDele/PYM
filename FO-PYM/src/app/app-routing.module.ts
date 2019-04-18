import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrepriseViewComponent } from './components/entreprise-view/entreprise-view.component';

const routes: Routes = [
  {path: 'entreprise/:id', component: EntrepriseViewComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
