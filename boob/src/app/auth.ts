import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';

import { getFirestore,getDocs, collection, query, where, setDoc, doc } from 'firebase/firestore/lite';
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
  get currentUser() {
    return this.currentUserSubject.value;
  }

  


  async signInWithEmployeeID(employeeID: string, password: string) {
      // Step 1: Look up the email associated with this employee ID
      const usersRef = collection(this.db, 'users'); // Reference to 'users' collection
      const q = query(usersRef, where('user_Id', '==', employeeID));//query

      

      const querySnapshot = await getDocs(q); 


      if (querySnapshot.empty) {
        throw new Error('Employee ID not found.');
      }

      const userData = querySnapshot.docs[0].data();
      const email = userData['email'];

      // Step 2: Sign in using the found email
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;

    
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

  async  fetchAndDisplayCollectionData(db: any, collectionName: string) {
    try {
      const colRef = collection(db, collectionName); // Reference to the collection
      const snapshot = await getDocs(colRef); // Fetch documents

      if (snapshot.empty) {
        console.log(`No documents found in collection "${collectionName}".`);
        return;
      }

      snapshot.forEach((doc) => {
        console.log(`Document ID: ${doc.id}`);
        console.log('Data:', doc.data());
        console.log('-----------------------');
      });

    } catch (error: any) {
      console.error('Error fetching collection data:', error.message);
    }
    
  }


    /**
    * Inserts a new user into the Firestore `users` collection with auto-generated ID
    * @param userData Object containing fields & values (e.g., { first_name, last_name, email, role })
    */
    async  insertUser(userData: Record<string, any>) {
      try {
        const userRef = doc(collection(this.db, 'users')); // Auto-generated ID
        await setDoc(userRef, userData);
        console.log(`User added successfully with ID: ${userRef.id}`);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }

    async  insertCS(userData: Record<string, any>) {
      try {
        const userRef = doc(collection(this.db, 'class_schedule')); // Auto-generated ID
        await setDoc(userRef, userData);
        console.log(`schedule added successfully with ID: ${userRef.id}`);
      } catch (error) {
        console.error('Error adding schedule:', error);
      }
    }
  
}
