import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit{
  
  @Input() maximoRating: number = 5
  @Input() ratingSeleccionado: number = 0
  ratingAnterior: number = 0

  @Output() rated: EventEmitter<number> = new EventEmitter()

  maximoRatingArr: number[] = []

  constructor(private seguridadService: SeguridadService){}

  ngOnInit(): void {
    this.maximoRatingArr = Array(this.maximoRating).fill(0)
  }

  manejarMouseEnter(indice: number){
    this.ratingSeleccionado = indice + 1
  }
  manejarMouseLeave(){
    if(this.ratingAnterior != 0){
      this.ratingSeleccionado = this.ratingAnterior
    } else {
      this.ratingSeleccionado = 0
    }
  }

  manejarMouseClick(indice: number){

    if(this.seguridadService.estaLogueado()){
      this.ratingSeleccionado = indice + 1
      this.ratingAnterior = this.ratingSeleccionado
      this.rated.emit(this.ratingSeleccionado)
    } else{
      Swal.fire("Debe loguearse", "No puede realizar esta acción", "error")
    }


  }

}
