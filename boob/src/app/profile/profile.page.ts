import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow,IonCol,IonButton,IonIcon,IonList, IonItem,IonLabel,IonFooter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid,IonRow,IonCol,IonButton,IonIcon,IonList,IonItem,IonLabel,IonFooter]
})
export class ProfilePage implements OnInit {
  schedules = [
  { subject: 'Math 101', course: 'BSIT', section: 'A1', time: '8:00 AM - 9:30 AM', room: 'RM201' },
  { subject: 'English 102', course: 'BSIT', section: 'A1', time: '9:40 AM - 11:10 AM', room: 'RM105' },
];

notifications = [
  { title: 'Schedule Change', message: 'Your Math 101 has been moved to 9:00 AM.' },
  { title: 'Holiday Notice', message: 'No classes on October 31 due to university event.' },
];
  constructor() { }

  ngOnInit() {
  }

}
