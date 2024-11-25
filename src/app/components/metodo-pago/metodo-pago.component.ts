import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { Libro } from '../../models/interfaces';

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, ReactiveFormsModule],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.css'
})
export class MetodoPagoComponent {

  username: string | null = localStorage.getItem('username');
  productosEnCarrito: Libro[] = [];

  nombre_titular: string = '';
  digitos_tarjeta: string = '';
  fecha_vencimiento: string = '';
  digitos_cvc: string = '';

  formularioPago!: FormGroup;

  constructor(private router: Router, route: ActivatedRoute, private fb: FormBuilder) {

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

  goToContacto(): void {
    this.router.navigate(['contacto']);
  }

  cerrarSesion():void {
    this.username = null;
    this.router.navigate(['home']);
    localStorage.removeItem('username')
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

  validarNombreTitular(event: KeyboardEvent): void {
    const regex = /^[a-zA-Z\s]*$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  formatoDigitosTarjeta(event: KeyboardEvent): void {
    const regex = /^[0-9]*$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }

    // Remueve cualquier caracter no numérico
    this.digitos_tarjeta = this.digitos_tarjeta.replace(/\D/g, '');
    // Añadir espacio cada 4 digitos
    if (this.digitos_tarjeta.length >= 4) {
      this.digitos_tarjeta = this.digitos_tarjeta.slice(0, 4) + ' ' + this.digitos_tarjeta.slice(4, 8) + ' ' + this.digitos_tarjeta.slice(8, 12) + ' ' + this.digitos_tarjeta.slice(12, 16);
    }

    if (this.digitos_tarjeta.length > 19) {
      this.digitos_tarjeta = this.digitos_tarjeta.slice(0, 19);
    }
  }

  formatoFechaVencimiento(event: KeyboardEvent): void {
    const regex = /^[0-9]*$/;
    const key = String.fromCharCode(event.keyCode);
    if (!regex.test(key)) {
      event.preventDefault();
    }
    // Remueve cualquier caracter no numérico
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

  submitForm(): void {
    if (this.nombre_titular && this.digitos_tarjeta && this.fecha_vencimiento && this.digitos_cvc) {
      this.router.navigate(['pago-exitoso']);
    }
  }

  ngOnInit(): void {
    const carritoData = localStorage.getItem('productosEnCarrito');
    this.productosEnCarrito = carritoData ? JSON.parse(carritoData) : [];
    this.cargarCarrito();
  }

}
