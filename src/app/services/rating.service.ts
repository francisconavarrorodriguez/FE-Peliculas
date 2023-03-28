import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  apiUrl: string = environment.apiUrl + 'ratings' 

  constructor(private http: HttpClient) { }

  rated(peliculaId: number, puntuacion: number){
    return this.http.post(this.apiUrl, {peliculaId, puntuacion})
  }
}
