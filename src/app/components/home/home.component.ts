import { Component, ElementRef, LOCALE_ID, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Librerias para formateo de precios
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';

// Injección de Servicios
import { LibrosService } from '../../services/libros/libros.service';
import { AuthService } from '../../services/auth/auth.service';

// Interfaces
import { Libro } from '../../models/interfaces';

// Componentes
import { NavComponent } from "../nav/nav.component";
import { EncuestaComponent } from "../encuesta/encuesta.component";
import { CarritoService } from '../../services/carrito/carrito.service';

registerLocaleData(localeEsCL, 'es-CL');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, EncuestaComponent, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    LibrosService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
/**
 * @component HomeComponent
 * @description Componente que maneja la vista principal del sitio. Permite mostrar la lista de libros, 
 * agregar libros al carrito, ver detalles de los productos y gestionar la sesión de usuario.
 */
export class HomeComponent {

  /**
   * @property username
   * @description Almacena el nombre de usuario de la sesión actual. Puede ser `null` si no hay usuario logueado.
   */
  username: string | null = null;

  /**
   * @property libros
   * @description Lista de libros que se mostrarán en la página principal. 
   * Es una copia del array de libros obtenido desde el servicio `librosService`.
   */
  libros: Libro[] = [];

  /**
   * @property librosJson
   * @description Lista de libros obtenida desde el servicio `librosService` al inicializar el componente.
   */
  librosJson: Libro[] = [];

  /**
   * @property productosEnCarrito
   * @description Lista de productos (libros) que han sido agregados al carrito.
   */
  productosEnCarrito: Libro[] = [];

  /**
   * @property encuestaVisible
   * @description Booleano que indica si la encuesta de feedback está visible en la interfaz.
   */
  encuestaVisible: boolean = false;

  /**
   * @property intentosActuales
   * @description Número de intentos realizados por el usuario en alguna acción, como la encuesta o el login.
   */
  intentosActuales: number = 0;

  /**
   * @property totalCarrito
   * @description Variable que almacena el total calculado de los productos en el carrito.
   */
  totalCarrito: number = 0;

  /**
   * @constructor
   * @description Inicializa los servicios necesarios y configura las dependencias del componente.
   * @param {Router} router Servicio para la navegación entre rutas.
   * @param {LibrosService} librosService Servicio para obtener los datos de los libros.
   * @param {CarritoService} carritoService Servicio para manejar la lógica del carrito de compras.
   */
  constructor(private router: Router, private librosService: LibrosService, private carritoService: CarritoService) {}

  /**
   * @method agregarAlCarrito
   * @description Agrega un libro al carrito utilizando el servicio `carritoService`.
   * @param {Libro} libro El libro que se desea agregar al carrito.
   */
  agregarAlCarrito(libro: Libro): void {
    this.carritoService.agregarAlCarrito(libro);
  }

  /**
   * @method calcularTotal
   * @description Calcula el total de los productos en el carrito sumando los precios de cada libro.
   * @returns {number} El total calculado de los productos en el carrito.
   */
  calcularTotal(): number {
    return this.productosEnCarrito ? this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0) : 0;
  }

  /**
   * @method verDetalles
   * @description Navega a la vista de detalles de un libro específico.
   * @param {number} libroId El ID del libro cuyo detalle se desea ver.
   */
  verDetalles(libroId: number): void {
    this.router.navigate(['/producto', libroId]);
  }

  /**
   * @method cerrarSesion
   * @description Cierra la sesión del usuario actual, eliminando el nombre de usuario del almacenamiento local
   * y redirigiendo a la página principal (`home`).
   */
  cerrarSesion(): void {
    this.username = null;
    this.router.navigate(['home']);
    localStorage.removeItem('username');
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta cuando el componente es inicializado.
   * Carga el nombre de usuario desde el almacenamiento local y obtiene la lista de libros desde el servicio.
   */
  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.librosService.obtenerLibros().subscribe(
      (data) => {
        this.librosJson = data;
        console.log(this.librosJson);
      },
      (error: any) => {
        console.error('Error al cargar los datos', error);
      }
    );
  }

}
