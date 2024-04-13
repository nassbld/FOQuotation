import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyCU4f-bUE5sM8OjVb3hTBsboJm6K_WVdho",
  authDomain: "projectcotation.firebaseapp.com",
  projectId: "projectcotation",
  storageBucket: "projectcotation.appspot.com",
  messagingSenderId: "518544517886",
  appId: "1:518544517886:web:ac2ed74dae9e4c9e1553af",
  measurementId: "G-1DG78K6G49"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
    ), provideAnimationsAsync(),
  ],
};
