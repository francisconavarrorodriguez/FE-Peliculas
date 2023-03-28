import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultipleSelectorModel } from 'src/app/models/multipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaPostGet } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { parsearErroresApi } from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-peliculas',
  templateUrl: './crear-peliculas.component.html',
  styleUrls: ['./crear-peliculas.component.scss']
})
export class CrearPeliculasComponent implements OnInit{

  constructor(private peliculasService: PeliculasService, private router: Router){}

  generosNoSeleccionados: MultipleSelectorModel[] = []
  cinesNoSeleccionados: MultipleSelectorModel[] = []
  errores: string[] = []


  ngOnInit(): void {
    this.peliculasService.postGet().subscribe({
      next: (data) =>{
        this.generosNoSeleccionados = data.generos.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        })
        this.cinesNoSeleccionados = data.cines.map(cine => {
          return <MultipleSelectorModel>{llave: cine.id, valor: cine.nombre}
        })
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.crearPelicula(pelicula).subscribe({
      next: (id) => {
        this.router.navigate(['/pelicula/', id])
      },
      error: (error) => this.errores = parsearErroresApi(error)
    })
  }

}
