import { Component, Input } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.scss']
})
export class AutorizadoComponent {

  @Input() rol: string = ''

  constructor(private seguridadService: SeguridadService){}


  estaAutorizado(): boolean{
    if(this.rol){
      return this.seguridadService.obtenerRol() === this.rol
    }
    return this.seguridadService.estaLogueado()
  }

}
