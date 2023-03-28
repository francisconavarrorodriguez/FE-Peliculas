import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generoCreacionDTO, generoDTO } from 'src/app/models/genero';
import { GenerosService } from 'src/app/services/generos.service';
import { parsearErroresApi } from '../../utilidades/utilidades';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.scss']
})
export class EditarGeneroComponent implements OnInit{

  modelo: generoDTO | undefined
  id: number = 0
  errores: string[] = []

  constructor(private router: Router, private aRoute: ActivatedRoute, private generosService: GenerosService){
    this.id = +aRoute.snapshot.paramMap.get('id')!
  }


  ngOnInit(): void {
    this.generosService.obtenerGeneroById(this.id).subscribe({
      next: (value) => {
        this.modelo = value
      },
      error: (error) => this.router.navigate(['/generos'])
    })
  }

  guardarCambios(genero: generoCreacionDTO): void{
    this.generosService.editarGenero(this.id, genero).subscribe({
      next: () =>{
        this.router.navigate(['/generos'])
      },
      error: (error) => this.errores = parsearErroresApi(error)
    })

  }

}
