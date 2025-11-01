import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, getDocs, collection, query, where,setDoc, doc } from 'firebase/firestore/lite';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../auth';



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
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class TestingconPage implements OnInit {
  dataForm: FormGroup;
  CSForm: FormGroup;
  private app: FirebaseApp;
  private db;
  public usersData: any[] = []; // To store fetched data

  constructor( private formBuilder: FormBuilder, private auth: Auth) {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    //para sa pag add ng user to
    this.dataForm = this.formBuilder.group({
      userID: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      course: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.CSForm = this.formBuilder.group({
      subject: ['', Validators.required],
      course: ['', Validators.required],
      year_and_section: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      room: ['', Validators.required],
      assigned_teacher: ['', Validators.required],
    });
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

      console.log('ito boosss',this.auth.currentUser);

    } catch (error: any) {
      console.error('Error fetching users:', error.message);
    }
  }
  async handledata(){
    this.auth.insertUser(this.dataForm.value);
  }
  async handleCSdata(){
    this.auth.insertCS(this.CSForm.value);
  }
}

