import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { cineCreacionDTO, cineDTO } from '../models/cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  private apiUrl: string = environment.apiUrl + 'cines/'

  constructor(private http: HttpClient) { }


  obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number) : Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString())
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString())
    return this.http.get<cineDTO[]>(this.apiUrl, {observe: 'response', params})
  }

  obtenerCineById(id: number): Observable<cineDTO>{
    return this.http.get<cineDTO>(this.apiUrl + id)
  }

  crearCine(cine: cineCreacionDTO): Observable<any>{
    return this.http.post(this.apiUrl, cine)
  }

  editarCine(id: number, cine: cineCreacionDTO): Observable<any>{
    return this.http.put(this.apiUrl + id, cine)
  }

  eliminarCine(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + id)
  }

}
