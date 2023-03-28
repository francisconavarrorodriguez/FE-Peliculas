import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cineCreacionDTO, cineDTO } from 'src/app/models/cine';
import { CinesService } from 'src/app/services/cines.service';
import { parsearErroresApi } from '../../utilidades/utilidades';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.scss']
})
export class EditarCineComponent {

  modelo: cineDTO | undefined
  id: number = 0
  errores: string[] = []

  constructor(private router: Router, private aRoute: ActivatedRoute, private cinesService: CinesService){
    this.id = +aRoute.snapshot.paramMap.get('id')!
  }


  ngOnInit(): void {
    this.cinesService.obtenerCineById(this.id).subscribe({
      next: (value) => {
        this.modelo = value
      },
      error: (error) => this.router.navigate(['/generos'])
    })
  }

  guardarCambios(cine: cineCreacionDTO): void{
    this.cinesService.editarCine(this.id, cine).subscribe({
      next: () =>{
        this.router.navigate(['/cines'])
      },
      error: (error) => this.errores = parsearErroresApi(error)
    })

  }


}
