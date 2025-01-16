import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Eleve } from '../../Models/eleve';
import { ApiService } from '../../Services/api.service';
import { EleveCardSearchComponent } from '../eleve-card-search/eleve-card-search.component';
import { Router } from '@angular/router';
/**
 * Composant de recherche pour filtrer et afficher une liste d'élèves.
 * 
 * @selector 'app-search'
 * @standalone true
 * @imports [CommonModule, FormsModule, EleveCardSearchComponent]
 * @templateUrl './search.component.html'
 * @styleUrls ['./search.component.scss']
 */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, EleveCardSearchComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  /**
   * Texte de recherche saisi par l'utilisateur.
   */
  searchText: string = '';

  /**
   * Liste complète des élèves récupérés depuis l'API.
   */
  eleves: Eleve[] = [];

  /**
   * Liste des élèves filtrés en fonction du texte de recherche.
   */
  filteredEleves: Eleve[] = [];

  /**
   * Constructeur du composant de recherche.
   * 
   * @param apiService Service pour récupérer les données des élèves depuis l'API.
   * @param router Service de navigation pour rediriger l'utilisateur.
   */
  constructor(private apiService: ApiService, private router: Router) { }

  /**
   * Méthode appelée lors de l'initialisation du composant.
   * Récupère les données des élèves depuis l'API et initialise les listes `eleves` et `filteredEleves`.
   */
  ngOnInit() {
    this.apiService.getData().subscribe({
      next: (response) => {
        this.eleves = response;
        this.filteredEleves = response;
        console.log('Données reçues :', this.eleves);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  /**
   * Méthode pour filtrer la liste des élèves en fonction du texte de recherche.
   * Si le texte de recherche est vide, la liste complète des élèves est affichée.
   */
  search() {
    if (this.searchText) {
      this.filteredEleves = this.eleves.filter(eleve => 
        eleve.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
        eleve.prenom.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEleves = this.eleves;
    }
  }
}
