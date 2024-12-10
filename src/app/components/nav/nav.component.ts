import { Component, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Servicios
import { AuthService } from '../../services/auth/auth.service';
import { LibrosService } from '../../services/libros/libros.service';

// Interfaces
import { Libro, Usuario } from '../../models/interfaces';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [
    LibrosService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
export class NavComponent {

  usuario: Usuario | null = null;
  productosEnCarrito: Libro[] = [];
  totalCarrito: number = 0;
  libros: Libro[] = [];
  librosJson: Libro[] = [];

  constructor(private carritoService: CarritoService, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef, private authService: AuthService) {
    
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
    this.authService.setUsuario(null);
    this.usuario = null;  // Actualiza el valor localmente
    this.router.navigate(['home']);
  }

  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
  }

  goToCarrito(): void {
    this.router.navigate(['carrito']);
  }

  cargarCarrito(): void {
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
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

  calcularTotal(): number {
    const agrupado = this.obtenerCarritoAgrupado();
    return agrupado.reduce((acc, item) => acc + (item.libro.precio * item.cantidad), 0);
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

    this.carritoService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
      this.totalCarrito = this.carritoService.calcularTotal();
    });

    // this.cargarCarrito();
  }

}
