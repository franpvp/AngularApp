import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../nav/nav.component";
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/interfaces';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css',
  providers: [
    AuthService
  ],
})
/**
 * @component GestionUsuariosComponent
 * @description Componente para la gestión de usuarios. Permite listar, crear, editar y eliminar usuarios utilizando el servicio `authService`.
 */
export class GestionUsuariosComponent {

  /**
   * @property usuarios
   * @description Lista de usuarios obtenida desde el servicio.
   */
  usuarios: Usuario[] = [];
  /**
   * @property mostrarContrasena1
   * @description Booleano para mostrar contraseña.
   */
  mostrarContrasena1: boolean = false;
  /**
   * @property mostrarContrasena2
   * @description Booleano para mostrar confirmar contraseña.
   */
  mostrarContrasena2: boolean = false;
  /**
   * @property usuarioEnEdicion
   * @description Usuario actualmente en edición.
   */
  usuarioEnEdicion: Usuario | null = null;
  /**
   * @property usuarioForm
   * @description Formulario reactivo para la creación de un nuevo usuario.
   */
  usuarioForm: FormGroup;
  /**
   * @property edicionUsuarioForm
   * @description Formulario reactivo para la edición de un usuario existente.
   */
  edicionUsuarioForm!: FormGroup;
  /**
   * @property submitted
   * @description Indica si el formulario de creación ha sido enviado.
   */
  submitted = false;
  /**
   * @property nuevoUsuario
   * @description Objeto inicializado para la creación de un nuevo usuario.
   */
  nuevoUsuario: Usuario = {
    rol: '',
    username: '',
    contrasena: '',
    nombres: '',
    apellidos: '',
    correo: '',
    fecha_nacimiento: '',
    domicilio: ''
  };
  /**
   * @property mostrarFormulario
   * @description Controla la visibilidad del formulario de creación de usuario.
   */
  mostrarFormulario: boolean = false;
  /**
   * @property mensajeExitoso
   * @description Indica si se muestra un mensaje de éxito después de una acción exitosa.
   */
  mensajeExitoso = false;

  /**
   * @constructor
   * @description Inicializa los formularios y servicios necesarios.
   * @param authService Servicio para manejar autenticación de usuarios.
   * @param fb Servicio para crear formularios reactivos.
   */
  constructor(private authService: AuthService, private http: HttpClient, private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      rol: ['', Validators.required],
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/)]],
      fecha_nacimiento: ['', [Validators.required, this.validarEdadMinima, this.validarFechaNacimiento()]],
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

    this.edicionUsuarioForm = this.fb.group({
      rol: ['', Validators.required],
      username: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', Validators.required],
      domicilio: [''],
    });
  }
  /**
   * @method obtenerUsuarios
   * @description Obtiene la lista de usuarios desde el servicio.
   */
  obtenerUsuarios(): void {
    this.authService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log("Resultados usuarios: ", this.usuarios);
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    });
  }

  /**
   * @method guardarCambios
   * @description Guarda los cambios realizados en el formulario de edición.
   */
  guardarCambios(): void {
    if (this.edicionUsuarioForm.invalid || !this.usuarioEnEdicion) return;

    const datosActualizados = { ...this.usuarioEnEdicion, ...this.edicionUsuarioForm.value };

    this.authService.editarUsuarioActualizado(datosActualizados).subscribe({
      next: () => {
        console.log('Usuario actualizado correctamente');
        this.usuarioEnEdicion = null;
        this.obtenerUsuarios(); // Refrescar la lista.
      },
      error: (error) => console.error('Error al actualizar usuario:', error),
    });
  }

  /**
   * @method cancelarEdicion
   * @description Cancela la edición actual y resetea el formulario.
   */
  cancelarEdicion(): void {
    this.usuarioEnEdicion = null;
    this.edicionUsuarioForm.reset();
  }

  /**
   * @method editarUsuario
   * @description Método activado cuando se hace clic en el botón de editar, el cual realiza
   * actualizaciones a los datos de un usuario.
   */
  editarUsuario(usuario: Usuario): void {
    if (this.usuarioEnEdicion && this.usuarioEnEdicion.username === usuario.username) {
      this.guardarCambios();
      return;
    }

    this.usuarioEnEdicion = usuario;
    this.edicionUsuarioForm.patchValue(usuario);
  }

  /**
   * @method agregarUsuario
   * @description Método que agrega un usuario nuevo mediante formulario reactivo.
   */
  agregarUsuario(): void {
    this.submitted = true;
    if (this.usuarioForm.invalid) {
      return;
    }

    const nuevoUsuario: Usuario = {
      ...this.usuarioForm.value,
      contrasena: this.usuarioForm.value.contrasena1,
    };

    this.authService.crearUsuario(nuevoUsuario).subscribe({
      next: (usuarios) => {
        this.mensajeExitoso = true;
        console.log('Usuario agregado correctamente:', usuarios);
        this.usuarioForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        console.error('Error al agregar el usuario:', error);
      },
    });
  }
  /**
   * @method eliminarUsuario
   * @description Método que elimina un usuario utilizando los métodos del servicio authService.
   * @param usuario 
   */
  eliminarUsuario(usuario: Usuario) {
    if (confirm(`¿Está seguro de que desea eliminar al usuario ${usuario.username}?`)) {
      this.authService.eliminarUsuario(usuario.username).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.username !== usuario.username);
          alert('Usuario eliminado exitosamente');
        },
        error: () => alert('Error al eliminar el usuario')
      });
    }
  }
  /**
   * @method toggleFormulario
   * @description Alterna la visibilidad del formulario de creación de usuario.
   */
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mensajeExitoso = false; // Resetear mensaje
  }
  /**
   * @method validarEdadMinima
   * @description Valida que la fecha de nacimiento cumpla con la edad mínima requerida (13 años).
   * @param control Control del formulario que contiene la fecha de nacimiento.
   * @returns {ValidationErrors | null} Un error si no se cumple la validación, o `null` si es válida.
   */
  validarEdadMinima(control: AbstractControl): { [key: string]: any } | null {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    const edadMinima = new Date(hoy.getFullYear() - 13, hoy.getMonth(), hoy.getDate());

    return fechaNacimiento > edadMinima ? { menorDeEdad: true } : null;
  }
  /**
   * @method validarFechaNacimiento
   * @description Valida que la fecha de nacimiento esté dentro de un rango aceptable (entre 1900 y el año actual).
   * @returns {ValidatorFn} Una función que valida la fecha de nacimiento.
   */
  validarFechaNacimiento(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const fechaIngresada = new Date(control.value);
      const year = fechaIngresada.getFullYear();
      const yearActual = new Date().getFullYear();
      
      if (year < 1900 || year > yearActual) {
        return { fechaInvalida: true };
      }
      
      return null;
    };
  }
  /**
   * @method validarContrasenasIguales
   * @description Valida que las contraseñas ingresadas en los campos `contrasena1` y `contrasena2` sean iguales.
   * @param formGroup Grupo de controles que contiene las contraseñas.
   * @returns {ValidationErrors | null} Un error si las contraseñas no coinciden, o `null` si coinciden.
   */
  validarContrasenasIguales(formGroup: FormGroup) {
    const contrasena1 = formGroup.get('contrasena1')?.value;
    const contrasena2 = formGroup.get('contrasena2')?.value;
    return contrasena1 === contrasena2 ? null : { contrasenasNoCoinciden: true };
  }
  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular. Se ejecuta al inicializar el componente.
   * Realiza la carga inicial de usuarios desde el servicio.
   */
  ngOnInit() {
    this.obtenerUsuarios();
  }
}
