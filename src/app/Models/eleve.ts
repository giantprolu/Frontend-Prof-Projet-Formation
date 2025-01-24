import { School } from './school';

/**
 * Interface représentant un élève.
 */
export interface Eleve {
  /**
   * Identifiant unique de l'élève.
   * @type {number}
   */
  id: number;

  /**
   * Nom de famille de l'élève.
   * @type {string}
   */
  nom: string;

  /**
   * Prénom de l'élève.
   * @type {string}
   */
  prenom: string;

  /**
   * Âge de l'élève.
   * @type {number}
   */
  age: number;

  /**
   * Sexe de l'élève.
   * @type {boolean}
   */
  sexe: boolean;

  /**
   * Identifiant de l'école de l'élève.
   * @type {number}
   */
  schoolId: number;

  /**
   * Objet représentant l'école de l'élève.
   * @type {School}
   */
  schools: School;
}
