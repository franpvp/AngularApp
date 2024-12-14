import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css',
  providers: [
    AuthService
  ],
})
/**
 * @component RecuperacionComponent
 * @description Componente que gestiona el formulario de recuperación de cuenta mediante el correo electrónico.
 */
export class RecuperacionComponent {

  /**
   * @property correo
   * @description Almacena el correo ingresado por el usuario para la recuperación de cuenta.
   */
  correo: string = '';

  /**
   * @property correoValido
   * @description Indica si el correo ingresado es válido (existe en la base de datos).
   */
  correoValido: boolean = true;

  /**
   * @property correoTouched
   * @description Indica si el campo de correo ha sido tocado por el usuario.
   */
  correoTouched: boolean = false;

  /**
   * @property mensajeError
   * @description Mensaje de error a mostrar si el correo no es válido o ocurre un error en la validación.
   */
  mensajeError: string = '';

  /**
   * @property formularioRecuperacion
   * @description Formulario reactivo para gestionar la recuperación de cuenta.
   */
  formularioRecuperacion!: FormGroup;

  /**
   * @constructor
   * @description Inicializa el formulario reactivo y los servicios necesarios para la recuperación de cuenta.
   * @param {Router} router Servicio de navegación entre rutas.
   * @param {FormBuilder} fb Servicio para la construcción del formulario reactivo.
   * @param {AuthService} authService Servicio para la autenticación y validación de correos electrónicos.
   */
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {}

  /**
   * @method isCorreoValido
   * @description Valida si el correo ingresado por el usuario es válido según un patrón de correo electrónico específico.
   * @returns {boolean} Indica si el correo es válido o no.
   */
  isCorreoValido(): boolean {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/;
    return !regexCorreo.test(this.correo.trim()) && this.correoTouched;
  }

  /**
   * @method onSubmit
   * @description Método que se ejecuta al enviar el formulario de recuperación. Valida el correo y, si es válido,
   * navega a la página de restablecimiento de contraseña.
   */
  onSubmit(): void {
    const correo = this.formularioRecuperacion.get('correo')?.value;
  
    this.authService.validarCorreo(correo).subscribe({
      next: (existe) => {
        this.correoValido = existe;
        if (existe) {
          console.log('Correo válido, el usuario existe.');
          this.router.navigate(['restablecer-contrasena'], {
            queryParams: { correo },
          });
        } else {
          console.error('Correo inválido, no se encuentra en la base de datos.');
        }
      },
      error: (err) => {
        console.error('Error al validar el correo:', err);
      }
    });
  }

  /**
   * @method validarCampo
   * @description Valida si un campo específico del formulario es inválido y ha sido tocado por el usuario.
   * @param {string} campo El nombre del campo que se desea validar.
   * @returns {boolean} Indica si el campo es inválido y ha sido tocado.
   */
  validarCampo(campo: string): boolean {
    return !!this.formularioRecuperacion.get(campo)?.invalid && 
        (this.formularioRecuperacion.get(campo)?.touched || false);
  }

  /**
   * @method mostrarMensajeError
   * @description Muestra un mensaje de error por un tiempo breve y luego lo oculta.
   * @param {string} mensaje El mensaje de error a mostrar.
   */
  mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

  /**
   * @method ngOnInit
   * @description Inicializa el formulario reactivo y establece las validaciones necesarias para el campo de correo.
   */
  ngOnInit(): void {
    this.formularioRecuperacion = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/)]],
    });
  }
}