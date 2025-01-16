// Importation des modules et des décorateurs nécessaires depuis Angular
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Eleve } from '../../Models/eleve'; // Importation du modèle Eleve
import { CommonModule } from '@angular/common'; // Importation du module commun d'Angular
import { Router } from '@angular/router'; // Importation du module de routage d'Angular

// Déclaration du composant avec le décorateur @Component
@Component({
  selector: 'app-eleve-card-search', // Sélecteur utilisé pour insérer ce composant dans un template
  standalone: true, // Indique que ce composant est autonome
  imports: [CommonModule], // Modules importés par ce composant
  templateUrl: './eleve-card-search.component.html', // Fichier HTML associé à ce composant
  styleUrls: ['./eleve-card-search.component.scss'] // Fichier de style associé à ce composant
})
export class EleveCardSearchComponent {
  @Input() eleves!: Eleve; // Propriété d'entrée qui reçoit un objet Eleve

  // Constructeur avec injection du service de routage
  constructor(private router: Router) {}

  // Méthode pour naviguer vers une autre page en passant le nom de l'élève en paramètre
  navigateToEdit(eleves: Eleve) {
    this.router.navigate(['/'], { queryParams: { nom: eleves.nom } });
  }
}