import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from '../../models/interfaces';

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

  usuarios: Usuario[] = [];
  usuario: Usuario | null = null;
  usuarioLogeado: Usuario | undefined;
  usuarioEnEdicion: Usuario | null = null;
  editando: boolean = false;
  mensajeExitoso: boolean = false;
  edicionUsuarioForm!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.edicionUsuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', Validators.required],
      domicilio: [''],
    });
  }

  guardarCambios(): void {
    if (this.edicionUsuarioForm.invalid || !this.usuarioLogeado) {
      console.error('Formulario inválido o usuario no definido');
      return;
    }
  
    // Mezclar los cambios con los datos originales del usuario
    const usuarioActualizado: Usuario = {
      ...this.usuarioLogeado,
      ...this.edicionUsuarioForm.value,
    };
  
    // Llamar a tu servicio para actualizar el usuario
    this.authService.editarUsuarioActualizado(usuarioActualizado).subscribe({
      next: () => {
        console.log('Usuario actualizado correctamente');
        this.mensajeExitoso = true;
        this.usuarioLogeado = usuarioActualizado; // Actualizar local
        this.usuarioEnEdicion = null; // Desactivar modo edición
        this.editando = false;
      },
      error: (error) => console.error('Error al actualizar usuario:', error),
    });
  }

  cancelarEdicion(): void {
    if (this.usuarioLogeado) {
      this.edicionUsuarioForm.reset(this.usuarioLogeado); // Restaurar los datos originales
    }
    this.usuarioEnEdicion = null;
    this.editando = false;
  }


  editarUsuario(): void {
    if (!this.usuarioLogeado) {
      console.error('Usuario no está logeado');
      return;
    }

    // Si ya estamos editando al mismo usuario, simplemente guardamos los cambios
    if (this.usuarioEnEdicion && this.usuarioEnEdicion.username === this.usuarioLogeado?.username) {
      this.guardarCambios();
      return;
    }

    // Si no, empezamos a editar el usuario logeado
    this.usuarioEnEdicion = this.usuarioLogeado;
    this.edicionUsuarioForm.patchValue(this.usuarioLogeado);
    this.editando = true;  // Cambiar a true para que el botón de "Guardar" se muestre
  }

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

  inicializarFormulario(usuario: Usuario): void {
    this.edicionUsuarioForm.patchValue({
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      fecha_nacimiento: usuario.fecha_nacimiento,
      domicilio: usuario.domicilio,
    });
  }

  activarEdicion(): void {
    this.editando = true;
  }
  
  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      // Parsear el usuario si existe
      this.usuarioLogeado = JSON.parse(usuarioGuardado);

      // Si el usuario está logeado, lo obtenemos de los usuarios
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
