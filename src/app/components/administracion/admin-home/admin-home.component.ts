import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  constructor(private router: Router ,private authService: AuthService) {

  }

  goToGestionUsuario(): void {
    this.router.navigate(['gestion-usuarios']);
  } 

  goToGestionProductos(): void {
    this.router.navigate(['gestion-productos']);
  }
}
