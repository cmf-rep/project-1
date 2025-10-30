import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonInput, IonItem, IonList, IonButton, IonIcon, IonLabel, IonContent, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mail, lockClosed, eye, eyeOff } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonInput,
    IonItem,
    IonList,
    IonButton,
    IonIcon,
    IonLabel,
    IonContent,
    IonCard
  ]
})
export class LoginPage {
  loginForm: FormGroup;
  showPassword = false;
  showEyeIcon = false;

  constructor(private fb: FormBuilder) {
    addIcons({ mail, lockClosed, eye, eyeOff });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    const currentValue = this.loginForm.get('password')?.value;

    this.showEyeIcon = !!currentValue && currentValue.length > 0;

    this.loginForm.get('password')?.valueChanges.subscribe(value => {
      this.showEyeIcon = !!value && value.length > 0;
    });
  }

  

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login', this.loginForm.value);
    }
  }
}