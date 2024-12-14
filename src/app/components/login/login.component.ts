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

/**
 * @component LoginComponent
 * @description Este componente maneja la funcionalidad de autenticación de usuarios en la aplicación. Permite el inicio de sesión y redirige al usuario a diferentes rutas dependiendo de su rol (admin o cliente).
 */
export class LoginComponent {
  /**
   * @property usuario
   * @description Representa al usuario autenticado actualmente. Inicialmente es `null`.
   */
  usuario: Usuario | null = null;

  /**
   * @property usuarios
   * @description Lista de usuarios cargada para validaciones adicionales.
   */
  usuarios: Usuario[] = [];

  /**
   * @property contrasena
   * @description Almacena temporalmente la contraseña ingresada por el usuario.
   */
  contrasena: string = '';

  /**
   * @property mensajeError
   * @description Mensaje de error mostrado en caso de que las credenciales sean incorrectas.
   */
  mensajeError: string = '';

  /**
   * @property formularioLogin
   * @description Contiene el formulario reactivo utilizado para la autenticación.
   */
  formularioLogin!: FormGroup;

  /**
   * @property usuarioSubject
   * @description Un BehaviorSubject que almacena el estado actual del usuario autenticado.
   */
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  /**
   * @property usuario$
   * @description Observable para suscribirse a cambios en el usuario autenticado.
   */
  usuario$: Observable<Usuario | null> = this.usuarioSubject.asObservable();

  /**
   * @constructor
   * @description Inyecta los servicios necesarios para autenticación, enrutamiento y creación de formularios.
   * @param authService Servicio para manejar la autenticación del usuario.
   * @param router Servicio para manejar la navegación entre rutas.
   * @param fb Servicio para crear formularios reactivos.
   */
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}
  /**
   * @method login
   * @description Inicia sesión con las credenciales proporcionadas en el formulario. Redirige al usuario según su rol.
   * Muestra un mensaje de error si las credenciales son incorrectas.
   */
  login(): void {
    const { username, contrasena } = this.formularioLogin.value;

    this.authService.authenticateJson(username, contrasena).subscribe((usuario) => {
      if (usuario) {
        console.log('Componente login usuario:', usuario);
        this.authService.setUsuario(usuario);

        if (usuario.rol === 'admin') {
          this.router.navigate(['admin-home']);
        } else if (usuario.rol === 'cliente') {
          this.router.navigate(['home']);
        }
      } else {
        this.mostrarMensajeError('Usuario o contraseña incorrectos.');
      }
    });
  }

  /**
   * @method mostrarMensajeError
   * @description Muestra un mensaje de error durante 3 segundos.
   * @param mensaje Mensaje a mostrar.
   */
  mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente creando un formulario reactivo para el login.
   */
  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      username: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }
}