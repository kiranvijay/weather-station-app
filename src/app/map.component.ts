import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { WeatherService } from './services/weather.service';
import 'leaflet-search';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-root',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  chart!: Chart;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {

    this.initMap();

    this.loadWeatherStations();

  }


  private initMap(): void {
    const defaultIcon = L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = defaultIcon;
    this.map = L.map('map').setView([1.29, 103.85], 12);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
    }).addTo(this.map);
  }


  private loadWeatherStations(): void {
    this.weatherService.getWeatherStations().subscribe(data => {
      const stations = data.area_metadata;
      const forecast = data.items[0].forecasts;
      const markers: L.LayerGroup = L.layerGroup();
      stations.forEach((station: any) => {
        const marker = L.marker([station.label_location.latitude, station.label_location.longitude], {
          title: station.name
        }).addTo(this.map);
        marker.bindPopup(`<b>${station.name}</b><br>Forecast:${forecast.find((e: any) => e.area === station.name).forecast}`);
        markers.addLayer(marker);
      });

      //search Layer:
      // const searchLayer =  L.geoJSON(stations ,  {
      //   onEachFeature: function(name, layer){
      //     layer.bindPopup(name);
      //   }
      // }).addTo(this.map)
      const searchControl = new (L.Control as any).Search({
        layer: markers,
        propertyName: 'title',
        zoom: 15,
        textPlaceholder: 'Search weather stations...'
      });
      console.log('markers', markers);
      this.map.addControl(searchControl);
    });

    this.weatherService.getForecast().subscribe(data => {
      this.createChart(data.daily);
    })



  }

  createChart(dailyData: any): void {
    const labels = dailyData.time.map((date: string) =>
      new Date(date).toLocaleDateString()
    );
    const maxTemps = dailyData.temperature_2m_max;

    // Chart Creation
    const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Daily Energy Generated (KWh)',
            data: maxTemps,
            borderColor: 'rgba(53, 244, 214, 0.8)',
            borderWidth:1,
            backgroundColor: (context) => {
              if (!context.chart.chartArea) {
                return;
              }
              const { chartArea: { top, bottom }, ctx } = context.chart;
              //gradient
              const gradientBgContext= ctx.createLinearGradient(0, top, 0, bottom);
              gradientBgContext.addColorStop(0, 'rgba(0, 255, 255, 0.6)');
              gradientBgContext.addColorStop(0.5, 'rgba(0, 128, 192, 0.4)');
              gradientBgContext.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
              return gradientBgContext;
            },
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'white',
              font: {
                size: 18,
                family: 'Nunito'
              }
            },
          },


        },

        scales: {
          x: {
            title: {
              display: true,
              color: 'white',
            },

            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
          y: {
            title: {
              display: true,
              color: 'white',
            },
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
            beginAtZero: false,
          },
        },
      },
    });


  }

}
