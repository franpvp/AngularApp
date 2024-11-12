import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css'
})
export class MetodoPagoComponent {

  username: string | null = localStorage.getItem('username');

  constructor(private router: Router) {

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

  goToRegistro():void {
    this.router.navigate(['registro']);
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
