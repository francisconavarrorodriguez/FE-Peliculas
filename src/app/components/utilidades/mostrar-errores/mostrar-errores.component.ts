import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-errores',
  templateUrl: './mostrar-errores.component.html',
  styleUrls: ['./mostrar-errores.component.scss']
})
export class MostrarErroresComponent {

  @Input() errores: string[] = []

}
