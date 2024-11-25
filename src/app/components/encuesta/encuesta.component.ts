import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  encuestaVisible: boolean = false;
  encuestaForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con sus controles
    this.encuestaForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      categoriaPreferencia: new FormControl('', Validators.required),
      feedback: new FormControl(''),
    });
  }

  ngOnInit() {
    this.verificarEncuesta();
    this.encuestaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/)]],
      categoriaPreferencia: ['', Validators.required],
      feedback: ['', Validators.required]
      }
    )
  }

  verificarEncuesta() {
    const encuestaMostrada = localStorage.getItem('encuestaMostrada');
    this.encuestaVisible = !encuestaMostrada;
  }

  cerrarEncuesta() {
    this.encuestaVisible = false;
    localStorage.setItem('encuestaMostrada', 'true');
  }

  validarCampo(campo: string): boolean {
    return !!this.encuestaForm.get(campo)?.invalid && 
        (this.encuestaForm.get(campo)?.touched || false);
  }

  onSubmit(formValue: any) {
    console.log('Datos enviados:', formValue);
    this.cerrarEncuesta();
  }
  


}
