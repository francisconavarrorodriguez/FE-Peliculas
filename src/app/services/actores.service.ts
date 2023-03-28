import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formatearFecha } from '../components/utilidades/utilidades';
import { environment } from '../environments/environment';
import { actorCreacionDTO, actorDTO, actorPeliculaDTO } from '../models/actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiUrl: string = environment.apiUrl + 'actores/'

  constructor(private http: HttpClient) { }

  obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number) : Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString())
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString())
    return this.http.get<actorDTO[]>(this.apiUrl, {observe: 'response', params})
  }

  crearActor(actor: actorCreacionDTO): Observable<any>{

    const formData = this.construirFormData(actor)

    return this.http.post(this.apiUrl, formData)
  }

  construirFormData(actor: actorCreacionDTO): FormData{
    const formData = new FormData()
    formData.append('nombre', actor.nombre)
    if(actor.biografia){
      formData.append('biografia', actor.biografia)
    }
    if(actor.fechaNacimiento){
    formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento))
    }
    if(actor.foto){
      formData.append('foto', actor.foto)
    }
    return formData
  }

  eliminarActor(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + id)
  }

  obtenerActorById(id: number): Observable<actorDTO>{
    return this.http.get<actorDTO>(this.apiUrl + id)
  }

  editarActor(id: number, actor: actorCreacionDTO): Observable<any>{
    const formData = this.construirFormData(actor)
    return this.http.put(this.apiUrl + id, formData)
  }

  obtenerPorNombre(nombre: string): Observable<actorPeliculaDTO[]> {
    const headers = new HttpHeaders('Content-Type: application/json')
    return this.http.post<actorPeliculaDTO[]>(`${this.apiUrl}buscarPorNombre`, JSON.stringify(nombre), {headers})
  }

}
