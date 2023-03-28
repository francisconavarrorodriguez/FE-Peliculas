import { Component } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(public seguridadService: SeguridadService){}


  logout(){
    this.seguridadService.logout()
  }
}
