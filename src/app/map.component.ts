import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    const defaultIcon = L.icon({
      iconUrl: 'assets/marker-icon.png', // Path to the marker icon
      shadowUrl: 'assets/marker-shadow.png', // Path to the shadow
      iconSize: [25, 41], // Size of the icon
      iconAnchor: [12, 41], // Anchor of the icon
      popupAnchor: [1, -34], // Position of popup relative to icon
      shadowSize: [41, 41], // Size of the shadow
    });
  
    L.Marker.prototype.options.icon = defaultIcon;
    this.initMap();
    this.loadWeatherStations();
  
  }

 
  

  private initMap(): void {
    this.map = L.map('map').setView([1.29, 103.85], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }
  

  private loadWeatherStations(): void {
    this.weatherService.getWeatherStations().subscribe(data => {
      const stations = data.area_metadata;
      const forecast = data.items[0].forecasts;
      stations.forEach((station: any) => {
        const marker = L.marker([station.label_location.latitude, station.label_location.longitude]).addTo(this.map);
        marker.bindPopup(`<b>${station.name}</b><br>Forecast:${forecast.find((e:any) => e.area == station.name).forecast}`);
      });
    });
  }
}
