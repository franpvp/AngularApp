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

  /**
   * @description
   * Nombre del usuario que completa el formulario de contacto.
   */
  nombre: string = '';

  /**
   * @description
   * Correo electrónico del usuario que completa el formulario de contacto.
   */
  correo: string = '';

  /**
   * @description
   * Asunto del mensaje que el usuario desea enviar.
   */
  asunto: string = '';

  /**
   * @description
   * El mensaje que el usuario desea enviar.
   */
  mensaje: string = '';

  /**
   * @description
   * Bandera que indica si el mensaje fue enviado exitosamente.
   */
  mensajeEnviado: boolean = false;

  /**
   * @description
   * Variables que indican si cada campo del formulario ha sido tocado por el usuario.
   */
  nombreTouched: boolean = false;
  correoTouched: boolean = false;
  asuntoTouched: boolean = false;
  mensajeTouched: boolean = false;

  /**
   * @description
   * Formulario reactivo que agrupa los campos del formulario de contacto.
   */
  formularioContacto!: FormGroup;

  /**
   * @constructor
   * Constructor del componente ContactoComponent.
   * @param fb Instancia del FormBuilder para crear el formulario reactivo.
   */
  constructor(private fb: FormBuilder) { }

  /**
   * @method
   * Método para enviar el formulario de contacto.
   * Si el formulario es válido, se marca el mensaje como enviado y se muestra en la consola.
   * Después de 3 segundos, se oculta el mensaje de éxito.
   * @description
   * Este método procesa el formulario, muestra un mensaje de éxito y resetea el formulario después de enviarlo.
   */
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

  /**
   * @method
   * Método para validar un campo del formulario.
   * @param campo El nombre del campo a validar.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario false.
   * @description
   * Este método se encarga de validar si un campo específico del formulario es inválido y ha sido tocado.
   */
  validarCampo(campo: string): boolean {
    return !!this.formularioContacto.get(campo)?.invalid && 
        (this.formularioContacto.get(campo)?.touched || false);
  }

  /**
   * @method
   * Método llamado cuando el componente es inicializado.
   * Configura el formulario reactivo con los controles y sus validaciones.
   * @description
   * Este método establece las validaciones del formulario, como patrones, campos obligatorios, etc.
   */
  ngOnInit(): void {
    this.formularioContacto = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      correo: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/)]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }
}