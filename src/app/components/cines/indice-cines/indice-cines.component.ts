import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { cineDTO } from 'src/app/models/cine';
import { CinesService } from 'src/app/services/cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.scss']
})
export class IndiceCinesComponent {

  constructor(private cinesService: CinesService){}

  cines: cineDTO[] = []
  columnasAMostrar = ['id', 'nombre', 'acciones']
  cantidadTotalRegistros: number | undefined
  paginaActual = 1
  cantidadRegistrosAMostrar: number = 10


  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }



  cargarRegistros(pagina: number, cantidadElementosAMostrar: number): void{
    this.cinesService.obtenerTodos(pagina, cantidadElementosAMostrar).subscribe({
      next: (data: HttpResponse<cineDTO[]>) => {
        this.cines = data.body!
        this.cantidadTotalRegistros = +data.headers.get('cantidadTotalRegistros')!
      },
      error: (error) => console.error(error)
    })
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1
    this.cantidadRegistrosAMostrar = datos.pageSize
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }

  eliminarCine(indice: number){
    this.cinesService.eliminarCine(indice).subscribe({
      next: () => {
        console.log('Eliminado con exito')
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error: (error) => console.error(error)
    })
  }
}
