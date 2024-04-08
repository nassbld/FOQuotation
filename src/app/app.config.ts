import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCU4f-bUE5sM8OjVb3hTBsboJm6K_WVdho",
  authDomain: "projectcotation.firebaseapp.com",
  projectId: "projectcotation",
  storageBucket: "projectcotation.appspot.com",
  messagingSenderId: "518544517886",
  appId: "1:518544517886:web:999d78b232c71d471553af",
  measurementId: "G-PJRYQWVZ15"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), 
    importProvidersFrom(provideFirebaseApp(() => 
      initializeApp({"projectId":"projectcotation","appId":"1:518544517886:web:999d78b232c71d471553af","storageBucket":"projectcotation.appspot.com","apiKey":"AIzaSyCU4f-bUE5sM8OjVb3hTBsboJm6K_WVdho","authDomain":"projectcotation.firebaseapp.com","messagingSenderId":"518544517886","measurementId":"G-PJRYQWVZ15"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
