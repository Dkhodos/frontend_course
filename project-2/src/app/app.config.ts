import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ono-flight-f23eb',
        appId: '1:680817298452:web:2655ea8f292dfbb1482b01',
        storageBucket: 'ono-flight-f23eb.firebasestorage.app',
        apiKey: 'AIzaSyAs9CgdsdwRIR4GSid9yLSLLudSO7vhq3g',
        authDomain: 'ono-flight-f23eb.firebaseapp.com',
        messagingSenderId: '680817298452',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
