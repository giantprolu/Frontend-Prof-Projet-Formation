import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { SearchComponent } from './Pages/search/search.component';


/**
 * Définition des routes de l'application Angular.
 * 
 * @constant
 * @type {Routes}
 * 
 * Les routes définies ici sont les suivantes :
 * - La route par défaut ('') qui charge le composant `HomeComponent`.
 * - La route 'search' qui charge le composant `SearchComponent`.
 * 
 * @example
 * // Exemple d'utilisation dans un module Angular
 * import { RouterModule } from '@angular/router';
 * import { routes } from './app.routes';
 * 
 * @NgModule({
 *   imports: [RouterModule.forRoot(routes)],
 *   exports: [RouterModule]
 * })
 * export class AppRoutingModule {}
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
];
