import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  nombres: string = '';
  apellidos: string = '';
  username: string = '';
  correo: string = '';
  fecha_nacimiento: string = '';
  domicilio: string = '';
  contrasena1: string = '';
  contrasena2: string = '';

  nombreTouched: boolean = false;
  apellidosTouched: boolean = false;
  usernameTouched: boolean = false;
  correoTouched: boolean = false;
  contrasenaTouched: boolean = false;
  contrasena2Touched: boolean = false;

  constructor(private router: Router) {

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

  // Validar campos
  isNombreInvalido(): boolean {
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$/;
    return !namePattern.test(this.nombres.trim()) && this.nombreTouched;
  }

  isApellidoInvalido(): boolean {
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$/;
    return !namePattern.test(this.apellidos.trim()) && this.apellidosTouched;
  }

  isCorreoInvalido(): boolean {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/;
    return !regexCorreo.test(this.correo.trim()) && this.correoTouched;
  }

  isContrasenaInvalida(): boolean {
    const regexContrasena = /^(?=.*[A-Z])(?=.*\d)/;
    return !regexContrasena.test(this.contrasena1.trim()) && this.contrasenaTouched;
  }


  validarContrasenas():void {
    const inputContrasena = this.contrasena1;
    const inputContrasena2 = this.contrasena2;

    if(inputContrasena !== inputContrasena2) {
    }
  }

  limpiarFormulario():void {
    this.nombres = '';
    this.apellidos = '';
    this.username = '';
    this.correo = '';
    this.fecha_nacimiento = '';
    this.domicilio = '';
    this.contrasena1 = '';
    this.contrasena2 = '';
  }

}
