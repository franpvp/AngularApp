import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { LibrosService } from '../../services/libros/libros.service';
import { CarritoService } from '../../services/carrito/carrito.service';

/**
 * @description
 * Componente para gestionar el carrito de compras. Permite visualizar los productos agregados al carrito,
 * calcular el total de la compra y navegar a la página de pago.
 */
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

  /**
   * @description
   * Nombre de usuario que tiene el carrito, si está logueado.
   */
  username: string | null = null;

  /**
   * @description
   * Lista de productos (libros) que el usuario ha agregado al carrito.
   */
  productosEnCarrito: Libro[] = [];

  /**
   * @description
   * Total de la compra calculado a partir de los productos en el carrito.
   */
  totalCarrito: number = 0;

  /**
   * @description
   * Lista de libros disponibles en el sistema, no necesariamente los que están en el carrito.
   */
  libros: Libro[] = [];

  /**
   * @constructor
   * Constructor del componente CarritoComponent.
   * @param carritoService Servicio encargado de gestionar el carrito de compras.
   * @param router Instancia de Router para la navegación a la página de pago.
   */
  constructor(private carritoService: CarritoService, private router: Router) { }

  /**
   * @method
   * Método para navegar a la página de pago (metodo-pago).
   * @description
   * Redirige al usuario a la ruta de la página de pago donde podrá completar la compra.
   */
  goToPago(): void {
    this.router.navigate(['metodo-pago']);
  }

  /**
   * @method
   * Método para calcular el total de la compra en el carrito.
   * @returns El total calculado del carrito de compras.
   * @description
   * Este método calcula el total de los productos en el carrito agrupados por producto,
   * multiplicando el precio por la cantidad de cada uno.
   */
  calcularTotal(): number {
    const agrupado = this.obtenerCarritoAgrupado();
    return agrupado.reduce((acc, item) => acc + (item.libro.precio * item.cantidad), 0);
  }

  /**
   * @method
   * Método para cargar los productos del carrito desde localStorage.
   * @description
   * Obtiene los productos guardados en localStorage y los asigna a la propiedad productosEnCarrito.
   * Luego, se calcula el total del carrito.
   */
  cargarCarrito(): void {
    // Obtener los productos del carrito desde localStorage
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
      this.calcularTotal();
    }
  }

  /**
   * @method
   * Método para obtener el carrito agrupado por producto.
   * @returns Un arreglo de objetos con los libros agrupados por ID y su cantidad.
   * @description
   * Este método agrupa los productos por ID y cuenta la cantidad de veces que aparece cada producto en el carrito.
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
   * @method
   * Método que se ejecuta cuando el componente es inicializado.
   * @description
   * Este método se suscribe al observable de carritoService para obtener los productos
   * en el carrito y actualizar el total en el carrito.
   */
  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
      this.totalCarrito = this.carritoService.calcularTotal();
    });
  }
}