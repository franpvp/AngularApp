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

  encuestaVisible: boolean = false;

  ngOnInit() {
    this.verificarEncuesta();
  }

  verificarEncuesta() {
    const encuestaMostrada = localStorage.getItem('encuestaMostrada');
    this.encuestaVisible = !encuestaMostrada;
  }

  cerrarEncuesta() {
    this.encuestaVisible = false;
    localStorage.setItem('encuestaMostrada', 'true');
  }

  onSubmit(formValue: any) {
    console.log('Datos enviados:', formValue);
    this.cerrarEncuesta();
  }


}
