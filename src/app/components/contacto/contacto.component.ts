import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  nombre: string = '';
  correo: string = '';
  asunto: string = '';
  mensaje: string = '';

  nombreTouched: boolean = false;
  correoTouched: boolean = false;
  asuntoTouched: boolean = false;
  mensajeTouched: boolean = false;

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

  // Validaciones de formulario
  isNombreInvalido(): boolean {
    const namePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$/;
    return !namePattern.test(this.nombre.trim()) && this.nombreTouched;
  }

  isCorreoValido(): boolean {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/;
    return !regexCorreo.test(this.correo.trim()) && this.correoTouched;
  }

  isAsuntoValido(): boolean {
    return this.asunto.trim() === '' && this.asuntoTouched;
  }

  isMensajeValido(): boolean {
    return this.mensaje.trim() === '' && this.mensajeTouched;
  }

  // Método para procesar el formulario
  onSubmit() {
    // Verifica que cada campo es válido antes de enviar
    if (
      !this.isNombreInvalido() &&
      !this.isCorreoValido() &&
      !this.isAsuntoValido() &&
      !this.isMensajeValido() &&
      this.nombre.trim() !== '' &&
      this.correo.trim() !== '' &&
      this.asunto.trim() !== '' &&
      this.mensaje.trim() !== ''
    ) {
      console.log("Formulario enviado exitosamente");
    } else {
      console.log("Hay errores en el formulario");
    }
  }



}
