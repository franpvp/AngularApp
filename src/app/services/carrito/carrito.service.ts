// services/carrito.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Libro } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  /**
   * @property productosEnCarrito
   * @description Lista interna que almacena los productos del carrito.
   */
  private productosEnCarrito: Libro[] = [];

  /**
   * @property carritoSubject
   * @description Subject que mantiene el estado del carrito y permite la suscripción a los cambios del carrito.
   */
  private carritoSubject = new BehaviorSubject<Libro[]>([]);

  /**
   * @property carrito$
   * @description Observable que emite el estado del carrito.
   */
  carrito$ = this.carritoSubject.asObservable();

  /**
   * @constructor
   * @description Constructor del servicio. Recupera los productos del carrito desde localStorage si existen.
   */
  constructor() {
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
      this.carritoSubject.next(this.productosEnCarrito);
    }
  }

  /**
   * @method agregarAlCarrito
   * @description Método para agregar un libro al carrito.
   * @param {Libro} libro El libro a agregar al carrito.
   */
  agregarAlCarrito(libro: Libro): void {
    // Agregar el producto al carrito (sin modificar el modelo)
    this.productosEnCarrito.push(libro);
  
    // Actualizar el carrito en localStorage
    this.actualizarCarrito();
  }

  /**
   * @method limpiarCarrito
   * @description Método para vaciar el carrito de compras.
   */
  limpiarCarrito(): void {
    this.productosEnCarrito = [];
    this.actualizarCarrito();
  }

  /**
   * @method obtenerCarritoAgrupado
   * @description Método para obtener el carrito agrupado por producto, con su cantidad respectiva.
   * @returns { { libro: Libro, cantidad: number }[] } Devuelve un array de objetos con el libro y su cantidad en el carrito.
   */
  obtenerCarritoAgrupado(): { libro: Libro, cantidad: number }[] {
    const agrupado: { [id: number]: { libro: Libro, cantidad: number } } = {};
    this.productosEnCarrito.forEach(libro => {
      if (agrupado[libro.id]) {
        agrupado[libro.id].cantidad++;
      } else {
        agrupado[libro.id] = { libro, cantidad: 1 };
      }
    });
    return Object.values(agrupado);
  }

  /**
   * @method calcularTotal
   * @description Método para calcular el total del carrito.
   * @returns {number} Devuelve el total sumado de los precios de los productos en el carrito.
   */
  calcularTotal(): number {
    return this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0);
  }

  /**
   * @method actualizarCarrito
   * @description Método privado para actualizar el estado del carrito y almacenarlo en localStorage.
   */
  private actualizarCarrito(): void {
    this.carritoSubject.next([...this.productosEnCarrito]);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  }
}