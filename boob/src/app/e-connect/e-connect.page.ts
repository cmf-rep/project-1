

import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-e-conect',
  templateUrl: './e-connect.page.html',
  styleUrls: ['./e-connect.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink,],
})
export class EConnectPage   {
  constructor() { }

  ngOnInit() {}
}  // 👈 Make sure the class name matches here

