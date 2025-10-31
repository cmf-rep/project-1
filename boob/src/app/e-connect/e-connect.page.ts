import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-e-connect',
  templateUrl: './e-connect.page.html',
  styleUrls: ['./e-connect.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EConnectPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
