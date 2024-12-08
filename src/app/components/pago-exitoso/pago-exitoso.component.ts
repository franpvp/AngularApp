import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { Router } from '@angular/router';
import { Libro } from '../../models/interfaces';
import { AuthService } from '../../services/auth/auth.service';
import { LibrosService } from '../../services/libros/libros.service';

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

  productosEnCarrito: Libro[] = [];

  constructor(private router: Router) {

  }

  calcularTotal(): number {
    return this.productosEnCarrito ? this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0) : 0;
  }

  cargarCarrito(): void {
    // Obtener los productos del carrito desde localStorage
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
      this.calcularTotal();
    }
  }

  ngOnInit(): void {
    const carritoData = localStorage.getItem('productosEnCarrito');
    this.productosEnCarrito = carritoData ? JSON.parse(carritoData) : [];
    this.cargarCarrito();
  }
}
