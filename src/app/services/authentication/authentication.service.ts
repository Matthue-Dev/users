import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;

  constructor(
    private authentication: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
  ) {
    this.user$ = authentication.authState.pipe(
      switchMap(user => {
        if (user) {
          return firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.authentication.signInWithPopup(provider);
    return this.updateUser(credential.user);
  }

  async signOut() {
    await this.authentication.signOut();
    this.router.navigate(['/']);
  }

  private updateUser(user: User) {
    console.log(user);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    this.firestore.doc<User>(`users/${user.uid}`).set(data, { merge: true });
  }
}
