import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../nav/nav.component";
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css',
  providers: [
    AuthService
  ],
})
export class GestionUsuariosComponent {

  usuarios: Usuario[] = [];
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

  constructor(private authService: AuthService, private http: HttpClient) {

  }

  editarUsuario(usuario: any): void {
    usuario.enEdicion = true;
  }

  guardarUsuario(usuario: any): void {
    usuario.enEdicion = false;
  }

  agregarUsuario() {
    this.authService.crearUsuario(this.nuevoUsuario).subscribe(
      (usuariosActualizados) => {
        console.log('Usuario creado con éxito:', usuariosActualizados);
      },
      (error) => {
        console.error('Error al crear el usuario', error);
      }
    );
  }

  limpiarFormulario() {
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

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
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
