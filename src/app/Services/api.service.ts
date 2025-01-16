import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Eleve } from '../Models/eleve';
import {configuration} from './configuration.service';

/**
 * Service API pour interagir avec les données des élèves.
 * 
 * @remarks
 * Ce service utilise HttpClient pour effectuer des requêtes HTTP vers une API REST.
 * 
 * @example
 * ```typescript
 * constructor(private apiService: ApiService) {}
 * 
 * this.apiService.getData().subscribe(data => {
 *   console.log(data);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * URL de base de l'API.
   */
  private apiUrl = configuration.apiUrl; 
  
  /**
   * Constructeur du service API.
   * 
   * @param http - Instance de HttpClient pour effectuer des requêtes HTTP.
   */
  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des élèves.
   * 
   * @returns Un Observable contenant un tableau d'objets Eleve.
   */
  getData(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.apiUrl}/endpoint`);
  }

  /**
   * Récupère les données d'un élève par son identifiant.
   * 
   * @param id - Identifiant de l'élève.
   * @returns Un Observable contenant l'objet Eleve correspondant.
   */
  getDataById(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.apiUrl}/${id}`);
  }

  /**
   * Supprime les données d'un élève par son identifiant.
   * 
   * @param id - Identifiant de l'élève.
   * @returns Un Observable contenant la réponse de la requête HTTP.
   */
  deleteDataById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Ajoute un nouvel élève.
   * 
   * @param eleve - Objet Eleve à ajouter.
   * @returns Un Observable contenant l'objet Eleve ajouté.
   */
  postData(eleve: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(`${this.apiUrl}`, eleve).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Met à jour les données d'un élève par son nom.
   * 
   * @param nom - Nom de l'élève.
   * @param eleve - Objet Eleve contenant les nouvelles données.
   * @returns Un Observable contenant l'objet Eleve mis à jour.
   */
  putDataByName(nom: string, eleve: Eleve): Observable<Eleve> {
    return this.http.put<Eleve>(`${this.apiUrl}/byname/${nom}`, eleve).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Gère les erreurs HTTP.
   * 
   * @param error - Objet HttpErrorResponse contenant les détails de l'erreur.
   * @returns Un Observable qui lance une erreur.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
