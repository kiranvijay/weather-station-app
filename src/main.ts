import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MapComponent } from './app/map.component';

bootstrapApplication(MapComponent, appConfig)
  .catch((err) => console.error(err));
