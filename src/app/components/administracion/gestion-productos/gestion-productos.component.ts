import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup} from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { AuthService } from '../../../services/auth/auth.service';
import { LibrosService } from '../../../services/libros/libros.service';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.css'
})
export class GestionProductosComponent {

  constructor(private authService: AuthService, private librosService: LibrosService) {

  }

  ngOnInit() {

  }

}
