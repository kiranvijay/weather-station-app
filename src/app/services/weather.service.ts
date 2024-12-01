import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherAPI = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
  private forecastAPI = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeatherStations(): Observable<any> {
    return this.http.get(this.weatherAPI);
  }

  getForecast(lat: number, lon: number): Observable<any> {
    const url = `${this.forecastAPI}?latitude=${lat}&longitude=${lon}&hourly=relativehumidity_2m,direct_radiation&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore`;
    return this.http.get(url);
  }
}