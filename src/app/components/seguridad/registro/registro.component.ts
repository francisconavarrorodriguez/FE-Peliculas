import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { credencialesUsuario } from 'src/app/models/seguridad';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { parsearErroresApi } from '../../utilidades/utilidades';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  errores: string[] = []

  constructor(private seguridadService: SeguridadService, private router: Router){}

  registrar(credenciales: credencialesUsuario){
    this.seguridadService.registrar(credenciales).subscribe({
      next: (data) => {
        this.seguridadService.guardarToken(data)
        this.router.navigate(['/'])
      },
      error: (error) => this.errores = parsearErroresApi(error)
    })
  }
}
