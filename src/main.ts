// Importation de la fonction bootstrapApplication depuis le module '@angular/platform-browser'.
// Cette fonction est utilisée pour démarrer l'application Angular.
import { bootstrapApplication } from '@angular/platform-browser';

// Importation du composant principal de l'application, AppComponent, depuis le fichier './app/app.component'.
// Ce composant est le point d'entrée de l'application.
import { AppComponent } from './app/app.component';

// Importation de la fonction provideRouter depuis le module '@angular/router'.
// Cette fonction est utilisée pour configurer le routeur de l'application.
import { provideRouter } from '@angular/router';

// Importation des routes définies dans le module de routage de l'application depuis le fichier './app/app-routing.module'.
// Ces routes définissent la navigation au sein de l'application.
import { routes } from './app/app-routing.module';

// Importation de la fonction provideHttpClient depuis le module '@angular/common/http'.
// Cette fonction est utilisée pour configurer le client HTTP de l'application.
import { provideHttpClient } from '@angular/common/http';

// Appel de la fonction bootstrapApplication pour démarrer l'application Angular.
// Le premier argument est le composant principal de l'application, AppComponent.
// Le deuxième argument est un objet de configuration contenant les fournisseurs de services nécessaires à l'application.
bootstrapApplication(AppComponent, {
  providers: [
    // Configuration du routeur avec les routes définies.
    provideRouter(routes),
    // Configuration du client HTTP.
    provideHttpClient()
  ]
})
// Gestion des erreurs éventuelles lors du démarrage de l'application.
// Si une erreur se produit, elle est capturée et affichée dans la console.
.catch(err => console.error(err));