import { Component, Input } from '@angular/core';
import { MultipleSelectorModel } from 'src/app/models/multipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.scss']
})
export class SelectorMultipleComponent {

  @Input() seleccionados: MultipleSelectorModel[] = []
  @Input() noSeleccionados: MultipleSelectorModel[] = []

  seleccionarTodo(){
    this.seleccionados.push(...this.noSeleccionados)
    this.noSeleccionados = []
  }
  deseleccionarTodo(){
    this.noSeleccionados.push(...this.seleccionados)
    this.seleccionados = []
  }

  seleccionar(item: MultipleSelectorModel, index: number){
    this.seleccionados.push(item)
    this.noSeleccionados.splice(index,1)
  }

  deseleccionar(item: MultipleSelectorModel, index: number){
    this.noSeleccionados.push(item)
    this.seleccionados.splice(index,1)
  }


}
