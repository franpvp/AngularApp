import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../nav/nav.component";
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/interfaces';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl} from '@angular/forms';
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
  usuarioForm!: FormGroup;
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
    domicilio: '',
    enEdicion: false,
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

  editarUsuario(usuario: any): void {
    usuario.enEdicion = true;
  }

  guardarUsuario(usuario: any): void {
    usuario.enEdicion = false;
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


  limpiarFormulario(): void {
    this.nuevoUsuario = {
      rol: '',
      username: '',
      contrasena: '',
      nombres: '',
      apellidos: '',
      correo: '',
      fecha_nacimiento: '',
      domicilio: '',
      enEdicion: false,
    };
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

  validarContrasenasIguales(formGroup: FormGroup) {
    const contrasena1 = formGroup.get('contrasena1')?.value;
    const contrasena2 = formGroup.get('contrasena2')?.value;
    return contrasena1 === contrasena2 ? null : { contrasenasNoCoinciden: true };
  }

  ngOnInit() {
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
}
