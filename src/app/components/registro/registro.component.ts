import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from '../../models/interfaces';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  providers: [
    AuthService
  ],
})
export class RegistroComponent {

  /**
   * @property usuarios
   * @description Lista de usuarios para almacenar los datos de usuarios registrados.
   */
  usuarios: Usuario[] = [];
  /**
     * @property nombres
     * @description Almacena el nombre ingresado por el usuario en el formulario.
     */
  nombres: string = '';

  /**
   * @property apellidos
   * @description Almacena los apellidos ingresados por el usuario en el formulario.
   */
  apellidos: string = '';

  /**
   * @property username
   * @description Almacena el nombre de usuario ingresado por el usuario en el formulario.
   */
  username: string = '';

  /**
   * @property correo
   * @description Almacena el correo electrónico ingresado por el usuario en el formulario.
   */
  correo: string = '';

  /**
   * @property fecha_nacimiento
   * @description Almacena la fecha de nacimiento ingresada por el usuario en el formulario.
   */
  fecha_nacimiento: string = '';

  /**
   * @property domicilio
   * @description Almacena la dirección del usuario en el formulario.
   */
  domicilio: string = '';

  /**
   * @property contrasena1
   * @description Almacena la contraseña ingresada por el usuario en el formulario.
   */
  contrasena1: string = '';

  /**
   * @property contrasena2
   * @description Almacena la confirmación de la contraseña ingresada por el 
   * usuario en el formulario.
   */
  contrasena2: string = '';

  /**
   * @property mensajeError
   * @description Almacena el mensaje de error a mostrar cuando el registro falla.
   */
  mensajeError: string = '';

  /**
   * @property mensajeExitoso
   * @description Indica si el registro fue exitoso, para mostrar un mensaje de éxito.
   */
  mensajeExitoso: boolean = false;

  /**
   * @property submitted
   * @description Indica si el formulario fue enviado.
   */
  submitted = false;

  /**
   * @property mostrarFormulario
   * @description Controla la visibilidad del formulario de registro.
   */
  mostrarFormulario = false;

  /**
   * @property nombreTouched
   * @description Indica si el campo de nombre ha sido tocado por el usuario.
   */
  nombreTouched: boolean = false;

  /**
   * @property apellidosTouched
   * @description Indica si el campo de apellidos ha sido tocado por el usuario.
   */
  apellidosTouched: boolean = false;

  /**
   * @property usernameTouched
   * @description Indica si el campo de username ha sido tocado por el usuario.
   */
  usernameTouched: boolean = false;

  /**
   * @property correoTouched
   * @description Indica si el campo de correo ha sido tocado por el usuario.
   */
  correoTouched: boolean = false;

  /**
   * @property contrasenaTouched
   * @description Indica si el campo de contraseña ha sido tocado por el usuario.
   */
  contrasenaTouched: boolean = false;

  /**
   * @property contrasena2Touched
   * @description Indica si el campo de confirmación de contraseña ha sido tocado 
   * por el usuario.
   */
  contrasena2Touched: boolean = false;
  /**
   * @property formularioRegistro
   * @description Formulario reactivo para gestionar el registro de un nuevo usuario.
   */
  formularioRegistro!: FormGroup;
  /**
   * @constructor
   * @description Inicializa el formulario reactivo y los servicios necesarios 
   * para el registro de usuarios.
   * @param {Router} router Servicio de navegación entre rutas.
   * @param {FormBuilder} fb Servicio para la construcción del formulario reactivo.
   * @param {HttpClient} http Servicio HTTP para la comunicación con el backend.
   * @param {AuthService} authService Servicio para la autenticación y creación de usuarios.
   */
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {

  }
  /**
   * @method validarContrasenas
   * @description Verifica si las contraseñas ingresadas coinciden.
   */
  validarContrasenas(): void {
    const inputContrasena = this.contrasena1;
    const inputContrasena2 = this.contrasena2;

    if(inputContrasena !== inputContrasena2) {
      console.log("Las constraseñas no coinciden")
    }
  }
  /**
   * @method validarEdadMinima
   * @description Valida que el usuario tenga al menos 13 años.
   * @param {AbstractControl} control El control de formulario que contiene 
   * la fecha de nacimiento.
   * @returns {object|null} Devuelve un error si el usuario es menor de 13 años.
   */
  validarEdadMinima(control: AbstractControl): { [key: string]: any } | null {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    const edadMinima = new Date(hoy.getFullYear() - 13, hoy.getMonth(), hoy.getDate());

    return fechaNacimiento > edadMinima ? { menorDeEdad: true } : null;
  }

  /**
   * @method validarContrasenasIguales
   * @description Valida si las contraseñas ingresadas coinciden en el formulario.
   * @param {FormGroup} formGroup El formulario reactivo que contiene las contraseñas.
   * @returns {object|null} Devuelve un error si las contraseñas no coinciden.
   */
  validarContrasenasIguales(formGroup: FormGroup) {
    const contrasena1 = formGroup.get('contrasena1')?.value;
    const contrasena2 = formGroup.get('contrasena2')?.value;
    return contrasena1 === contrasena2 ? null : { contrasenasNoCoinciden: true };
  }

  /**
   * @method validarCampo
   * @description Valida si un campo específico del formulario es inválido y 
   * ha sido tocado por el usuario.
   * @param {string} campo El nombre del campo que se desea validar.
   * @returns {boolean} Indica si el campo es inválido y ha sido tocado.
   */
  validarCampo(campo: string): boolean {
    return !!this.formularioRegistro.get(campo)?.invalid && 
        (this.formularioRegistro.get(campo)?.touched || false);
  } 
  /**
   * @method submitForm
   * @description Envía el formulario de registro, crea un nuevo usuario y 
   * lo guarda mediante el servicio de autenticación.
   */
  submitForm() {
    if (this.formularioRegistro.valid) {
      const nuevoUsuario: Usuario = {
        ...this.formularioRegistro.value,
        rol: 'cliente',
        contrasena: this.formularioRegistro.value.contrasena1,
      };

      this.authService.crearUsuario(nuevoUsuario).subscribe({
        next: (usuarios) => {
          this.mensajeExitoso = true;
          console.log('Usuario registrado con éxito:', usuarios);
          setTimeout(() => {
            this.mensajeExitoso = false;
            this.router.navigate(['login']);
          }, 3000);
        },
        error: (error) => {
          console.error('Error al registrar el usuario:', error);
          this.mostrarMensajeError('Hubo un error al registrar el usuario. Intente nuevamente.');
        },
      });
    } else {
      this.formularioRegistro.markAllAsTouched();
      this.mostrarMensajeError('Debe ingresar campos obligatorios.');
    }
  }
  /**
   * @method limpiarFormulario
   * @description Resetea los campos del formulario reactivo.
   */
  limpiarFormulario(): void {
    this.formularioRegistro.reset();
  }
  /**
   * @method mostrarMensajeError
   * @description Método que muestra mensaje de error al usuario.
   * @param mensaje Mensaje de error.
   */
  mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }
  /**
   * @method agregarUsuario
   * @description Método para registrar un usuario nuevo utilizando el 
   * formulario reactivo junto
   * con el servicio.
   * @param mensaje Mensaje de error.
   */
  agregarUsuario() {
    this.submitted = true;
    if (this.formularioRegistro.invalid) return;
    const nuevoUsuario: Usuario = this.formularioRegistro.value;
    this.authService.crearUsuario(nuevoUsuario).subscribe({
      next: () => {
        this.mensajeExitoso = true;
        this.formularioRegistro.reset();
        this.submitted = false;
      },
      error: () => console.error('Error al crear el usuario')
    });
  }
  /**
   * @method ngOnInit
   * @description Inicializa el formulario reactivo y establece las validaciones 
   * necesarias para lso campos del formulario de registro.
   */
  ngOnInit(): void {
    this.formularioRegistro = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3)]],
      username: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/)]],
      fecha_nacimiento: ['', [Validators.required, this.validarEdadMinima]],
      domicilio: [''],
      contrasena1: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],
      contrasena2: ['', Validators.required]
    }, { validator: this.validarContrasenasIguales });
  }

}
