import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { generoCreacionDTO, generoDTO } from '../models/genero';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private apiUrl: string = environment.apiUrl + 'generos/'

  constructor(private http: HttpClient) { }

  obtenerPaginado(pagina: number, cantidadRegistrosAMostrar: number) : Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString())
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString())
    return this.http.get<generoDTO[]>(this.apiUrl, {observe: 'response', params})
  }

  obtenerTodos(){
    return this.http.get<generoDTO[]>(this.apiUrl + 'todos')
  }

  crearGenero(genero: generoCreacionDTO): Observable<any>{
    return this.http.post(this.apiUrl, genero)
  }

  obtenerGeneroById(id: number): Observable<generoDTO>{
    return this.http.get<generoDTO>(this.apiUrl + id)
  }

  editarGenero(id: number, genero: generoCreacionDTO): Observable<any>{
    return this.http.put(this.apiUrl + id, genero)
  }

  eliminarGenero(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + id)
  }
}
