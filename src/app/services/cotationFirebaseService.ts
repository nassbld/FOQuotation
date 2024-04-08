import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { IQuote } from '../types/quote.interface';

@Injectable({ providedIn: 'root' })
export class CotationFirebaseService {
  firestore = inject(Firestore);
  quoteCollections = collection(this.firestore, 'quote');

  getQuote(): Observable<IQuote[]> {
    return collectionData(this.quoteCollections, {
      idField: 'quoteId',
    }) as Observable<IQuote[]>;
  }

  updateQuote(
    quoteId: string,
    dataToUpdate: { quotation: number }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'quote', quoteId);
    return from(setDoc(docRef, dataToUpdate, { merge: true }));
  }
}
