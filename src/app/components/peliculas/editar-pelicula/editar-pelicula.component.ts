import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/models/actor';
import { MultipleSelectorModel } from 'src/app/models/multipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.scss']
})
export class EditarPeliculaComponent {

  modelo: PeliculaDTO | undefined
  generosSeleccionados: MultipleSelectorModel[] = []
  generosNoSeleccionados: MultipleSelectorModel[] = []
  cinesSeleccionados: MultipleSelectorModel[] = []
  cinesNoSeleccionados: MultipleSelectorModel[] = []
  actoresSeleccionados: actorPeliculaDTO[] = []

  constructor(private peliculasService: PeliculasService, private aRoute: ActivatedRoute, private router: Router){
    this.aRoute.params.subscribe(params => {
      this.peliculasService.putGet(params['id']).subscribe({
        next: (data) => {
          this.modelo = data.pelicula

          this.generosSeleccionados = data.generosSeleccionados.map(genero => {
            return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
          })
          this.generosNoSeleccionados = data.generosNoSeleccionados.map(genero => {
            return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
          })
          this.cinesSeleccionados = data.cinesSeleccionados.map(cine => {
            return <MultipleSelectorModel>{llave: cine.id, valor: cine.nombre}
          })
          this.cinesNoSeleccionados = data.cinesNoSeleccionados.map(cine => {
            return <MultipleSelectorModel>{llave: cine.id, valor: cine.nombre}
          })
          this.actoresSeleccionados = data.actores
        }
      })
    })
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.editar(this.modelo?.id!, pelicula).subscribe({
      next: () => {
        this.router.navigate(['/pelicula/' + this.modelo?.id])
      }
    })
  }
}
