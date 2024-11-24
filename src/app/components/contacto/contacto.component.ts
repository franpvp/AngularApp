import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  nombre: string = '';
  correo: string = '';
  asunto: string = '';
  mensaje: string = '';
  mensajeEnviado: boolean = false;

  nombreTouched: boolean = false;
  correoTouched: boolean = false;
  asuntoTouched: boolean = false;
  mensajeTouched: boolean = false;

  formularioContacto!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {

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

  // Método para procesar el formulario de contacto
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

  submitForm() {
    if (this.formularioContacto.valid) {
      this.mensajeEnviado = true; // Muestra el mensaje
      console.log(this.formularioContacto.value);

      setTimeout(() => {
        this.mensajeEnviado = false;
      }, 3000);

      this.formularioContacto.reset();
    }
  }

  validarCampo(campo: string): boolean {
    return !!this.formularioContacto.get(campo)?.invalid && 
        (this.formularioContacto.get(campo)?.touched || false);
  }

  ngOnInit(): void {
    this.formularioContacto = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      correo: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/)]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    }
  )}
}
