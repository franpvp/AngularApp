import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Servicios
import { AuthService } from '../../services/auth/auth.service';
// Interfaces
import { Libro } from '../../models/interfaces';
import { LibrosService } from '../../services/libros/libros.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  username: string | null = null;
  productosEnCarrito: Libro[] = [];
  totalCarrito: number = 0;
  libros: Libro[] = [];

  constructor(private router: Router, private librosService: LibrosService, private authService: AuthService) {
    
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

  goToPago() {
    this.router.navigate(['metodo-pago']);
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

  goToCarrito(): void {
    this.router.navigate(['carrito'])
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

  // Enlaces Categorías
  goToCateAutoAyuda(): void {
    this.router.navigate(['auto-ayuda']);
  }

  goToCateNovelas(): void {
    this.router.navigate(['novelas']);
  }

  goToCateLiteratura(): void {
    this.router.navigate(['literatura']);
  }

  goToCateComicsMangas(): void {
    this.router.navigate(['comics-mangas']);
  }

  goToCateInformatica(): void {
    this.router.navigate(['informatica']);
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.librosService.obtenerLibros().subscribe(libros => {
      this.libros = libros;
    });

    this.cargarCarrito();
  }

}
