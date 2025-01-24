import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';


/**
 * @module AppModule
 * 
 * Le module principal de l'application Angular.
 * 
 * @description
 * Ce module est le point d'entrée de l'application Angular. Il déclare les composants, importe les modules nécessaires et configure les services de l'application.
 * 
 * @NgModule
 * - `declarations`: Un tableau de composants, directives et pipes qui appartiennent à ce module.
 * - `imports`: Un tableau de modules dont les classes exportées sont nécessaires à ce module.
 *   - `BrowserModule`: Nécessaire pour toute application Angular qui s'exécute dans un navigateur.
 *   - `AppRoutingModule`: Module de routage de l'application.
 *   - `RouterModule`: Module de routage Angular qui permet de définir les routes de l'application.
 * - `providers`: Un tableau de fournisseurs de services qui seront disponibles pour l'ensemble de l'application.
 * - `bootstrap`: Un tableau de composants qui seront bootstrapés au démarrage de l'application.
 */
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
