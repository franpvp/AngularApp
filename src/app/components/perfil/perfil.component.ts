import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from '../../models/interfaces';

/**
 * @Component
 * Componente que gestiona el perfil del usuario en la aplicación. 
 * Permite ver, editar y guardar información del perfil, como nombres, apellidos, correo, fecha de nacimiento y domicilio.
 *
 * @selector app-perfil
 * @standalone true
 * @imports [CommonModule, FormsModule, NavComponent, ReactiveFormsModule]
 * @templateUrl ./perfil.component.html
 * @styleUrls ./perfil.component.css
 * @providers [AuthService]
 */
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers: [
    AuthService
  ],
})
export class PerfilComponent {
  
  /**
   * @property {Usuario[]} usuarios
   * Lista de usuarios disponibles, obtenida desde el servicio AuthService.
   */
  usuarios: Usuario[] = [];

  /**
   * @property {Usuario | null} usuario
   * Usuario seleccionado (en uso para potenciales operaciones).
   */
  usuario: Usuario | null = null;

  /**
   * @property {Usuario | undefined} usuarioLogeado
   * Información del usuario actualmente logeado, cargada desde `localStorage` y validada en el backend.
   */
  usuarioLogeado: Usuario | undefined;

  /**
   * @property {Usuario | null} usuarioEnEdicion
   * Usuario que actualmente está siendo editado en el formulario.
   */
  usuarioEnEdicion: Usuario | null = null;

  /**
   * @property {boolean} editando
   * Indica si el formulario está en modo de edición.
   */
  editando: boolean = false;

  /**
   * @property {boolean} mensajeExitoso
   * Muestra un mensaje de éxito cuando se guardan los cambios correctamente.
   */
  mensajeExitoso: boolean = false;

  /**
   * @property {FormGroup} edicionUsuarioForm
   * Formulario reactivo utilizado para gestionar la edición de los datos del perfil.
   */
  edicionUsuarioForm!: FormGroup;

  /**
   * @constructor
   * Crea una instancia del `PerfilComponent` y configura el formulario reactivo.
   * 
   * @param {AuthService} authService Servicio de autenticación para obtener y actualizar usuarios.
   * @param {FormBuilder} fb Constructor de formularios reactivos.
   */
  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.edicionUsuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', Validators.required],
      domicilio: [''],
    });
  }

  /**
   * @method guardarCambios
   * Guarda los cambios realizados en el perfil del usuario.
   * Llama al servicio `AuthService` para actualizar los datos en el backend.
   */
  guardarCambios(): void {
    if (this.edicionUsuarioForm.invalid || !this.usuarioLogeado) {
      console.error('Formulario inválido o usuario no definido');
      return;
    }

    const usuarioActualizado: Usuario = {
      ...this.usuarioLogeado,
      ...this.edicionUsuarioForm.value,
    };

    this.authService.editarUsuarioActualizado(usuarioActualizado).subscribe({
      next: () => {
        console.log('Usuario actualizado correctamente');
        this.mensajeExitoso = true;
        this.usuarioLogeado = usuarioActualizado;
        this.usuarioEnEdicion = null;
        this.editando = false;
      },
      error: (error) => console.error('Error al actualizar usuario:', error),
    });
  }

  /**
   * @method cancelarEdicion
   * Cancela el proceso de edición y restaura los valores originales del formulario.
   */
  cancelarEdicion(): void {
    if (this.usuarioLogeado) {
      this.edicionUsuarioForm.reset(this.usuarioLogeado);
    }
    this.usuarioEnEdicion = null;
    this.editando = false;
  }

  /**
   * @method editarUsuario
   * Activa el modo de edición para el usuario logeado.
   */
  editarUsuario(): void {
    if (!this.usuarioLogeado) {
      console.error('Usuario no está logeado');
      return;
    }

    this.usuarioEnEdicion = this.usuarioLogeado;
    this.edicionUsuarioForm.patchValue(this.usuarioLogeado);
    this.editando = true;
  }

  /**
   * @method obtenerUsuarios
   * Obtiene la lista de usuarios del servicio AuthService y los almacena en la propiedad `usuarios`.
   */
  obtenerUsuarios(): void {
    this.authService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log("Resultados usuarios: ", this.usuarios);
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      },
    });
  }

  /**
   * @method inicializarFormulario
   * Inicializa el formulario reactivo con los valores del usuario proporcionado.
   * 
   * @param {Usuario} usuario El usuario cuyos datos se utilizarán para inicializar el formulario.
   */
  inicializarFormulario(usuario: Usuario): void {
    this.edicionUsuarioForm.patchValue(usuario);
  }

  /**
   * @method activarEdicion
   * Activa el modo de edición del formulario.
   */
  activarEdicion(): void {
    this.editando = true;
  }

  /**
   * @method ngOnInit
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Carga el usuario logeado desde el localStorage y valida su existencia en el backend.
   */
  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuarioLogeado = JSON.parse(usuarioGuardado);

      if (this.usuarioLogeado?.username) {
        this.authService.obtenerUsuarios().subscribe({
          next: (usuarios: Usuario[]) => {
            const usuarioEncontrado = usuarios.find(u => u.username === this.usuarioLogeado?.username);
            if (usuarioEncontrado) {
              this.usuarioLogeado = usuarioEncontrado;
              this.inicializarFormulario(usuarioEncontrado);
            } else {
              console.error('Usuario no encontrado en el sistema');
            }
          },
          error: (error) => console.error('Error al obtener usuarios:', error),
        });
      }
    }
  }
}