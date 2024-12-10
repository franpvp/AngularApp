import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { LibrosService } from '../../services/libros/libros.service';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
  providers: [
    LibrosService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
export class CarritoComponent {

  username: string | null = null;
  productosEnCarrito: Libro[] = [];
  totalCarrito: number = 0;
  libros: Libro[] = [];

  constructor(private carritoService: CarritoService, private router: Router, private librosService: LibrosService) {
  }

  goToPago(): void {
    this.router.navigate(['metodo-pago']);
  }

  calcularTotal(): number {
    const agrupado = this.obtenerCarritoAgrupado();
    return agrupado.reduce((acc, item) => acc + (item.libro.precio * item.cantidad), 0);
  }

  cargarCarrito(): void {
    // Obtener los productos del carrito desde localStorage
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
      this.calcularTotal();
    }
  }

  obtenerCarritoAgrupado(): { libro: Libro, cantidad: number }[] {
    const agrupado: { [id: number]: { libro: Libro, cantidad: number } } = {};
  
    // Agrupar por ID de producto y contar cantidades
    this.productosEnCarrito.forEach(libro => {
      if (agrupado[libro.id]) {
        agrupado[libro.id].cantidad++;
      } else {
        agrupado[libro.id] = { libro, cantidad: 1 };
      }
    });
  
    return Object.values(agrupado);
  }

  ngOnInit(): void {

    this.carritoService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
      this.totalCarrito = this.carritoService.calcularTotal();
    });

    // this.cargarCarrito();
  }
}
