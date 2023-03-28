import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  rating: number = 0
  peliculasCines: PeliculaDTO[] = []
  peliculasEstreno:PeliculaDTO[] = []

  constructor(private peliculasService: PeliculasService){}


  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos(){
    this.peliculasService.obtenerLandingPage().subscribe({
      next: (data) => {
        this.peliculasCines = data.enCines
        this.peliculasEstreno = data.proximosEstrenos
      }
    })
  }

  borrado(){
    this.cargarDatos()
  }
}

