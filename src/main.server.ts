import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Fonction de démarrage de l'application Angular.
 * 
 * Cette fonction initialise l'application Angular en utilisant le composant principal `AppComponent`
 * et la configuration spécifiée `config`.
 * 
 * @returns {void} Cette fonction ne retourne rien.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;