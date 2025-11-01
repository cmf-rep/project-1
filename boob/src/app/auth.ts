import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';

// 🔁 Changed from firestore/lite → firestore for better compatibility
import { 
  getFirestore, 
  getDocs, 
  collection, 
  query, 
  where, 
  setDoc, 
  doc 
} from 'firebase/firestore';



import { BehaviorSubject } from 'rxjs';

// 🧱 Your Firebase configuration
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

  // 🧠 Keeps track of the currently signed-in Firebase user
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  authState$ = this.currentUserSubject.asObservable();

  // 🧠 NEW: Keeps track of the current user's role (admin, faculty, etc.)
  private currentUserRole = new BehaviorSubject<string | null>(null);
  role$ = this.currentUserRole.asObservable();


  private gg = getAuth().currentUser;
  private tt;



  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.tt=this.gg?.getIdTokenResult();
    // ✅ Listen for auth state changes (your original version)
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      if (user) {
        console.log('User signed in:', user.email);
        // 🔁 Optional: You can load their role when they sign in
        this.loadUserRole(user.uid);
      } else {
        console.log('User signed out');
        this.currentUserRole.next(null); // reset role on logout
      }
    });
  }

  get currentUser() {
    return this.currentUserSubject.value;
  }


  async displayrolenga(){
    console.log(this.tokenResult.claims.role);
  }

  // 🧩 SIGN-IN (same as before, but now includes role loading)
  async signInWithEmployeeID(employeeID: string, password: string) {
    // Step 1: Find email via employee ID
    const usersRef = collection(this.db, 'users');
    const q = query(usersRef, where('user_Id', '==', employeeID));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Employee ID not found.');
    }

    const userData = querySnapshot.docs[0].data();
    const email = userData['email'];

    // Step 2: Sign in using Firebase Auth
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

    // 🆕 Step 3: Load user role from Firestore
    await this.loadUserRole(userCredential.user.uid);

    return userCredential.user;
  }

  // 🚪 SIGN OUT (unchanged)
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log("User signed out successfully.");
      this.currentUserRole.next(null); // reset role
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  }

  // 🔍 FETCH COLLECTION (for debugging — same as before)
  async fetchAndDisplayCollectionData(db: any, collectionName: string) {
    try {
      const colRef = collection(db, collectionName);
      const snapshot = await getDocs(colRef);

      if (snapshot.empty) {
        console.log(`No documents found in "${collectionName}".`);
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

  // 🧠 NEW: Fetch user role based on UID from Firestore
  private async loadUserRole(uid: string) {
    try {
      const usersRef = collection(this.db, 'users');
      const q = query(usersRef, where('uid', '==', uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const role = snapshot.docs[0].data()['role'];
        this.currentUserRole.next(role);
        console.log(`Loaded role: ${role}`);
      } else {
        console.warn('No role found for this UID');
      }
    } catch (error) {
      console.error('Error loading user role:', error);
    }
  }

  // 🧱 NEW: Generic document inserter (replaces insertUser + insertCS)
  async addDocument(collectionName: string, data: Record<string, any>) {
    try {
      const docRef = doc(collection(this.db, collectionName)); // auto-ID
      await setDoc(docRef, {
        ...data,
        createdAt: new Date().toISOString(),
      });
      console.log(`${collectionName} → Added successfully with ID: ${docRef.id}`);
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
    }
  }

  // 🧩 Example of your old insertUser and insertCS (still usable)
  async insertUser(userData: Record<string, any>) {
    await this.addDocument('users', userData);
  }

  async insertCS(csData: Record<string, any>) {
    await this.addDocument('class_schedule', csData);
  }

  // 🔒 NEW: Role-based access control helper
  canAccess(allowedRoles: string[]): boolean {
    const role = this.currentUserRole.value;
    const access = role ? allowedRoles.includes(role) : false;
    console.log(`Role "${role}" access to ${allowedRoles}: ${access}`);
    return access;
  }
}
