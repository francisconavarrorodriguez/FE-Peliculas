import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { actorCreacionDTO } from 'src/app/models/actor';
import { ActoresService } from 'src/app/services/actores.service';
import { parsearErroresApi } from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.scss']
})
export class CrearActorComponent {

  errores: string[] = []

  constructor(private _actoresService: ActoresService, private router: Router){}

  obtenerDatos(actor: actorCreacionDTO){
    this._actoresService.crearActor(actor).subscribe({
      next: () => {
        this.router.navigate(['/actores'])
      },
      error: (error) => this.errores = parsearErroresApi(error)
    })
  }

}
