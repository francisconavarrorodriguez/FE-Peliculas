import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreacionDTO, actorDTO } from 'src/app/models/actor';
import { ActoresService } from 'src/app/services/actores.service';
import { parsearErroresApi } from '../../utilidades/utilidades';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.scss']
})
export class EditActorComponent implements OnInit{

  modelo: actorDTO | undefined
  idActor: number = 0
  errores: string[] = []


  constructor(private aRoute: ActivatedRoute, private actoresService: ActoresService, private router: Router){
    this.aRoute.params.subscribe((params) => {
      this.idActor = +params['id']
    })
  }


  ngOnInit(): void {
    this.actoresService.obtenerActorById(this.idActor).subscribe({
      next: (value) => {
        this.modelo = value
      },
      error: () => this.router.navigate(['/generos'])
    })
  }

  guardarCambios(actor: actorCreacionDTO): void{
    this.actoresService.editarActor(this.idActor, actor).subscribe({
      next: () =>{
        this.router.navigate(['/actores'])
      },
      error: (error) => this.errores = parsearErroresApi(error)
    })

  }

}
