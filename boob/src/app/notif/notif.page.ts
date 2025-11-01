import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.page.html',
  styleUrls: ['./notif.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class NotifPage implements OnInit {

   constructor(private alertCtrl: AlertController) {}

  // 🧾 Function called when FAB is clicked
  async openReportForm() {
    const alert = await this.alertCtrl.create({
      header: 'New Laboratory Report',
      message: 'Submit an issue report to Head Technicals',
      inputs: [
        {
          name: 'room',
          type: 'text',
          placeholder: 'Laboratory Room (e.g. Lab 203)',
        },
        {
          name: 'issue',
          type: 'text',
          placeholder: 'Issue (e.g. Computer not working)',
        },
        {
          name: 'priority',
          type: 'radio',
          label: 'High Priority',
          value: 'high',
          checked: true,
        },
        {
          name: 'priority',
          type: 'radio',
          label: 'Medium Priority',
          value: 'medium',
        },
        {
          name: 'priority',
          type: 'radio',
          label: 'Low Priority',
          value: 'low',
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
          text: 'Send Report',
          handler: (data) => {
            console.log('Report submitted:', data);
            this.confirmSubmission();
          },
        },
      ],
    });

    await alert.present();
  }

  // 🟢 Optional confirmation message after submitting
  async confirmSubmission() {
    const confirm = await this.alertCtrl.create({
      header: 'Report Submitted',
      message: 'Your report has been sent to Head Technicals.',
      buttons: ['OK'],
    });

    await confirm.present();
  }
  ngOnInit() {
    console.log('NotifPage initialized');
  }

}

