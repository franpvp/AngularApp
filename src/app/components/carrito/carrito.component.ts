import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Juego } from '../../models/interfaces';
import { JuegosService } from '../../services/juegos/juegos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

  username: string | null = null;
  productosEnCarrito: Juego[] = [];
  totalCarrito: number = 0;
  juegos: Juego[] = [];

  constructor(private router: Router, private juegosService: JuegosService) {
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
