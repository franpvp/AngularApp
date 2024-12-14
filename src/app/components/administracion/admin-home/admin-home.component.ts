import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
  providers: [
    AuthService
  ],
})
export class AdminHomeComponent {

  constructor() {

  }
}
