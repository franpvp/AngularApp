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
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  usuarioLogeado: Usuario | undefined;
  editando: boolean = false;
  mensajeExitoso: boolean = false;

  constructor(private authService: AuthService) {
    
  }

  toggleEditar(): void {
    if (this.editando && this.usuarioLogeado) {
      // Guardar cambios
      this.authService.actualizarUsuario(this.usuarioLogeado).subscribe((resultado) => {
        if (resultado) {
          alert('Perfil actualizado correctamente');
        } else {
          alert('No se pudo actualizar el perfil');
        }
      });
    }
    this.editando = !this.editando;
  }

  cancelarEdicion(): void {
    const username = localStorage.getItem('username');
    if (username) {
      // Revertir los cambios
      this.authService.obtenerUsuarios().subscribe((usuarios) => {
        this.usuarioLogeado = usuarios.find((user) => user.username === username);
        this.editando = false;
      });
    }
  }

  ngOnInit() {
    const usuarioLogeado = localStorage.getItem('username');
    
    this.authService.obtenerUsuarios().subscribe(usuarios => {
      if (usuarioLogeado) {
        this.usuarioLogeado = usuarios.find(user => user.username === usuarioLogeado);
      }
    });
  }
  
}
