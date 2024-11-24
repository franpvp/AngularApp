import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";

// Servicios
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  username: string = '';
  rolUsuario: string = '';
  contrasena: string = '';
  mensajeError: string = '';
  
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

  goToRecuperacion(): void {
    this.router.navigate(['recuperacion']);
  }

  login(): void {
    this.authService.authenticate(this.username, this.contrasena).subscribe(usuario => {
      if (usuario) {
        localStorage.setItem('username', usuario.username);
        localStorage.setItem('rol', usuario.rol);
  
        if (usuario.rol === 'admin') {
          this.router.navigate(['admin-home']);
        } else if (usuario.rol === 'cliente') {
          this.router.navigate(['home']);
        }
      } else {
        // Mostrar mensaje de error si las credenciales son incorrectas
        this.mostrarMensajeError('El nombre de usuario o la contraseña son incorrectos.');
      }
    }, error => {
      // Manejo de errores en caso de problemas con la llamada al servicio
      this.mostrarMensajeError('Hubo un problema con el inicio de sesión. Intenta nuevamente más tarde.');
    });
  }

  mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

  ngOnInit() {
    
  }

}
