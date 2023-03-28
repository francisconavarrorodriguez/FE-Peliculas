import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formatearFecha } from '../components/utilidades/utilidades';
import { environment } from '../environments/environment';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculaPostGet, PeliculaPutGet } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private apiUrl: string = environment.apiUrl + 'peliculas/'

  constructor(private http: HttpClient) { }

  obtenerLandingPage(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(this.apiUrl)
  }

  filtrar(valores: any): Observable<any>{
    const params = new HttpParams({fromObject: valores})
    return this.http.get<PeliculaDTO[]>(this.apiUrl + 'filtrar', {params, observe: 'response'});
  }

  obtenerPorId(id: number): Observable<PeliculaDTO>{
    return this.http.get<PeliculaDTO>(this.apiUrl + id)
  }

  postGet(): Observable<PeliculaPostGet> {
    return this.http.get<PeliculaPostGet>(this.apiUrl + 'postget')
  }

  crearPelicula(pelicula: PeliculaCreacionDTO): Observable<number>{
    const formData = this.construirFormData(pelicula)
    return this.http.post<number>(this.apiUrl, formData)
  }

  private construirFormData(pelicula: PeliculaCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('titulo', pelicula.titulo)
    formData.append('resumen', pelicula.resumen)
    formData.append('trailer', pelicula.trailer)
    formData.append('enCines', String(pelicula.enCines))
    if(pelicula.fechaLanzamiento){
      formData.append('fechaLanzamiento', formatearFecha(pelicula.fechaLanzamiento))
    }
    if(pelicula.poster){
      formData.append('poster', pelicula.poster)
    }
    formData.append('generosIds', JSON.stringify(pelicula.generosIds))
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds))
    formData.append('actores', JSON.stringify(pelicula.actores))

    return formData
  }

  putGet(id: number): Observable<PeliculaPutGet>{
    return this.http.get<PeliculaPutGet>(this.apiUrl + 'putget/' + id )
  }

  editar(id: number, pelicula: PeliculaCreacionDTO):Observable<any>{
    const formData = this.construirFormData(pelicula)
    return this.http.put(this.apiUrl + id, formData)
  }

  borrar(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + id)
  }

}
