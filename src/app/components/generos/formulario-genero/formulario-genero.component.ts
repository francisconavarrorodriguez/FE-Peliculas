import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { generoCreacionDTO } from 'src/app/models/genero';
import { primeraLetraMayuuscula } from '../../utilidades/validadores/primeraLetraMayuscula';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.scss']
})
export class FormularioGeneroComponent implements OnInit{

  form: FormGroup
  @Output() onSubmit : EventEmitter<generoCreacionDTO> = new EventEmitter();
  @Input() modeloCreacionDTO: generoCreacionDTO | undefined
  @Input() errores: string[] = []

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), primeraLetraMayuuscula()]],
    })
  }

  ngOnInit(): void {
    if(this.modeloCreacionDTO != undefined){
      this.form.patchValue(this.modeloCreacionDTO);
    }
  }

  obtenerCampoErrorNombre(): string{
    const campo = this.form.get('nombre')
    if(campo?.hasError('required')){
      return 'El campo nombre requerido'
    }
    if(campo?.hasError('minlength')){
      return 'El campo nombre debe tener al menos 3 caracteres'
    }
    if(campo?.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje
    }
    return ''
  }

  guardarCambios(){
    this.onSubmit.emit(this.form.value)
  }
}
