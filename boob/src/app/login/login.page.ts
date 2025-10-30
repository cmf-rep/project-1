import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Auth } from '../auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonIcon, IonButton]
})

export class LoginPage implements OnInit {
  userID: string = '';
  password: string = '';
  
  constructor(private auth: Auth, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.auth.authState$.subscribe(user => {
      console.log('Auth state changed:', user);
    });
  }

  async handleLogin() {
  try {
    const user = await this.auth.signInWithEmployeeID(this.userID, this.password);
    console.log('Welcome back:', user.email);
    this.router.navigate(['/home']);
  } catch (error: any) {
    const alert = await this.alertController.create({
      header: 'WAla boii  Failed',
      message: error.message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

}
