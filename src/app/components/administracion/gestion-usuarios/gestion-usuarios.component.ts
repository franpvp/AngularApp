import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../../nav/nav.component";

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent {

}
