import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';


/**
 * Configuration de l'application Angular.
 * 
 * @constant
 * @type {ApplicationConfig}
 * 
 * @property {Array} providers - Liste des fournisseurs de services pour l'application.
 * @property {Function} providers[0] - Fournit le routeur avec les routes définies.
 * @property {Function} providers[1] - Fournit le client HTTP pour les requêtes HTTP.
 * @property {Function} providers[2] - Fournit l'hydratation du client pour le rendu côté serveur.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideClientHydration()]}
