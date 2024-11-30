import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup} from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { LibrosService } from '../../../services/libros/libros.service';
import { Libro } from '../../../models/interfaces';

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.css',
  providers: [
    LibrosService
  ],
})
export class GestionProductosComponent {

  libros: Libro[] = [];

  constructor(private librosService: LibrosService) {

  }

  editarLibro(libro: any): void {
    libro.enEdicion = true;
  }

  guardarLibro(libro: any): void {
    libro.enEdicion = false;
  }

  ngOnInit() {
    this.librosService.obtenerLibrosJson().subscribe(
      (data) => {
        this.libros = data;
        console.log(this.libros);
      },
      (error) => {
        console.error('Error al cargar los datos', error);
      }
    );
  }

}
