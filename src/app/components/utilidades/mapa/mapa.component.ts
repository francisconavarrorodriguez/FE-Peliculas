import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer, icon } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from 'src/app/models/coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit{

  @Output() coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter()
  @Input() coordenadasIniciales: CoordenadaConMensaje[] = []
  @Input() soloLectura: boolean = false
  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map(value => {
      let marcador = marker([value.latitud, value.longitud], {
      icon: icon({
        iconSize: [25,41],
        iconAnchor: [13,41],
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    })
    if(value.mensaje){
      marcador.bindPopup(value.mensaje, {autoClose: false, autoPan: false})
    }
    return marcador
  })}



  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 6,
    center: latLng(40.400110936060024, -3.70239257812506)
  };

  capas: Marker<any>[] = []

  manejarClick(event: LeafletMouseEvent){
    

    if(!this.soloLectura){
      const latitud = event.latlng.lat
      const longitud = event.latlng.lng
      this.capas = []
      this.capas.push(marker([latitud, longitud], {
        icon: icon({
          iconSize: [25,41],
          iconAnchor: [13,41],
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }))
      this.coordenadaSeleccionada.emit({latitud: latitud, longitud: longitud })
    }
  }

}
