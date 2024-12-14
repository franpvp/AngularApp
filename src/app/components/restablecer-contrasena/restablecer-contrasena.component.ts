import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

/**
 * @component
 * @description Componente para el restablecimiento de contraseña de un usuario.
 */
@Component({
  selector: 'app-restablecer-contrasena',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavComponent, FormsModule, HttpClientModule],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.css',
  providers: [
    AuthService
  ],
})
export class RestablecerContrasenaComponent {
  /**
   * @property correo
   * @description Almacena el correo electrónico del usuario que solicita el restablecimiento de la contraseña.
   */
  correo: string | null = null;

  /**
   * @property correoTouched
   * @description Indica si el campo de correo ha sido tocado por el usuario.
   */
  correoTouched: boolean = false;

  /**
   * @property nuevaContrasena
   * @description Almacena la nueva contraseña ingresada por el usuario.
   */
  nuevaContrasena: string | null = null;

  /**
   * @property nuevaContrasenaTouched
   * @description Indica si el campo de nueva contraseña ha sido tocado por el usuario.
   */
  nuevaContrasenaTouched: boolean = false;

  /**
   * @property confirmarContrasena
   * @description Almacena la confirmación de la nueva contraseña ingresada por el usuario.
   */
  confirmarContrasena: string | null = null;

  /**
   * @property confirmarContrasenaTouched
   * @description Indica si el campo de confirmación de contraseña ha sido tocado por el usuario.
   */
  confirmarContrasenaTouched: boolean = false;

  /**
   * @property mensajeError
   * @description Almacena el mensaje de error a mostrar cuando el restablecimiento falla.
   */
  mensajeError: string = '';

  /**
   * @property mensajeExitoso
   * @description Indica si el restablecimiento de la contraseña fue exitoso, para mostrar un mensaje de éxito.
   */
  mensajeExitoso: boolean = false;

  /**
   * @property formularioNuevaContrasena
   * @description Formulario reactivo para gestionar el restablecimiento de la contraseña.
   */
  formularioNuevaContrasena!: FormGroup;

  /**
   * @constructor
   * @description Inicializa los servicios y el formulario necesario para el restablecimiento de la contraseña.
   * @param {ActivatedRoute} route Servicio para obtener parámetros de la ruta activa.
   * @param {FormBuilder} fb Servicio para construir formularios reactivos.
   * @param {Router} router Servicio para la navegación entre rutas.
   * @param {AuthService} authService Servicio para la autenticación y gestión de contraseñas.
   */
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * @method submitForm
   * @description Envía el formulario para restablecer la contraseña del usuario si el formulario es válido.
   */
  submitForm(): void {
    if (this.formularioNuevaContrasena.valid && this.correo) {
      const nuevaContrasena = this.formularioNuevaContrasena.get('nuevaContrasena')?.value;

      this.authService.cambiarContrasena(this.correo, nuevaContrasena).subscribe({
        next: () => {
          this.mensajeExitoso = true;
          setTimeout(() => {
            this.mensajeExitoso = false;
            this.router.navigate(['/login']); // Redirigir al login después de actualizar la contraseña
          }, 3000);
        },
        error: (err: any) => {
          this.mostrarMensajeError('Hubo un error al actualizar la contraseña. Intente nuevamente.');
          console.error('Error al cambiar la contraseña:', err);
        },
      });
    } else {
      this.formularioNuevaContrasena.markAllAsTouched(); // Marcar campos como tocados para mostrar errores
    }
  }

  /**
   * @method validarCampo
   * @description Valida si un campo específico del formulario es inválido y ha sido tocado por el usuario.
   * @param {string} campo El nombre del campo que se desea validar.
   * @returns {boolean} Indica si el campo es inválido y ha sido tocado.
   */
  validarCampo(campo: string): boolean {
    return !!this.formularioNuevaContrasena.get(campo)?.invalid && 
        (this.formularioNuevaContrasena.get(campo)?.touched || false);
  }

  /**
   * @method mostrarMensajeError
   * @description Muestra un mensaje de error cuando la operación de restablecimiento falla.
   * @param {string} mensaje El mensaje de error a mostrar.
   */
  mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

  /**
   * @method validarContrasenasIguales
   * @description Valida que las contraseñas ingresadas coincidan.
   * @param {FormGroup} group El grupo de formulario que contiene las contraseñas.
   * @returns {object | null} Devuelve un error si las contraseñas no coinciden, o null si coinciden.
   */
  validarContrasenasIguales(group: FormGroup): { [key: string]: boolean } | null {
    const nuevaContrasena = group.get('nuevaContrasena')?.value;
    const confirmarContrasena = group.get('confirmarContrasena')?.value;
    return nuevaContrasena === confirmarContrasena ? null : { noCoinciden: true };
  }

  /**
   * @method obtenerErrorContrasenas
   * @description Verifica si las contraseñas no coinciden en el formulario.
   * @returns {boolean} Devuelve true si las contraseñas no coinciden.
   */
  obtenerErrorContrasenas(): boolean {
    return !!this.formularioNuevaContrasena.hasError('noCoinciden');
  }

  /**
   * @method ngOnInit
   * @description Inicializa el formulario y obtiene el correo del usuario desde los query parameters.
   */
  ngOnInit(): void {
    // Obtener el correo desde los queryParams
    this.route.queryParams.subscribe((params) => {
      this.correo = params['correo'] || null;
    });

    // Inicializar el formulario con validaciones
    this.formularioNuevaContrasena = this.fb.group(
      {
        nuevaContrasena: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
          ],
        ],
        confirmarContrasena: ['', Validators.required],
      },
      { validators: this.validarContrasenasIguales }
    );
  }
}


