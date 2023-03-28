import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cineCreacionDTO } from 'src/app/models/cine';
import { CinesService } from 'src/app/services/cines.service';
import { parsearErroresApi } from '../../utilidades/utilidades';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.scss']
})
export class CrearCineComponent {

  errores: string[] = []


  constructor(private router: Router, private cinesService: CinesService){}


  guardarCambios(cine: cineCreacionDTO): void{
    this.cinesService.crearCine(cine).subscribe({
      next: () => {
        this.router.navigate(['/cines'])
      },
      error: (error) => this.errores = parsearErroresApi(error)
    })
  }

}
