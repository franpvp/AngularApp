import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { LibrosService } from '../../services/libros/libros.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
  providers: [
    LibrosService
  ],
})
export class CarritoComponent {

  username: string | null = null;
  productosEnCarrito: Libro[] = [];
  totalCarrito: number = 0;
  libros: Libro[] = [];

  constructor(private router: Router, private librosService: LibrosService) {
  }

  goToPago(): void {
    this.router.navigate(['metodo-pago']);
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
    this.cargarCarrito();
  }
}
