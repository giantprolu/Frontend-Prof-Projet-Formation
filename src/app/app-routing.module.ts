// Importation des modules nécessaires depuis Angular core et Angular router
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { SearchComponent } from './Pages/search/search.component';

// Définition des routes de l'application
const routes: Routes = [
  // Route par défaut qui charge le composant HomeComponent
  { path: '', component: HomeComponent },
  // Route pour le chemin 'search' qui charge le composant SearchComponent
  { path: 'search', component: SearchComponent },
];

// Décoration de la classe avec @NgModule pour définir un module Angular
@NgModule({
  // Importation du RouterModule avec les routes définies
  imports: [RouterModule.forRoot(routes)],
  // Exportation du RouterModule pour qu'il soit disponible dans d'autres parties de l'application
  exports: [RouterModule]
})
// Définition de la classe AppRoutingModule qui configure le routage de l'application
export class AppRoutingModule { }

// Exportation des routes pour qu'elles puissent être utilisées ailleurs dans l'application
export { routes };