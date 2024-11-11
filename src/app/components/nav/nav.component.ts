import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Servicios
import { JuegosService } from '../../services/juegos/juegos.service';
import { AuthService } from '../../services/auth/auth.service';
// Interfaces
import { Juego } from '../../models/interfaces';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  username: string | null = null;
  // Crear variable para llamar en el componente Home
  juegos: Juego[] = [];

  constructor(private router: Router, private juegosService: JuegosService, private authService: AuthService) {
    
  }

  goToPerfil(): void {
    this.router.navigate(['perfil']);
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  goToLogin():void {
    this.router.navigate(['login']);
  }

  goToContacto(): void {
    this.router.navigate(['contacto']);
  }

  cerrarSesion():void {
    this.username = null;
    this.router.navigate(['home']);
    localStorage.removeItem('username')
  }

}
