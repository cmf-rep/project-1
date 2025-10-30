import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Listen to Firebase auth state and map to Firestore user document
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: firebase.User | null) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  /** --------------------
   *  🔑 AUTH FUNCTIONS
   *  -------------------- */

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    if (credential.user) {
      await this.updateUserData(credential.user);
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    await this.router.navigate(['/login']);
  }

  /** --------------------
   *  💾 USER DATA
   *  -------------------- */
  private updateUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // Default roles assigned on first login
    const data: User = {
      uid: user.uid,
      roles: {
        student: true,
        facultymember: false,
        techstaff: false,
        admin: false
      }
    };

    return userRef.set(data, { merge: true });
  }

  /** --------------------
   *  🧭 ROLE CHECKS
   *  -------------------- */
  private checkAuthorization(user: User | null, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles?.[role]) {
        return true;
      }
    }
    return false;
  }

  // Permissions
  canRead(user: User | null): boolean {
    const allowed = ['student', 'facultymember', 'techstaff', 'admin'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User | null): boolean {
    const allowed = ['facultymember', 'techstaff', 'admin'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User | null): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }
}
