import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Injección de Servicios
import { JuegosService } from '../../services/juegos/juegos.service';
import { AuthService } from '../../services/auth/auth.service';

// Interfaces
import { Juego } from '../../models/interfaces';

// Componentes
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

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


  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.juegosService.obtenerJuegos().subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  cerrarSesion():void {
    this.username = null;
    this.router.navigate(['home']);
    localStorage.removeItem('username')
  }
}
