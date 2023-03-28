import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from 'src/app/models/seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.scss']
})
export class FormularioAutenticacionComponent {

  form: FormGroup;
  @Input() errores: string[] = []
  @Output() onSubmit: EventEmitter<credencialesUsuario> = new EventEmitter()
  @Input() accion: string = ''


  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  obtenerMensajeEmail(): string{
    var campo = this.form.get('email')
    if(campo?.hasError('required')){
      return 'El campo Email es requerido'
    }
    if(campo?.hasError('email')){
      return 'El email no es valido'
    }
    return ''
  }



}
