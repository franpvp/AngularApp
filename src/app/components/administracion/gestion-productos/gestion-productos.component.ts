import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../../services/libros/libros.service';
import { Libro } from '../../../models/interfaces';

import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';
import { ChangeDetectorRef } from '@angular/core';

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
  crearLibrosForm!: FormGroup;
  libroEnEdicion: Libro | null = null;
  mostrarFormulario: boolean = false;
  mensajeExitoso = false;
  submitted = false;

  constructor(private librosService: LibrosService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.productosForm = this.fb.group({
      titulo: [''],
      resena: [''],
      autor: [''],
      editorial: [''],
      categoria: [''],
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

  agregarLibro(): void {
    this.submitted = true;
  
    if (this.crearLibrosForm.invalid) {
      return;
    }
  
    const nuevoLibro: Partial<Libro> = {
      titulo: this.crearLibrosForm.value.titulo,
      autor: this.crearLibrosForm.value.autor,
      editorial: this.crearLibrosForm.value.editorial,
      precio: this.crearLibrosForm.value.precio,
      resena: this.crearLibrosForm.value.resena,
      especificaciones: {
        categoria: this.crearLibrosForm.value.categoria
      }
    };
  
    this.librosService.crearLibro(nuevoLibro).subscribe({
      next: () => {
        this.mensajeExitoso = true;
  
        // Forzar detección de cambios
        this.cdr.detectChanges();
        alert('Libro creado exitosamente');
  
        this.crearLibrosForm.reset();
        this.submitted = false;
        this.mostrarFormulario = false;
      },
      error: (error) => {
        console.error('Error al agregar libro:', error);
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

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  ngOnInit() {
    this.obtenerLibros();
    this.crearLibrosForm = this.fb.group({
      titulo: ['', Validators.required],
      resena: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]]
    });
  }

}
