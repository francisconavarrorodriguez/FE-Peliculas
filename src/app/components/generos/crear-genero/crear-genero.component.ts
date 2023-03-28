import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDTO } from 'src/app/models/genero';
import { GenerosService } from 'src/app/services/generos.service';
import { parsearErroresApi } from '../../utilidades/utilidades';


@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.scss']
})
export class CrearGeneroComponent {

  errores: string[] = []


  constructor(private router: Router, private generosService: GenerosService){}


  guardarCambios(genero: generoCreacionDTO): void{
    this.generosService.crearGenero(genero).subscribe({
      next: () => {
        this.router.navigate(['/generos'])
      },
      error: (error) => this.errores = parsearErroresApi(error)
    })
  }
}
