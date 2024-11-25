import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";

// Servicios
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  username: string = '';
  rolUsuario: string = '';
  contrasena: string = '';
  mensajeError: string = '';
  
  formularioLogin!: FormGroup;
  
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

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
    // Validar que el formulario sea válido antes de proceder
    if (this.formularioLogin.valid) {
      const { username, contrasena } = this.formularioLogin.value;
  
      this.authService.authenticate(username, contrasena).subscribe(
        usuario => {
          if (usuario) {
            // Guardar datos del usuario en localStorage
            localStorage.setItem('username', usuario.username);
            localStorage.setItem('rol', usuario.rol);
  
            // Redirigir según el rol del usuario
            if (usuario.rol === 'admin') {
              this.router.navigate(['admin-home']);
            } else if (usuario.rol === 'cliente') {
              this.router.navigate(['home']);
            }
          } else {
            // Mostrar mensaje de error si las credenciales son incorrectas
            this.mostrarMensajeError('El nombre de usuario o la contraseña son incorrectos.');
          }
        },
        error => {
          // Manejo de errores en caso de problemas con la llamada al servicio
          this.mostrarMensajeError('Hubo un problema con el inicio de sesión. Intenta nuevamente más tarde.');
        }
      );
    } else {
      // Marcar todos los campos como tocados para que se muestren los mensajes de error
      this.formularioLogin.markAllAsTouched();
      this.mostrarMensajeError('Por favor, completa todos los campos del formulario.');
    }
  }

  mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

  ngOnInit() {
    this.formularioLogin = this.fb.group({
      username: ['', Validators.required],
      contrasena: ['', Validators.required],  
    });
  }

}
