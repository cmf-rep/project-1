import { Component, OnInit } from '@angular/core';
//imported these classes from angular forms To use reactive forms in a standalone component, import ReactiveFormsModule
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonButton, IonInput } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    IonInput,
    ReactiveFormsModule // ✅ Correct module for forms
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  userID: string = 'defaultuid';
  password: string = 'defaultpass';
  
  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private router: Router,
    private alertController: AlertController
  ) { 
    this.loginForm = this.formBuilder.group({
      userID: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.auth.authState$.subscribe(user => {
      console.log('Auth state changed:', user);
    });
  }
  
  async handleLogin() {
    this.userID = this.loginForm.value.userID;
    this.password = this.loginForm.value.password;
    try {
      const user = await this.auth.signInWithEmployeeID(this.userID, this.password);
      console.log('Welcome back:', user.email);
      this.router.navigate(['/home']);
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: error.message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
