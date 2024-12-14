import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { FormsModule } from '@angular/forms';
import { LibrosService } from '../../../services/libros/libros.service';
import { Libro } from '../../../models/interfaces';

import { ChangeDetectorRef } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

/**
 * @component GestionProductosComponent
 * @description Componente para la gestión de productos (libros). Permite listar, crear, editar y eliminar libros utilizando el servicio `LibrosService`.
 */
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
  /**
   * @property libros
   * @description Lista de libros obtenida desde el servicio.
   */
  libros: Libro[] = [];

  /**
   * @property productosForm
   * @description Formulario reactivo para editar libros.
   */
  productosForm!: FormGroup;

  /**
   * @property crearLibrosForm
   * @description Formulario reactivo para crear nuevos libros.
   */
  crearLibrosForm!: FormGroup;

  /**
   * @property libroEnEdicion
   * @description Almacena el libro que se está editando actualmente.
   */
  libroEnEdicion: Libro | null = null;

  /**
   * @property mostrarFormulario
   * @description Indica si se debe mostrar el formulario para agregar un nuevo libro.
   */
  mostrarFormulario: boolean = false;

  /**
   * @property mensajeExitoso
   * @description Indica si se debe mostrar un mensaje de éxito tras alguna acción.
   */
  mensajeExitoso = false;

  /**
   * @property submitted
   * @description Indica si el formulario de creación de libros ha sido enviado.
   */
  submitted = false;

  /**
   * @constructor
   * @description Inicializa los formularios y servicios necesarios.
   * @param librosService Servicio para manejar las operaciones de libros.
   * @param fb Servicio para crear formularios reactivos.
   * @param cdr Servicio para detección de cambios manual.
   */
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

  /**
   * @method obtenerLibros
   * @description Obtiene la lista de libros desde el servicio `LibrosService`.
   */
  obtenerLibros(): void {
    this.librosService.obtenerLibros().subscribe(libros => {
      if (Array.isArray(libros)) {
        this.libros = libros;
      } else {
        console.error("Los datos no son un array");
      }
    });
  }

  /**
   * @method agregarLibro
   * @description Crea un nuevo libro utilizando los datos del formulario.
   */
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

  /**
   * @method editarLibro
   * @description Inicia el modo de edición para un libro específico.
   * @param libro Libro seleccionado para editar.
   */
  editarLibro(libro: Libro): void {
    if (this.libroEnEdicion && this.libroEnEdicion.id === libro.id) {
      this.guardarCambios();
      return;
    }
  
    this.libroEnEdicion = libro;
    this.productosForm.patchValue({
      titulo: libro.titulo,
      resena: libro.resena,
      autor: libro.autor,
      editorial: libro.editorial,
      categoria: libro.especificaciones.categoria,  
      precio: libro.precio
    });
  }

  /**
   * @method guardarCambios
   * @description Guarda los cambios realizados en el libro en edición.
   */
  guardarCambios(): void {
    if (this.productosForm.invalid || !this.libroEnEdicion) {
      console.log('Formulario inválido o libro no seleccionado');
      return;
    }
  
    // Actualizamos solo la categoría dentro de especificaciones
    const libroActualizado = {
      ...this.libroEnEdicion,
      especificaciones: {
        ...this.libroEnEdicion.especificaciones,
        categoria: this.productosForm.value.categoria,  // Actualizamos solo la categoría
      },
      ...this.productosForm.value,  // Mantener otros campos
    };
  
    this.librosService.editarLibroActualizado(libroActualizado).subscribe({
      next: (actualizado) => {
        console.log('Libro actualizado correctamente', actualizado);
        this.libroEnEdicion = null;
        this.obtenerLibros();
      },
      error: (error) => {
        console.error('Error al actualizar libro:', error);
        alert('Hubo un error al actualizar el libro.');
      }
    });
  }

  /**
   * @method cancelarEdicion
   * @description Cancela el modo de edición y limpia el formulario.
   */
  cancelarEdicion(): void {
    this.libroEnEdicion = null;
    this.productosForm.reset();
  }

  /**
   * @method eliminarLibro
   * @description Elimina un libro seleccionado después de confirmar la acción.
   * @param libro Libro a eliminar.
   */
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

  /**
   * @method toggleFormulario
   * @description Alterna la visibilidad del formulario para agregar un libro.
   */
  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  /**
   * @method ngOnInit
   * @description Inicializa los datos y los formularios del componente.
   */
  ngOnInit(): void {
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