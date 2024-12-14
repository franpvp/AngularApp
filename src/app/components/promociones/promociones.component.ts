import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { Router } from '@angular/router';
import { Libro } from '../../models/interfaces';
import { LibrosService } from '../../services/libros/libros.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [NavComponent, CommonModule, HttpClientModule],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css',
  providers: [
    LibrosService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
/**
 * @component PromocionesComponent
 * @description Componente que gestiona la visualización de libros en promoción y su adición al carrito de compras.
 */
export class PromocionesComponent {

  /**
   * @property libros
   * @description Lista de libros que están en promoción. Es actualizada desde el servicio `librosService`.
   */
  libros: Libro[] = [];

  /**
   * @property productosEnCarrito
   * @description Lista de productos (libros) que están actualmente en el carrito de compras.
   */
  productosEnCarrito: Libro[] = [];

  /**
   * @constructor
   * @description Inicializa los servicios necesarios para navegar y obtener la lista de libros.
   * @param {Router} router Servicio para la navegación entre rutas.
   * @param {LibrosService} librosService Servicio encargado de obtener la lista de libros desde el backend o API.
   */
  constructor(private router: Router, private librosService: LibrosService) {}

  /**
   * @method verDetalles
   * @description Navega a la página de detalles de un libro específico, utilizando su ID.
   * @param {number} libroId El ID del libro cuyo detalle se desea ver.
   */
  verDetalles(libroId: number) {
    this.router.navigate(['/producto', libroId]);
  }

  /**
   * @method agregarAlCarrito
   * @description Agrega un libro al carrito de compras y guarda la información en `localStorage`.
   * @param {Libro} libro El libro que se desea agregar al carrito.
   */
  agregarAlCarrito(libro: Libro): void {
    this.productosEnCarrito.push(libro);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene la lista de libros desde el servicio `librosService` y filtra aquellos que están en promoción.
   */
  ngOnInit(): void {
    this.librosService.obtenerLibros().subscribe((data: Libro[]) => {
      // Filtrar los libros que tienen enPromo = true
      this.libros = data.filter(libro => libro.enPromo);
    });
  }
}