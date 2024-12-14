import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

/**
 * @description
 * Componente para mostrar una encuesta de preferencias.
 * El formulario recopila el nombre, email, categoría preferida y comentarios del usuario.
 */
@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  /**
   * @description
   * Variable que controla la visibilidad de la encuesta.
   * Si es `true`, la encuesta es visible, si es `false`, no lo es.
   */
  encuestaVisible: boolean = false;
  /**
   * @description
   * Formulario reactivo que almacena los campos de la encuesta, como el nombre,
   * email, categoría preferida y comentarios del usuario.
   */
  encuestaForm!: FormGroup;
  /**
   * @constructor
   * Constructor del componente EncuestaComponent.
   * Inicializa el formulario con los controles necesarios.
   * @param fb Instancia del FormBuilder para crear el formulario reactivo.
   */
  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con sus controles
    this.encuestaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      categoriaPreferencia: new FormControl('', Validators.required),
      feedback: new FormControl(''),
    });
  }

  /**
   * @method ngOnInit
   * Método llamado cuando el componente es inicializado.
   * Se verifica si la encuesta ya fue mostrada utilizando localStorage
   * y se configura el formulario con las validaciones adecuadas.
   * @description
   * Este método establece las validaciones del formulario, como patrones y requisitos.
   */
  ngOnInit() {
    this.verificarEncuesta();
    this.encuestaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/)]],
      categoriaPreferencia: ['', Validators.required],
      feedback: ['', Validators.required]
    });
  }

  /**
   * @method verificarEncuesta
   * Verifica si la encuesta ya fue mostrada utilizando localStorage.
   * Si es la primera vez, se muestra la encuesta.
   * @description
   * Este método se encarga de verificar si la encuesta fue mostrada previamente.
   * Si no se ha mostrado antes, se activa la visibilidad de la encuesta.
   */
  verificarEncuesta() {
    const encuestaMostrada = localStorage.getItem('encuestaMostrada');
    this.encuestaVisible = !encuestaMostrada;
  }

  /**
   * @method cerrarEncuesta
   * Cierra la encuesta y guarda en localStorage que ya fue mostrada.
   * @description
   * Al cerrar la encuesta, se marca en localStorage que la encuesta ya fue mostrada 
   * para no mostrarla nuevamente en el futuro.
   */
  cerrarEncuesta() {
    this.encuestaVisible = false;
    localStorage.setItem('encuestaMostrada', 'true');
  }

  /**
   * @method validarCampo
   * Método para validar si un campo del formulario está inválido.
   * @param campo El nombre del campo que se desea validar.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario false.
   * @description
   * Este método valida un campo en específico, retornando true si es inválido o si fue tocado por el usuario.
   */
  validarCampo(campo: string): boolean {
    return !!this.encuestaForm.get(campo)?.invalid && 
        (this.encuestaForm.get(campo)?.touched || false);
  }

  /**
   * @method onSubmit
   * Método llamado al enviar el formulario. Muestra los datos en la consola 
   * y cierra la encuesta.
   * @param formValue Los valores del formulario al momento del envío.
   * @description
   * Este método procesa los datos enviados del formulario y cierra la encuesta al finalizar.
   */
  onSubmit(formValue: any) {
    console.log('Datos enviados:', formValue);
    this.cerrarEncuesta();
  }
}