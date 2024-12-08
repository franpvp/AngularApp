import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { Router } from '@angular/router';
import { Libro } from '../../../models/interfaces';
import { LibrosService } from '../../../services/libros/libros.service';

import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auto-ayuda',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './auto-ayuda.component.html',
  styleUrl: './auto-ayuda.component.css',
  providers: [
    LibrosService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
export class AutoAyudaComponent {

  libros: Libro[] = [];
  librosJson: Libro[] = [];
  librosFiltrados: Libro[] = [];
  categoriaSeleccionada: string = 'Autoayuda';

  productosEnCarrito: Libro[] = [];

  constructor(private router: Router, private librosService: LibrosService) {

  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  agregarAlCarrito(libro: Libro): void {
    this.productosEnCarrito.push(libro);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  } 

  calcularTotal(): number {
    return this.productosEnCarrito ? this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0) : 0;
  }

  filtrarPorCategoria(categoria: string): void {
    this.librosFiltrados = this.librosJson.filter(
      (libro) => libro.especificaciones.categoria === categoria
    );
  }

  verDetalles(libroId: number) {
    this.router.navigate(['/producto', libroId]);
  }

  ngOnInit() {
    // this.librosService.obtenerLibros().subscribe((libros) => {
    //   this.libros = libros;
    //   this.filtrarPorCategoria(this.categoriaSeleccionada);
    // })
    // Libros obtenidos mediante servidor
    this.librosService.obtenerLibros().subscribe(
      (data: Libro[]) => {
        this.librosJson = data;
        this.filtrarPorCategoria(this.categoriaSeleccionada);
        console.log('Libros recibidos:', this.librosJson);
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }
}
