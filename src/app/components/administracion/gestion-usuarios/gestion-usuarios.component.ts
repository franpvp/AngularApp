import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../nav/nav.component";
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent {

  usuarios: Usuario[] = [];

  constructor(private authService: AuthService) {

  }

  editarUsuario(usuario: any): void {
    usuario.enEdicion = true;
  }

  guardarUsuario(usuario: any): void {
    usuario.enEdicion = false;
  }

  ngOnInit() {
    this.authService.obtenerUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }
}
