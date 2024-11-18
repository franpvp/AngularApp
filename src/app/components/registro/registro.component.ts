import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, ReactiveFormsModule],
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

  formularioRegistro!: FormGroup;

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


  validarContrasenas(): void {
    const inputContrasena = this.contrasena1;
    const inputContrasena2 = this.contrasena2;

    if(inputContrasena !== inputContrasena2) {
      console.log("Las constraseñas no coinciden")
    }
  }


  

  // Validación para edad mínima de 13 años
  validarEdadMinima(control: AbstractControl): { [key: string]: any } | null {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    const edadMinima = new Date(hoy.getFullYear() - 13, hoy.getMonth(), hoy.getDate());

    return fechaNacimiento > edadMinima ? { menorDeEdad: true } : null;
  }

  // Validación para contraseñas iguales
  validarContrasenasIguales(formGroup: FormGroup) {
    const contrasena1 = formGroup.get('contrasena1')?.value;
    const contrasena2 = formGroup.get('contrasena2')?.value;
    return contrasena1 === contrasena2 ? null : { contrasenasNoCoinciden: true };
  }

  // Métodos de validación individuales para simplificar en la plantilla
  validarCampo(campo: string): boolean {
    return !!this.formularioRegistro.get(campo)?.invalid && 
        (this.formularioRegistro.get(campo)?.touched || false);
  } 

  submitForm() {
    if (this.formularioRegistro.valid) {
      console.log("Resultado", this.formularioRegistro.value);
    } else {
      this.formularioRegistro.markAllAsTouched();
    }
  }

  limpiarFormulario(): void {
    this.formularioRegistro.reset();
  }

  ngOnInit(): void {
    this.formularioRegistro = this.fb.group({
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      username: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: ['', [Validators.required, this.validarEdadMinima]],
      domicilio: [''],
      contrasena1: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(18),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ],
      contrasena2: ['', Validators.required]
    }, { validator: this.validarContrasenasIguales });
  }

}
