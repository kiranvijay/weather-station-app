import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherAPI = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
  private forecastAPI = 'https://api.open-meteo.com/v1/forecast';
  private forcaseApiConfig = '?latitude=1.29&longitude=103.85&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Singapore&start_date=2024-11-01&end_date=2024-11-10'

  constructor(private http: HttpClient) {}

  getWeatherStations(): Observable<any> {
    return this.http.get(this.weatherAPI);
  }

  getForecast(): Observable<any> {
    const url = `${this.forecastAPI}${this.forcaseApiConfig}`;
    return this.http.get(url);
  }
}