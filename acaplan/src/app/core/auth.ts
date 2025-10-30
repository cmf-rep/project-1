import { injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angularfire2/auth";
import {
  AngularFireStore,
  AngularFirestoreDocument,
} from "angularfire2/firestore";
import { User } from "./user";

injectable()
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFireStore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.switchMap((user) => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

}

google.login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oauthLogin(provider);
}

private oAuthlogin(provider){
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
        this.updateUserData(credential.user);
    }); 
}
signout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["../login"]);
    }
}

private update(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      roles: {
        student: true
      }
    };
    return userRef.set(data, { merge: true });
}

private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
}

canRead(user: User): boolean {
    const allowed = ["student", "faculty", "team"];
    return this.checkAuthorization(user, allowed);
}

canEdit(user: User): boolean {
    const allowed = ["faculty", "team"];
    return this.checkAuthorization(user, allowed);
}

canDelete(user: User): boolean {
    const allowed = ["team"];
    return this.checkAuthorization(user, allowed);
}

