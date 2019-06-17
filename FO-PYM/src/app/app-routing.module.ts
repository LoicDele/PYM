import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrepriseViewComponent } from './components/entreprise-view/entreprise-view.component';
import { BatimentViewComponent } from './components/batiment-view/batiment-view.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
const routes: Routes = [
  {path: 'entreprise/:id', component: EntrepriseViewComponent},
  {path: 'batiment/:id', component: BatimentViewComponent},
  {path: 'recherche', component: SearchViewComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
