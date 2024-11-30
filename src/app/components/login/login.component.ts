import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";

import { HttpClientModule } from '@angular/common/http';

// Servicios
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from '../../models/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    AuthService
  ],
})


export class LoginComponent {

  usuario: Usuario | null = null;
  usuarios: Usuario[] = [];
  contrasena: string = '';
  mensajeError: string = '';
  
  formularioLogin!: FormGroup;

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  usuario$: Observable<Usuario | null> = this.usuarioSubject.asObservable();
  
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

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

  goToRecuperacion(): void {
    this.router.navigate(['recuperacion']);
  }

  login(): void {
    const { username, contrasena } = this.formularioLogin.value;

    this.authService.authenticateJson(username, contrasena).subscribe((usuario) => {
      if (usuario) {
        // Guarda el usuario autenticado en el servicio
        console.log('Componente login usuario:', usuario);
        this.authService.setUsuario(usuario);

        // Redirige según el rol
        if (usuario.rol === 'admin') {
          this.router.navigate(['admin-home']);  // Redirige al home de admin
        } else if (usuario.rol === 'cliente') {
          this.router.navigate(['home']);  // Redirige al home de cliente
        }
      } else {
        this.mostrarMensajeError('Usuario o contraseña incorrectos.');
      }
    });
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
