import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eclass',
  templateUrl: './eclass.page.html',
  styleUrls: ['./eclass.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class EclassPage {

  constructor() {}

  ngOnInit() {
    console.log('EclassPage initialized');
  }

}

