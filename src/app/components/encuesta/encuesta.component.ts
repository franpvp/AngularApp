import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  intentosActuales: number = 0;
  encuestaVisible: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.intentosActuales = parseInt(localStorage.getItem('intentosEncuesta') || '0', 10);

    // Verificar si se debe mostrar la encuesta
    if (this.intentosActuales !== 1) {
      setTimeout(() => {
        this.mostrarEncuesta();
      }, 10000);
    }

    // Cerrar encuesta al hacer clic fuera del contenido
    const encuestaContainer = this.el.nativeElement.querySelector('#encuesta-container');
    this.renderer.listen(encuestaContainer, 'click', (event: MouseEvent) => {
      if (event.target === encuestaContainer) {
        this.cerrarEncuesta();
      }
    });
  }

  mostrarEncuesta(): void {
    this.encuestaVisible = true;
    this.intentosActuales++;
    localStorage.setItem('intentosEncuesta', this.intentosActuales.toString());
  }

  cerrarEncuesta(): void {
    this.encuestaVisible = false;
  }

  onSubmit(formValues: { nombre: string; email: string; categoriaPreferencia: string; feedback: string }): void {
    const encuestas = JSON.parse(localStorage.getItem('encuestas') || '[]');
    encuestas.push(formValues);
    localStorage.setItem('encuestas', JSON.stringify(encuestas));

    alert('¡Gracias por tu feedback! Utilizaremos esta información para recomendarte libros.');
    this.cerrarEncuesta();
  }


}
