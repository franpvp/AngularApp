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

  constructor(private authService: AuthService) {
    
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
