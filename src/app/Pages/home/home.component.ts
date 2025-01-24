import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EleveComponent } from '../eleve/eleve.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Eleve } from '../../Models/eleve';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../Services/api.service';
import { ActivatedRoute } from '@angular/router';
import { School } from '../../Models/school';

// Déclaration du composant Angular avec ses métadonnées
@Component({
    selector: 'app-home', // Sélecteur du composant
    standalone: true, // Indique que le composant est autonome
    imports: [
        CommonModule, // Importation du module commun d'Angular
        FormsModule, // Importation du module de formulaires d'Angular
        EleveComponent, // Importation du composant Eleve
    ],
    templateUrl: './home.component.html', // Chemin vers le template HTML du composant
    styleUrls: ['./home.component.scss'] // Chemin vers les styles SCSS du composant
})
export class HomeComponent implements OnInit {
  data: any; // Variable pour stocker les données reçues
  eleves: Eleve[] = []; // Tableau pour stocker la liste des élèves
  newEleve: Partial<Eleve> = {}; // Objet pour stocker les informations d'un nouvel élève
  isUpdating = false; // Indicateur pour savoir si on est en mode mise à jour
  selectedEleveIndex: number | null = null; // Index de l'élève sélectionné
  searchText: string = ''; // Texte de recherche
  alertMessage: string | null = null; // Message d'alerte
  alertType: 'success' | 'danger' | null = null; // Type d'alerte
  schools: School[] = []; // Tableau pour stocker la liste des écoles

  // Méthode pour afficher une alerte
  showAlert(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;
    document.addEventListener('click', this.clearAlert.bind(this), { once: true });
  }

  clearAlert(event: MouseEvent) {
    const form = document.querySelector('form');
    if (form && form.contains(event.target as Node)) {
      return;
    }
    this.alertMessage = null;
    this.alertType = null;
    console.log(this.alertMessage);
  }

  RemplirChamps(): void {
    this.showAlert('Veuillez remplir les champs', 'danger');
  }

  MAJ(): void {
    this.showAlert('Élève mis à jour avec succès.', 'success');
  }

  Ajout(): void {
    this.showAlert('Élève ajouté avec succès.', 'success');
  }

  ErreurMAJ(): void {
    this.showAlert('Erreur lors de la mise à jour de l\'élève. Veuillez réessayer plus tard.', 'danger');
  }

  ErreurDelete(): void {
    this.showAlert('Erreur lors de la suppression de l\'élève. Veuillez réessayer plus tard.', 'danger');
  }
  // Constructeur avec injection des services nécessaires
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient, private route: ActivatedRoute) { } 

  // Méthode appelée à l'initialisation du composant
  ngOnInit() {
    // Récupération des écoles via le service API
    this.apiService.getSchools().subscribe({
      next: (response) => {
        this.schools = response; // Stockage des écoles reçues
        console.log('Écoles reçues :', this.schools);
        // Récupération des données des élèves après avoir chargé les écoles
        this.loadEleves();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des écoles :', err);
      }
    });
  }

  // Méthode pour charger les élèves
  loadEleves() {
    this.apiService.getData().subscribe({
      next: (response) => {
        this.eleves = response.map(eleve => {
          const school = this.schools.find(s => s.id === eleve.schoolId);
          if (school) {
            return { ...eleve, schools: school };
          } else {
            console.error(`School not found for eleve: ${eleve.nom}`);
            return { ...eleve, schools: {} as School }; // or handle the error as needed
          }
        });
        console.log('Élèves reçus :', this.eleves);
        // Abonnement aux paramètres de la route
        this.route.queryParams.subscribe(params => {
          const nom = params['nom'];
          if (nom) {
            const index = this.eleves.findIndex(eleve => eleve.nom === nom);
            if (index !== -1) {
              this.selectEleve(this.eleves[index], index); // Sélection de l'élève correspondant
            }
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
  
  // Méthode pour naviguer vers la page de recherche
  navigateToSearch() {
    this.router.navigate(['/search']);
  }

  // Méthode pour supprimer un élève
  deleteEleve(eleve: Eleve) {
    this.apiService.deleteDataById(eleve.id).subscribe({
      next: (response) => {
        this.data = response;
        this.eleves = this.eleves.filter(e => e.id !== eleve.id); // Mise à jour de la liste des élèves
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'élève :', err);
        this.ErreurDelete();
      }
    });
  }

  // Méthode pour sélectionner un élève
  selectEleve(eleve: Eleve, index: number) {
    this.newEleve = {
      nom: eleve.nom,
      prenom: eleve.prenom,
      age: eleve.age,
      sexe: eleve.sexe,
      schoolId: eleve.schoolId, // Ajoutez cette ligne pour inclure schoolId
      schools: eleve.schools
    };
    this.isUpdating = true; // Passage en mode mise à jour
    this.selectedEleveIndex = index; // Stockage de l'index de l'élève sélectionné
  }
  
  // Méthode pour ajouter ou mettre à jour un élève
  addOrUpdateEleve() {
    if (!this.newEleve.nom || !this.newEleve.prenom || !this.newEleve.age || this.newEleve.sexe === undefined || !this.newEleve.schools) {
      this.RemplirChamps();
      return;
    }

    console.log('Nom de la nouvelle école:', this.newEleve.schools.nom);

    if (this.isUpdating && this.selectedEleveIndex !== null) {
      const updatedEleve: Eleve = {
        id: this.eleves[this.selectedEleveIndex].id,
        nom: this.newEleve.nom,
        prenom: this.newEleve.prenom,
        age: this.newEleve.age,
        sexe: this.newEleve.sexe,
        schoolId: this.newEleve.schools.id, // Utilisez l'ID de la nouvelle école
        schools: this.newEleve.schools
      };

      this.apiService.putDataByName(this.eleves[this.selectedEleveIndex].nom, updatedEleve, this.newEleve.schools.nom).subscribe({
        next: (response) => {
          if (this.selectedEleveIndex !== null) {
            const school = this.schools.find(s => s.id === updatedEleve.schoolId);
            if (school) {
              this.eleves[this.selectedEleveIndex] = { ...response, schools: school }; // Mise à jour de l'élève dans la liste avec l'école correcte
            } else {
              this.eleves[this.selectedEleveIndex] = response;
            }
          }
          this.isUpdating = false; // Fin du mode mise à jour
          this.selectedEleveIndex = null; // Réinitialisation de l'index sélectionné
          this.newEleve = {}; // Réinitialisation de l'objet nouvel élève
          this.refreshPage(); // Rafraîchissement de la page
          this.MAJ();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l\'élève :', err);
          this.ErreurMAJ();
        }
      });
    } else {
      const newEleve: Partial<Eleve> = {
        nom: this.newEleve.nom,
        prenom: this.newEleve.prenom,
        age: this.newEleve.age,
        sexe: this.newEleve.sexe,
        schoolId: this.newEleve.schools.id, // Utilisez l'ID de la nouvelle école
        schools: this.newEleve.schools
      };

      this.apiService.postData(newEleve as Eleve).subscribe(response => {
        this.eleves.push(response); // Ajout du nouvel élève à la liste
        this.newEleve = {}; // Réinitialisation de l'objet nouvel élève
        this.refreshPage(); // Rafraîchissement de la page
        this.Ajout();
      });
      
    }
  }

  // Méthode pour rafraîchir la page
  refreshPage() {
    location.reload();
  }

  // Méthode pour rafraîchir la liste des élèves
  refreshEleves() {
    this.apiService.getData().subscribe({
      next: (response) => {
        this.eleves = response; // Mise à jour de la liste des élèves
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }
}