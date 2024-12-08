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
export class GestionUsuariosComponent {

  usuarios: Usuario[] = [];
  mostrarContrasena1: boolean = false;
  mostrarContrasena2: boolean = false;
  usuarioEnEdicion: Usuario | null = null;
  usuarioForm: FormGroup;
  edicionUsuarioForm!: FormGroup;
  submitted = false;
  // Creación de un usuario nuevo
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

  mostrarFormulario: boolean = false;
  mensajeExitoso = false;

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

  cancelarEdicion(): void {
    this.usuarioEnEdicion = null;
    this.edicionUsuarioForm.reset();
  }

  editarUsuario(usuario: Usuario): void {
    if (this.usuarioEnEdicion && this.usuarioEnEdicion.username === usuario.username) {
      this.guardarCambios();
      return;
    }

    this.usuarioEnEdicion = usuario;
    this.edicionUsuarioForm.patchValue(usuario);
  }

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

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mensajeExitoso = false; // Resetear mensaje
  }

  validarEdadMinima(control: AbstractControl): { [key: string]: any } | null {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    const edadMinima = new Date(hoy.getFullYear() - 13, hoy.getMonth(), hoy.getDate());

    return fechaNacimiento > edadMinima ? { menorDeEdad: true } : null;
  }

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

  validarContrasenasIguales(formGroup: FormGroup) {
    const contrasena1 = formGroup.get('contrasena1')?.value;
    const contrasena2 = formGroup.get('contrasena2')?.value;
    return contrasena1 === contrasena2 ? null : { contrasenasNoCoinciden: true };
  }

  

  ngOnInit() {
    this.obtenerUsuarios();
  }
}
