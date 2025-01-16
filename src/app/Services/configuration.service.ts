import { Injectable } from '@angular/core';
 
Injectable({
    providedIn: 'root'
    })
    // we export the class for use
    // in other components
 
   
export const configuration = {
 
    apiUrl: "http://localhost:8000/api/Eleve"
 
  };
 
    //service to load the configuration file