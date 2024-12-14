import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { Router } from '@angular/router';
import { Libro } from '../../models/interfaces';
import { AuthService } from '../../services/auth/auth.service';
import { LibrosService } from '../../services/libros/libros.service';

import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';

registerLocaleData(localeEsCL);

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './pago-exitoso.component.html',
  styleUrl: './pago-exitoso.component.css',
  providers: [
    LibrosService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
export class PagoExitosoComponent {

  /**
   * @property productosEnCarrito
   * @description Arreglo que almacena los productos que están en el carrito de compras.
   */
  productosEnCarrito: Libro[] = [];

  /**
   * @property fechaActual
   * @description Fecha actual que se muestra en el componente.
   */
  fechaActual: Date = new Date();

  /**
   * @constructor
   * @description Constructor del componente, actualmente vacío.
   */
  constructor() { }

  /**
   * @method calcularTotal
   * @description Método para calcular el total de la compra, sumando los precios de todos los productos en el carrito.
   * @returns {number} El total calculado de los productos en el carrito.
   */
  calcularTotal(): number {
    return this.productosEnCarrito ? this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0) : 0;
  }

  /**
   * @method cargarCarrito
   * @description Método para cargar los productos del carrito desde localStorage y recalcular el total.
   */
  cargarCarrito(): void {
    // Obtener los productos del carrito desde localStorage
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
      this.calcularTotal();
    }
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente. 
   * Carga los productos del carrito desde localStorage si están disponibles.
   */
  ngOnInit(): void {
    const carritoData = localStorage.getItem('productosEnCarrito');
    this.productosEnCarrito = carritoData ? JSON.parse(carritoData) : [];
    this.cargarCarrito();
  }
}