import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import { provideAnimations }    from '@angular/platform-browser/animations';
import { provideHttpClient }    from '@angular/common/http';


import { AppComponent } from './app/app.component';
import { appRoutes }    from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
