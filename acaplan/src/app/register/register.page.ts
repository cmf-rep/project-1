import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonInput, IonItem, IonList, IonButton, IonIcon, IonLabel, IonContent, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mail, lockClosed, person, eye, eyeOff } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage {
  registerForm: FormGroup;
  showPassword = false;
  showEyeIcon = false;

  constructor(private fb: FormBuilder) {
    addIcons({ mail, lockClosed, person, eye, eyeOff });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.showEyeIcon = !!value && value.length > 0;
    });


  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Register', this.registerForm.value);
    }
  }
}
