// Importation des modules nécessaires depuis Angular
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./Pages/home/home.component"; // Importation du composant HomeComponent
import { Router } from '@angular/router'; // Importation du service Router

// Déclaration du composant avec le décorateur @Component
@Component({
  selector: 'app-root', // Sélecteur utilisé pour insérer ce composant dans un template HTML
  standalone: true, // Indique que ce composant est autonome et n'a pas besoin d'un module parent
  imports: [RouterModule], // Modules importés pour ce composant, ici le module de routage
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </header>
      <router-outlet></router-outlet> <!-- Placeholder pour afficher les composants en fonction de la route -->
    </main>
  `, // Template HTML du composant
  styleUrls: ['./app.component.scss'], // Fichiers de styles associés à ce composant
})
export class AppComponent {
  title = 'EPS'; // Propriété du composant, ici le titre de l'application
}