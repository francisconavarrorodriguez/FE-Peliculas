import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/models/actor';
import { MultipleSelectorModel } from 'src/app/models/multipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from 'src/app/models/pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.scss']
})
export class FormularioPeliculaComponent implements OnInit{

  form: FormGroup;

  @Input() errores: string[] = []

  @Output() OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter()

  @Input() modelo: PeliculaDTO | undefined

  @Input() generosNoSeleccionados: MultipleSelectorModel[] = []

  @Input() generosSeleccionados: MultipleSelectorModel[] = []

  @Input() cinesNoSeleccionados: MultipleSelectorModel[] = []

  @Input() actoresSeleccionados: actorPeliculaDTO[] = []

  @Input() cinesSeleccionados: MultipleSelectorModel[] = []

  imagenCambiada: boolean = false

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    })
  }
  ngOnInit(): void {
    if(this.modelo){
      this.form.patchValue(this.modelo)
    }
  }

  guardarCambios(){
    const generosId = this.generosSeleccionados.map(val => val.llave)
    this.form.get('generosIds')?.setValue(generosId)

    const cinesId = this.cinesSeleccionados.map(val => val.llave)
    this.form.get('cinesIds')?.setValue(cinesId)

    const actores = this.actoresSeleccionados.map(val => {
      return { id: val.id, personaje: val.personaje }
    })
    this.form.get('actores')?.setValue(actores)

    if(!this.imagenCambiada){
      this.form.patchValue({'poster': null})
    }

    this.OnSubmit.emit(this.form.value)
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster')?.setValue(archivo)
    this.imagenCambiada = true
  }

  changeMarkdown(texto: string){
    this.form.get('resumen')?.setValue(texto)
  }
}
