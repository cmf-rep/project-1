import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink],
})
export class SettingsPage implements OnInit {

  darkMode = false;

  constructor(private alertCtrl: AlertController) {}

  toggleDarkMode() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  async openReportProblem() {
    const alert = await this.alertCtrl.create({
      header: 'Report Computer Lab Issue',
      message: 'Send a report to the Technical Head.',
      inputs: [
        {
          name: 'room',
          type: 'text',
          placeholder: 'Laboratory Room (e.g. CL 203)',
        },
        {
          name: 'issue',
          type: 'text',
          placeholder: 'Issue (e.g. Computer not turning on)',
        },
        {
          name: 'details',
          type: 'textarea',
          placeholder: 'Describe the issue in detail...',
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Send',
          handler: (data) => {
            console.log('Lab Report Sent:', data);
            this.confirmAlert('Lab issue report sent successfully!');
          },
        },
      ],
    });

    await alert.present();
  }

  async openLostItemReport() {
    const alert = await this.alertCtrl.create({
      header: 'Report Lost Item',
      message: 'Provide details of the lost item to notify Admin.',
      inputs: [
        {
          name: 'itemName',
          type: 'text',
          placeholder: 'Item Name (e.g. USB Drive)',
        },
        {
          name: 'location',
          type: 'text',
          placeholder: 'Last Seen Location (e.g. Lab 204)',
        },
        {
          name: 'details',
          type: 'textarea',
          placeholder: 'Additional description or notes...',
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Report',
          handler: (data) => {
            console.log('Lost Item Report:', data);
            this.confirmAlert('Lost item report submitted successfully!');
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmAlert(message: string) {
    const confirm = await this.alertCtrl.create({
      header: 'Success',
      message,
      buttons: ['OK'],
    });
    await confirm.present();
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Logout',
          handler: () => console.log('User logged out'),
        },
      ],
    });
    await alert.present();
  }

    ngOnInit() {
    console.log('Settingspage initialized');
  }

}

