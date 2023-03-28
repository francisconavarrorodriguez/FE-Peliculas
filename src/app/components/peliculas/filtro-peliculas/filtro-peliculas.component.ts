import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/models/genero';
import { GenerosService } from 'src/app/services/generos.service';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { PeliculaDTO } from 'src/app/models/pelicula';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.scss']
})
export class FiltroPeliculasComponent implements OnInit{

  form: FormGroup
  generos: generoDTO[] = []
  paginaActual = 1
  cantidadElementosAMostrar = 10
  cantidadElementos: number = 0

  peliculas: PeliculaDTO[] = []

  constructor(private fb: FormBuilder, private location: Location, private aRoute: ActivatedRoute, private generosService: GenerosService, private peliculasService: PeliculasService){
    this.form = this.fb.group({
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false
    })
  }

  ngOnInit(): void {

    this.generosService.obtenerTodos().subscribe({
      next: (data) => {
        this.generos = data
        this.form.valueChanges.subscribe({
          next: (valores) =>{
            this.buscarPeliculas(valores);
            this.escribirParametrosBusquedaEnUrl()
          }
        })
        this.leerValoresUrl()
      }
    })

    
  }

  private leerValoresUrl(){
    this.aRoute.queryParams.subscribe({
      next: (params) => {
        let objeto: any = {}

        if(params['titulo']){
          objeto.titulo = params['titulo']
        }
        if(params['generoId']){
          objeto.generoId = +params['generoId']
        }
        if(params['proximosEstrenos']){
          objeto.proximosEstrenos = params['proximosEstrenos']
        }
        if(params['enCines']){
          objeto.enCines = params['enCines']
        }
        this.form.patchValue(objeto)
      }
    })
  }

  private escribirParametrosBusquedaEnUrl(){
    let queryStrings: string[] = []

    let valoresFormulario = this.form.value

    if(valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`)
    }
    if(valoresFormulario.generoId != 0){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`)
    }
    if(valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`)
    }
    if(valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`)
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'))
  }

  limpiar(){
    this.form.reset();
  }

  buscarPeliculas(valores: any){
    valores.pagina = this.paginaActual
    valores.recordsPorPagina = this.cantidadElementosAMostrar
    this.peliculasService.filtrar(valores).subscribe({
      next: (response) => {
        this.peliculas = response.body
        this.escribirParametrosBusquedaEnUrl()
        this.cantidadElementos = response.headers.get('cantidadTotalRegistros')
      }
    })
  }

  paginatorUpdate(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1
    this.cantidadElementosAMostrar = datos.pageSize
    this.buscarPeliculas(this.form.value)
  }

}
