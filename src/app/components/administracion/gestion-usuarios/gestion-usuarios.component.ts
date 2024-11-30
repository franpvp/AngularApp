import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../nav/nav.component";
import { AuthService } from '../../../services/auth/auth.service';
import { Usuario } from '../../../models/interfaces';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

  constructor(private authService: AuthService, private http: HttpClient) {

  }

  editarUsuario(usuario: any): void {
    usuario.enEdicion = true;
  }

  guardarUsuario(usuario: any): void {
    usuario.enEdicion = false;
  }

  ngOnInit() {
    this.authService.obtenerUsuariosJson().subscribe({
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
