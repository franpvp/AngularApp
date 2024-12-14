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
/**
 * @component NavComponent
 * @description Componente que maneja la barra de navegación de la página, incluyendo la gestión del carrito de compras, 
 * la sesión de usuario y la navegación entre vistas.
 */
export class NavComponent {

  /**
   * @property usuario
   * @description Almacena la información del usuario logueado, o `null` si no hay usuario.
   */
  usuario: Usuario | null = null;

  /**
   * @property productosEnCarrito
   * @description Lista de libros que están actualmente en el carrito de compras.
   */
  productosEnCarrito: Libro[] = [];

  /**
   * @property totalCarrito
   * @description Total calculado de los productos en el carrito de compras.
   */
  totalCarrito: number = 0;

  /**
   * @property libros
   * @description Lista de libros disponible para el componente. Puede ser usada para otras funcionalidades.
   */
  libros: Libro[] = [];

  /**
   * @property librosJson
   * @description Lista de libros obtenida del servicio `librosService`. Puede usarse para cargar y mostrar los productos.
   */
  librosJson: Libro[] = [];

  /**
   * @constructor
   * @description Inicializa los servicios necesarios para la navegación, la autenticación y la gestión del carrito.
   * @param {CarritoService} carritoService Servicio encargado de la lógica del carrito de compras.
   * @param {Router} router Servicio para la navegación entre rutas.
   * @param {AuthService} authService Servicio para manejar la autenticación de usuarios.
   */
  constructor(private carritoService: CarritoService, private router: Router, private authService: AuthService) {}

  /**
   * @method goToHome
   * @description Navega a la página de inicio (`home`).
   */
  goToHome(): void {
    this.router.navigate(['home']);
  }

  /**
   * @method goToPago
   * @description Navega a la página del método de pago.
   */
  goToPago(): void {
    this.router.navigate(['metodo-pago']);
  }

  /**
   * @method cerrarSesion
   * @description Cierra la sesión del usuario actual, eliminando el usuario guardado y redirigiendo a la página principal.
   */
  cerrarSesion(): void {
    this.authService.setUsuario(null);
    this.usuario = null;
    this.router.navigate(['home']);
  }

  /**
   * @method limpiarCarrito
   * @description Limpia todos los productos del carrito de compras.
   */
  limpiarCarrito(): void {
    this.carritoService.limpiarCarrito();
  }

  /**
   * @method cargarCarrito
   * @description Carga los productos del carrito desde `localStorage` si existen.
   */
  cargarCarrito(): void {
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
    }
  }

  /**
   * @method obtenerCarritoAgrupado
   * @description Agrupa los productos del carrito por su ID y calcula la cantidad de cada producto en el carrito.
   * @returns {Array} Un array con los libros agrupados por su ID y la cantidad correspondiente.
   */
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

  /**
   * @method calcularTotal
   * @description Calcula el total de los productos en el carrito agrupados y multiplicados por su cantidad.
   * @returns {number} El total calculado del carrito.
   */
  calcularTotal(): number {
    const agrupado = this.obtenerCarritoAgrupado();
    return agrupado.reduce((acc, item) => acc + (item.libro.precio * item.cantidad), 0);
  }

  /**
   * @method goToAdminHome
   * @description Navega a la página de inicio del panel de administración.
   */
  goToAdminHome(): void {
    this.router.navigate(['admin-home']);
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Carga los datos del usuario desde `localStorage` y suscribe a los cambios del carrito.
   */
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
  }
}