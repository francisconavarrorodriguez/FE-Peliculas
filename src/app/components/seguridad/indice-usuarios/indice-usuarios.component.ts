import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { usuarioDTO } from 'src/app/models/seguridad';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.scss']
})
export class IndiceUsuariosComponent {

  constructor(private seguridadService: SeguridadService){}

  usuarios: usuarioDTO[] = []
  columnasAMostrar = ['nombre', 'acciones']
  cantidadTotalRegistros: number | undefined
  paginaActual = 1
  cantidadRegistrosAMostrar: number = 10


  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar)
  }



  cargarRegistros(pagina: number, cantidadElementosAMostrar: number): void{
    this.seguridadService.obtenerUsuarios(pagina, cantidadElementosAMostrar).subscribe({
      next: (data: HttpResponse<usuarioDTO[]>) => {
        this.usuarios = data.body!
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

  hacerAdmin(usuarioId: string){
    this.seguridadService.hacerAdmin(usuarioId).subscribe({
      next: () => {
        Swal.fire('Exitoso', 'La operacion se ha relizado', 'success')
      }
    })
  }

  removerAdmin(usuarioId: string){
    this.seguridadService.removerAdmin(usuarioId).subscribe({
      next: () => {
        Swal.fire('Exitoso', 'La operacion se ha relizado', 'success')
      }
    })
  }

}
