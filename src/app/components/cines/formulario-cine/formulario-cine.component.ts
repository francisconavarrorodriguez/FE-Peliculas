import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cineCreacionDTO } from 'src/app/models/cine';
import { Coordenada, CoordenadaConMensaje } from 'src/app/models/coordenada';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.scss']
})
export class FormularioCineComponent implements OnInit{

  form: FormGroup
  @Input() modelo: cineCreacionDTO | undefined
  @Output() guardarCambios: EventEmitter<cineCreacionDTO> = new EventEmitter()
  coordenadaInicial: CoordenadaConMensaje[] = []
  @Input() errores: string [] = []

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      nombre: ['',[Validators.required]],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    if(this.modelo){
      this.form.patchValue(this.modelo)
      this.coordenadaInicial.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud, mensaje: ''})
    }
  }

  OnSubmit(){
    this.guardarCambios.emit(this.form.value)
  }

  coordenadaSeleccionada(coordenada: Coordenada){
    this.form.patchValue(coordenada)
  }

}
