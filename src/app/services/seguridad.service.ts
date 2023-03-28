import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { credencialesUsuario, respuestaAutenticacion, usuarioDTO } from '../models/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  apiUrl: string = environment.apiUrl + 'cuentas/'
  private readonly campoRol: string = 'role'

  constructor(private http: HttpClient) { }

  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString())
    params = params.append('recordsPorPagina', recordsPorPagina.toString());
    return this.http.get<usuarioDTO[]>(this.apiUrl + 'listadousuarios', { observe: 'response', params}) 
  }

  hacerAdmin(usuarioId: string){
    const headers = new HttpHeaders('Content-type: application/json')
    return this.http.post(this.apiUrl + 'hacerAdmin', JSON.stringify(usuarioId), {headers})
  }

  removerAdmin(usuarioId: string){
    const headers = new HttpHeaders('Content-type: application/json')
    return this.http.post(this.apiUrl + 'removerAdmin', JSON.stringify(usuarioId), {headers})
  }

  estaLogueado(): boolean{
    const token = localStorage.getItem('token')
    
    if(!token){
      return false
    }

    const expiracion = localStorage.getItem('token-expiracion')
    const expiracionFecha = new Date(expiracion as string) 

    if(expiracionFecha <= new Date()){
      this.logout();
      return false
    }
    return true
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('token-expiracion')
  }

  obtenerRol(): string{
    return this.obtenerCampoJWT(this.campoRol)
  }

  obtenerCampoJWT(campo: string): string{
    const token = localStorage.getItem('token')
    if(!token){
      return ''
    }
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo]
  }

  registrar(credenciales: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.http.post<respuestaAutenticacion>(this.apiUrl + 'crear', credenciales)
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion){
    localStorage.setItem('token', respuestaAutenticacion.token)
    localStorage.setItem('token-expiracion', respuestaAutenticacion.expiracion.toString())
  }

  login(credenciales: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.http.post<respuestaAutenticacion>(this.apiUrl + 'login', credenciales)
  }

  obtenerToken(){
    return localStorage.getItem('token')
  }


}
