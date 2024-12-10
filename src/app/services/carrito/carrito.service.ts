// services/carrito.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Libro } from '../../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private productosEnCarrito: Libro[] = [];
  private carritoSubject = new BehaviorSubject<Libro[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
      this.carritoSubject.next(this.productosEnCarrito);
    }
  }

  agregarAlCarrito(libro: Libro): void {
    // Agregar el producto al carrito (sin modificar el modelo)
    this.productosEnCarrito.push(libro);
  
    // Actualizar el carrito en localStorage
    this.actualizarCarrito();
  }

  limpiarCarrito(): void {
    this.productosEnCarrito = [];
    this.actualizarCarrito();
  }

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

  calcularTotal(): number {
    return this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0);
  }

  private actualizarCarrito(): void {
    this.carritoSubject.next([...this.productosEnCarrito]);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  }
}