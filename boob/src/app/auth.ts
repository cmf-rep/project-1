import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';

import { getFirestore,getDocs, collection, query, where } from 'firebase/firestore/lite';
import { BehaviorSubject } from 'rxjs';

const firebaseConfig = {
  apiKey: "AIzaSyC-z3hajzEJSF3w9mnE3792BYwMtMzA33E",
  authDomain: "project-1-2e5b7.firebaseapp.com",
  databaseURL: "https://project-1-2e5b7-default-rtdb.firebaseio.com",
  projectId: "project-1-2e5b7",
  storageBucket: "project-1-2e5b7.firebasestorage.app",
  messagingSenderId: "852584877349",
  appId: "1:852584877349:web:a008d54c27c9008d441ecc"

};

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private app: FirebaseApp;
  private auth;
  private db;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  authState$ = this.currentUserSubject.asObservable();

  constructor() {
    try {
      this.app = initializeApp(firebaseConfig);
    } catch (error) {
      console.error('Firebase initialization failed:', error);
    }

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);

    // Listen for auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      if (user) {
        console.log('User signed in:', user.email);
      } else {
        console.log('User signed out');
      }
    });
  }


  async signInWithEmployeeID(employeeID: string, password: string) {
    try {
      // Step 1: Look up the email associated with this employee ID
      const usersRef = collection(this.db, 'users'); // Reference to 'users' collection
      const q = query(usersRef, where('user_Id', '==', employeeID));//query
      const querySnapshot = await getDocs(q);


      querySnapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      }); 


      if (querySnapshot.empty) {
        throw new Error('Employee ID not found.');
      }

      const userData = querySnapshot.docs[0].data();
      const email = userData['email'];

      // Step 2: Sign in using the found email
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Signed in as:', userCredential.user.email);
      return userCredential.user;

    } catch (error: any) {
      console.error('error sa may query:', error.message);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log("User signed out successfully.");
     // onAuthStateChanged listener will detect this change
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  }

  get currentUser() {
    return this.currentUserSubject.value;
  }
}
