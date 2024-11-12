import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-puntos',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './puntos.component.html',
  styleUrl: './puntos.component.css'
})
export class PuntosComponent {

}
