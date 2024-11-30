import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Servicios
import { AuthService } from '../../services/auth/auth.service';
import { LibrosService } from '../../services/libros/libros.service';

// Interfaces
import { Libro, Usuario } from '../../models/interfaces';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [
    LibrosService,
    AuthService
  ],
})
export class NavComponent {

  usuario: Usuario | null = null;
  productosEnCarrito: Libro[] = [];
  totalCarrito: number = 0;
  libros: Libro[] = [];
  librosJson: Libro[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef, private authService: AuthService) {
    
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

  cerrarSesion(): void {
    // Elimina el usuario del servicio y localStorage
    this.authService.setUsuario(null);
    this.usuario = null;  // Actualiza el valor localmente
  }

  limpiarCarrito(): void {
    this.productosEnCarrito = [];
    localStorage.removeItem('productosEnCarrito');
  }

  goToCarrito(): void {
    this.router.navigate(['carrito']);
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

  goToAdminHome(): void {
    this.router.navigate(['admin-home']);
  }
  goToGestionUsuario(): void {
    this.router.navigate(['gestion-usuarios']);
  } 

  goToGestionProductos(): void {
    this.router.navigate(['gestion-productos']);
  }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      // Parsear el usuario si existe
      this.usuario = JSON.parse(usuarioGuardado);
    }
    this.cargarCarrito();
  }

}
