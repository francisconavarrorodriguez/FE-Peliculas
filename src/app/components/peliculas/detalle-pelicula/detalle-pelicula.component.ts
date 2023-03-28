import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoordenadaConMensaje } from 'src/app/models/coordenada';
import { PeliculaDTO } from 'src/app/models/pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { RatingService } from 'src/app/services/rating.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit{

  pelicula: PeliculaDTO | undefined
  fechaLanzamiento: Date = new Date()
  trailerURL: SafeResourceUrl = ''
  coordenadas: CoordenadaConMensaje[] = []

  constructor(private peliculasService: PeliculasService, private aRoute: ActivatedRoute, private sanitazer: DomSanitizer, private ratingService: RatingService){}


  ngOnInit(): void {
    this.aRoute.params.subscribe({
      next: (params) => this.peliculasService.obtenerPorId(params['id']).subscribe({
        next: (data) => {
          console.log(data)
          this.pelicula = data
          this.fechaLanzamiento = new Date(data.fechaLanzamiento)
          this.trailerURL = this.generarURLYoutubeEmbed(data.trailer)
          this.coordenadas = data.cines.map(cine => {
            return { latitud: cine.latitud, longitud: cine.longitud, mensaje: cine.nombre}
          })
        }
      })
    })
  }

  generarURLYoutubeEmbed(url: any): SafeResourceUrl{
    if (!url){
      return ''
    }

    let video_id = url.split('v=')[1]
    let posicionAmpersand = video_id.indexOf('&')
    if(posicionAmpersand != -1){
      video_id = video_id.substring(0, posicionAmpersand)
    }
    return this.sanitazer.bypassSecurityTrustResourceUrl(`https://www.youtube.com.embed/${video_id}`)
  }

  rated(puntuacion: any){
    this.ratingService.rated(this.pelicula?.id!, puntuacion).subscribe({
      next: () => {
        Swal.fire("Exitoso", "Su voto ha sido recibido", 'success')
      }
    })
  }

}
