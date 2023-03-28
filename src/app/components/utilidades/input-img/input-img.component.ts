import { Component, EventEmitter, Input, Output } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.scss']
})
export class InputImgComponent {

  imageBase64: string = ''
  @Output() archivoSeleccionado: EventEmitter<File> = new EventEmitter()
  @Input() urlImagenActual: string | undefined

  change(evento: any){
    if(evento.target.files.length > 0){
      const file: File = evento.target.files[0]
      toBase64(file).then((value: string) => {
        this.imageBase64 = value
        this.urlImagenActual = undefined
      })
      .catch((error) => console.log(error))
      this.archivoSeleccionado.emit(file)
    }
  }


}
