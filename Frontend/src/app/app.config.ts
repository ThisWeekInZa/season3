import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeng/themes/aura';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
import { MockAuthService } from './services-mock/mock-auth.service';
import { AccountService } from './services/account.service';
import { MockAccountService } from './services-mock/mock-account.service';
import { MockTenantService } from './services-mock/mock-tenant.service';
import { TenantService } from './services/tenant.service';
import { PostService } from './services/post.service';
import { MockPostService } from './services-mock/mock-post.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    BrowserAnimationsModule,
    provideHttpClient(),
    {
      provide: AuthService,
      useClass: environment.mock ? MockAuthService : AuthService,
    },
    {
      provide: AccountService,
      useClass: environment.mock ? MockAccountService : AccountService,
    },
    {
      provide: TenantService,
      useClass: environment.mock ? MockTenantService : TenantService,
    },
    {
      provide: PostService,
      useClass: environment.mock ? MockPostService : PostService,
    },
  ],
};
