import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,IonList, IonItem,IonLabel } from '@ionic/angular/standalone';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyC-z3hajzEJSF3w9mnE3792BYwMtMzA33E",
  authDomain: "project-1-2e5b7.firebaseapp.com",
  databaseURL: "https://project-1-2e5b7-default-rtdb.firebaseio.com",
  projectId: "project-1-2e5b7",
  storageBucket: "project-1-2e5b7.firebasestorage.app",
  messagingSenderId: "852584877349",
  appId: "1:852584877349:web:a008d54c27c9008d441ecc"
};

@Component({
  selector: 'app-testingcon',
  templateUrl: './testingcon.page.html',
  styleUrls: ['./testingcon.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonList, IonItem, IonLabel]
})
export class TestingconPage implements OnInit {
  private app: FirebaseApp;
  private db;
  public usersData: any[] = []; // To store fetched data

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  ngOnInit() {
    this.fetchUsers();
  }

  // Function to fetch and display users collection
  async fetchUsers() {
    try {
      const usersRef = collection(this.db, 'users'); // Reference to 'users' collection
       const q = query(usersRef, where('user_Id', '==', '23-23841'));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log('No users found.');
        return;
      }

      // Clear previous data
      this.usersData = [];

      snapshot.forEach((doc) => {
        console.log('Document ID:', doc.id);
        console.log('Data:', doc.data());
        this.usersData.push({ id: doc.id, ...doc.data() });
      });

    } catch (error: any) {
      console.error('Error fetching users:', error.message);
    }
  }
}
