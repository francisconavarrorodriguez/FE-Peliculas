import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { credencialesUsuario, respuestaAutenticacion } from 'src/app/models/seguridad';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { parsearErroresApi } from '../../utilidades/utilidades';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errores: string[] =[]

  constructor(private seguridadService: SeguridadService, private router: Router){}


  login(credenciales: credencialesUsuario){
    this.seguridadService.login(credenciales).subscribe({
      next: (data) => {
        this.seguridadService.guardarToken(data)
        this.router.navigate(['/'])
      },
      error: (errores) => this.errores = parsearErroresApi(errores)
    })
  }
}
