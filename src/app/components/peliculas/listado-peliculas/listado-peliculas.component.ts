import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PeliculaDTO } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.scss']
})
export class ListadoPeliculasComponent {

  @Input() peliculas: PeliculaDTO[] = []

  @Output() borrado: EventEmitter<void> = new EventEmitter();

  @Input() edicion: boolean = true

  constructor(private peliculasService: PeliculasService){}

  eliminarPelicula(peliculaId: number): void{
    this.peliculasService.borrar(peliculaId).subscribe({
      next: () => {
        this.borrado.emit()
      }
    })
  }

}
