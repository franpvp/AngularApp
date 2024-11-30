import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";
import { AuthService } from '../../services/auth/auth.service';
import { Usuario } from '../../models/interfaces';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers: [
    AuthService
  ],
})
export class PerfilComponent {

  usuarioLogeado: Usuario | undefined;
  editando: boolean = false;
  mensajeExitoso: boolean = false;

  constructor(private authService: AuthService) {
    
  }

 // toggleEditar(): void {
  //   if (this.editando && this.usuarioLogeado) {
  //     // Guardar cambios
  //     this.authService.actualizarUsuario(this.usuarioLogeado).subscribe((resultado) => {
  //       if (resultado) {
  //         this.mensajeExitoso = true;
  //         setTimeout(() => {
  //           this.mensajeExitoso = false;
  //         }, 3000);
  //       } else {
  //         alert('No se pudo actualizar el perfil');
  //       }
  //     });
  //   }
  //   this.editando = !this.editando;
  // } 

  // cancelarEdicion(): void {
  //   const username = localStorage.getItem('username');
  //   if (username) {
  //     // Revertir los cambios
  //     this.authService.obtenerUsuariosJson().subscribe((usuarios) => {
  //       this.usuarioLogeado = usuarios.find((user) => user.username === username);
  //       this.editando = false;
  //     });
  //   }
  // }


  cancelarEdicion(): void {
    this.editando = false;
    this.ngOnInit();  // Recargar los datos del usuario para cancelar cualquier cambio
  }
  
  ngOnInit(): void {
    const usuarioLogeado = localStorage.getItem('usuario');

    if (usuarioLogeado) {
      this.authService.obtenerUsuariosJson().subscribe(usuarios => {
        const usuario = usuarios.find(user => user.username === JSON.parse(usuarioLogeado)?.username);
        if (usuario) {
          this.usuarioLogeado = usuario;
        } else {
          console.error('Usuario no encontrado en la lista de usuarios.');
        }
      }, error => {
        console.error('Error al obtener usuarios:', error);
      });
    } else {
      console.log('No hay usuario logeado en el localStorage.');
    }
  }
  
}
