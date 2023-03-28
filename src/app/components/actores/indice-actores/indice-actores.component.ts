import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDTO } from 'src/app/models/actor';
import { ActoresService } from 'src/app/services/actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.scss']
})
export class IndiceActoresComponent {

  constructor(private _actoresService: ActoresService){}

  actores: actorDTO[] = []
  columnasAMostrar = ['id', 'nombre', 'acciones']
  cantidadTotalRegistros: number | undefined
  paginaActual = 1
  cantidadRegistrosAMostrar: number = 10


  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }



  cargarRegistros(pagina: number, cantidadElementosAMostrar: number): void{
    this._actoresService.obtenerTodos(pagina, cantidadElementosAMostrar).subscribe({
      next: (data: HttpResponse<actorDTO[]>) => {
        this.actores = data.body!
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

  eliminarActor(indice: number){
    this._actoresService.eliminarActor(indice).subscribe({
      next: () => {
        console.log('Eliminado con exito')
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error: (error) => console.error(error)
    })
  }
}
