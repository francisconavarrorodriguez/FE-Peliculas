import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { generoDTO } from 'src/app/models/genero';
import { GenerosService } from 'src/app/services/generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.scss']
})
export class IndiceGenerosComponent implements OnInit{


  constructor(private _generosService: GenerosService){}

  generos: generoDTO[] = []
  columnasAMostrar = ['id', 'nombre', 'acciones']
  cantidadTotalRegistros: number | undefined
  paginaActual = 1
  cantidadRegistrosAMostrar: number = 10


  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }



  cargarRegistros(pagina: number, cantidadElementosAMostrar: number): void{
    this._generosService.obtenerPaginado(pagina, cantidadElementosAMostrar).subscribe({
      next: (data: HttpResponse<generoDTO[]>) => {
        this.generos = data.body!
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

  eliminarGenero(indice: number){
    this._generosService.eliminarGenero(indice).subscribe({
      next: () => {
        console.log('Eliminado con exito')
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      error: (error) => console.error(error)
    })
  }
}
