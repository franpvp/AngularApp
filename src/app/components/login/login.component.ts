import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  username: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  goToHome(): void {
    let navigationExtras: NavigationExtras = {
      state: {
        usernameEnviado: this.username,
        contrasenaEnviada: this.contrasena
      }
    }
    this.router.navigate(['home'], navigationExtras);
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

  login(): void {
    this.authService.authenticate(this.username, this.contrasena).subscribe(usuario => {
      if (usuario) {
        localStorage.setItem('username', usuario.username);
        this.router.navigate(['home']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }

}
