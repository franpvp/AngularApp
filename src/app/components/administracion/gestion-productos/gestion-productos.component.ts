import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../../services/libros/libros.service';
import { Libro } from '../../../models/interfaces';

import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [NavComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.css',
  providers: [
    LibrosService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
export class GestionProductosComponent {

  libros: Libro[] = [];
  productosForm!: FormGroup;
  libroEnEdicion: Libro | null = null;

  constructor(private librosService: LibrosService, private fb: FormBuilder) {
    this.productosForm = this.fb.group({
      titulo: [''],
      autor: [''],
      editorial: [''],
      precio: ['']
    });
  }

  obtenerLibros(): void {
    this.librosService.obtenerLibros().subscribe(libros => {
      if (Array.isArray(libros)) {
        this.libros = libros;
      } else {
        console.error("Los datos no son un array");
      }
    });
  }

  editarLibro(libro: Libro): void {
    if (this.libroEnEdicion && this.libroEnEdicion.id === libro.id) {
      this.guardarCambios(); // Si ya se está editando este libro, guarda los cambios
      return;
    }
  
    this.libroEnEdicion = libro; // Establece el libro actual como libro en edición
    this.productosForm.patchValue(libro);
  }

  guardarCambios(): void {
    if (this.productosForm.invalid || !this.libroEnEdicion) {
      console.log('Formulario inválido o libro no seleccionado');
      return;
    }
  
    const libroActualizado = {
      ...this.libroEnEdicion,
      ...this.productosForm.value
    };
  
    this.librosService.editarLibroActualizado(libroActualizado).subscribe({
      next: (actualizado) => {
        console.log('Libro actualizado correctamente', actualizado);
        this.libroEnEdicion = null; // Limpiar la edición
        this.obtenerLibros(); // Refrescar la lista de libros
      },
      error: (error) => {
        console.error('Error al actualizar libro:', error);
        alert('Hubo un error al actualizar el libro.');
      }
    });
  }


  cancelarEdicion(): void {
    this.libroEnEdicion = null;
    this.productosForm.reset();
  }

  eliminarLibro(libro: Libro): void {
    if (confirm(`¿Está seguro de que desea eliminar el libro ${libro.titulo}?`)) {
      this.librosService.eliminarLibro(libro.id).subscribe({
        next: () => {
          this.libros = this.libros.filter(l => l.id !== libro.id);
          alert('Libro eliminado exitosamente');
        },
        error: () => alert('Error al eliminar el libro')
      });
    }
  }

  ngOnInit() {
    this.obtenerLibros();
  }

}
