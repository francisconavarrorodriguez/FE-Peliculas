import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from 'src/app/models/actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.scss']
})
export class FormularioActoresComponent implements OnInit{

  form: FormGroup
  @Output() OnSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter()
  @Input() modelo: actorDTO | undefined
  @Input() errores: string[] = []

  imagenCambiada: boolean = false

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      fechaNacimiento: '',
      foto: '',
      biografia: ''
    })
  }

  ngOnInit(): void {
    if(this.modelo != undefined){
      this.form.patchValue(this.modelo)
    }
  }

  onSubmit(){
    if(!this.imagenCambiada){
      this.form.patchValue({'foto': null})
    }
    this.OnSubmit.emit(this.form.value)
  }

  archivoSeleccionado(file: File){
    this.imagenCambiada = true
    this.form.get('foto')?.setValue(file)
  }

  cambioMarkdown(value: string){
    this.form.get('biografia')?.setValue(value)
  }

}
