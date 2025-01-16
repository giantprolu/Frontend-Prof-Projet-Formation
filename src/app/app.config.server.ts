import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Configuration de l'application pour le rendu côté serveur.
 * 
 * @constant
 * @type {ApplicationConfig}
 * 
 * @property {Array} providers - Liste des fournisseurs de services pour le rendu côté serveur.
 * @property {Function} providers[0] - Fonction pour fournir le rendu côté serveur.
 * 
 * @example
 * // Exemple d'utilisation de la configuration du serveur
 * import { serverConfig } from './app.config.server';
 * 
 * // Utilisation de la configuration dans l'application
 * platformServer(serverConfig);
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
