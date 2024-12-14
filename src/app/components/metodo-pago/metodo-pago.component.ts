import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { Libro } from '../../models/interfaces';
import { LibrosService } from '../../services/libros/libros.service';
import { AuthService } from '../../services/auth/auth.service';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, ReactiveFormsModule],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css',
  providers: [
    LibrosService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
export class MetodoPagoComponent {

  /**
   * @property username
   * @description Nombre de usuario obtenido desde localStorage, utilizado para mostrar el usuario actual.
   */
  username: string | null = localStorage.getItem('username');

  /**
   * @property productosEnCarrito
   * @description Lista de productos (libros) que están en el carrito de compras.
   */
  productosEnCarrito: Libro[] = [];

  /**
   * @property totalCarrito
   * @description Total calculado del carrito de compras.
   */
  totalCarrito: number = 0;

  /**
   * @property nombre_titular
   * @description Nombre del titular de la tarjeta de crédito.
   */
  nombre_titular: string = '';

  /**
   * @property digitos_tarjeta
   * @description Los números de la tarjeta de crédito ingresados por el usuario.
   */
  digitos_tarjeta: string = '';

  /**
   * @property fecha_vencimiento
   * @description Fecha de vencimiento de la tarjeta de crédito (MM/YY).
   */
  fecha_vencimiento: string = '';

  /**
   * @property digitos_cvc
   * @description El código CVC de la tarjeta de crédito.
   */
  digitos_cvc: string = '';

  /**
   * @property formularioPago
   * @description El formulario de pago utilizado para enviar la información al backend.
   */
  formularioPago!: FormGroup;

  constructor(private carritoService: CarritoService, private router: Router) {}

  /**
   * @method cerrarSesion
   * @description Método para cerrar sesión del usuario, eliminando su nombre de usuario del localStorage
   * y navegando a la página principal.
   */
  cerrarSesion(): void {
    this.username = null;
    this.router.navigate(['home']);
    localStorage.removeItem('username');
  }

  /**
   * @method calcularTotal
   * @description Método para calcular el total del carrito de compras.
   * Agrupa los productos y calcula el precio total.
   * @returns {number} El total calculado del carrito.
   */
  calcularTotal(): number {
    const agrupado = this.obtenerCarritoAgrupado();
    return agrupado.reduce((acc, item) => acc + (item.libro.precio * item.cantidad), 0);
  }

  /**
   * @method cargarCarrito
   * @description Método para cargar los productos del carrito desde localStorage y recalcular el total.
   */
  cargarCarrito(): void {
    const carritoData = localStorage.getItem('productosEnCarrito');
    if (carritoData) {
      this.productosEnCarrito = JSON.parse(carritoData);
      this.calcularTotal();
    }
  }

  /**
   * @method validarNombreTitular
   * @description Método que valida que el nombre del titular contenga solo letras y espacios.
   * Previne la entrada de caracteres no válidos.
   * @param event El evento de teclado.
   */
  validarNombreTitular(event: KeyboardEvent): void {
    const regex = /^[a-zA-Z\s]*$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  /**
   * @method formatoDigitosTarjeta
   * @description Formatea los dígitos de la tarjeta agregando espacios automáticamente
   * después de cada bloque de 4 dígitos. Solo permite números.
   * @param event El evento de teclado.
   */
  formatoDigitosTarjeta(event: KeyboardEvent): void {
    const regex = /^[0-9]*$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }

    // Remueve cualquier carácter no numérico
    this.digitos_tarjeta = this.digitos_tarjeta.replace(/\D/g, '');
    // Añadir espacio cada 4 dígitos
    if (this.digitos_tarjeta.length >= 4) {
      this.digitos_tarjeta = this.digitos_tarjeta.slice(0, 4) + ' ' + this.digitos_tarjeta.slice(4, 8) + ' ' + this.digitos_tarjeta.slice(8, 12) + ' ' + this.digitos_tarjeta.slice(12, 16);
    }

    if (this.digitos_tarjeta.length > 19) {
      this.digitos_tarjeta = this.digitos_tarjeta.slice(0, 19);
    }
  }

  /**
   * @method formatoFechaVencimiento
   * @description Formatea la fecha de vencimiento de la tarjeta de crédito en el formato MM/YY,
   * permitiendo solo números y añadiendo '/' después de los dos primeros dígitos.
   * @param event El evento de teclado.
   */
  formatoFechaVencimiento(event: KeyboardEvent): void {
    const regex = /^[0-9]*$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }
    // Remueve cualquier carácter no numérico
    this.fecha_vencimiento = this.fecha_vencimiento.replace(/\D/g, '');

    // Agrega '/' automáticamente después de los primeros dos dígitos
    if (this.fecha_vencimiento.length >= 2) {
      this.fecha_vencimiento = this.fecha_vencimiento.slice(0, 2) + '/' + this.fecha_vencimiento.slice(2, 4);
    }

    // Limita la longitud a 5 caracteres (MM/YY)
    if (this.fecha_vencimiento.length > 5) {
      this.fecha_vencimiento = this.fecha_vencimiento.slice(0, 5);
    }
  }

  /**
   * @method validarCVC
   * @description Valida que el código CVC contenga solo números y tenga una longitud máxima de 4 caracteres.
   * @param event El evento de teclado.
   */
  validarCVC(event: KeyboardEvent): void {
    const regex = /^[0-9]*$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }

    this.digitos_cvc = this.digitos_cvc.replace(/\D/g, '');

    if (this.digitos_cvc.length > 4) {
      this.digitos_cvc = this.digitos_cvc.slice(0, 4);
    }
  }

  /**
   * @method submitForm
   * @description Método que se ejecuta al enviar el formulario. Si todos los campos están completos,
   * redirige a la página de pago exitoso.
   */
  submitForm(): void {
    if (this.nombre_titular && this.digitos_tarjeta && this.fecha_vencimiento && this.digitos_cvc) {
      this.router.navigate(['pago-exitoso']);
    }
  }

  /**
   * @method obtenerCarritoAgrupado
   * @description Método que agrupa los productos del carrito por su ID y calcula la cantidad de cada uno.
   * @returns {Array} Arreglo de objetos con los libros agrupados y la cantidad.
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
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular. Se ejecuta al inicializar el componente
   * y se suscribe al carritoService para recibir los productos y el total actualizado.
   */
  ngOnInit(): void {
    this.carritoService.carrito$.subscribe((productos) => {
      this.productosEnCarrito = productos;
      this.totalCarrito = this.carritoService.calcularTotal();
    });
  }
}