import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Servicios
import { JuegosService } from '../../services/juegos/juegos.service';
import { AuthService } from '../../services/auth/auth.service';
// Interfaces
import { Juego } from '../../models/interfaces';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  username: string | null = null;
  productosEnCarrito: Juego[] = [];
  totalCarrito: number = 0;
  juegos: Juego[] = [];

  constructor(private router: Router, private juegosService: JuegosService, private authService: AuthService) {
    
  }

  

  goToPerfil(): void {
    this.router.navigate(['perfil']);
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  goToLogin():void {
    this.router.navigate(['login']);
  }

  goToRegistro():void {
    this.router.navigate(['registro']);
  }

  goToPromociones(): void {
    this.router.navigate(['promociones']);
  }

  goToContacto(): void {
    this.router.navigate(['contacto']);
  }

  cerrarSesion():void {
    this.username = null;
    this.router.navigate(['home']);
    localStorage.removeItem('username')
  }

  limpiarCarrito(): void {
    this.productosEnCarrito = [];
    localStorage.removeItem('productosEnCarrito');
  }

  cargarCarrito(): void {
    // Obtener los productos del carrito desde localStorage
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
      this.calcularTotal();
    }
  }

  calcularTotal(): number {
    return this.productosEnCarrito ? this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0) : 0;
  }


  ngOnInit(): void {
    this.username = localStorage.getItem('username');


    this.juegosService.obtenerJuegos().subscribe(juegos => {
      this.juegos = juegos;
    });

    this.cargarCarrito();
  }

}
