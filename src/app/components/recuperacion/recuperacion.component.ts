import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {

  correo: string = '';
  correoTouched: boolean = false;
  mensajeError: string = '';

  formularioRecuperacion!: FormGroup;
  
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {

  }

  isCorreoValido(): boolean {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/;
    return !regexCorreo.test(this.correo.trim()) && this.correoTouched;
  }

  submitForm(): void {
    const correoControl = this.formularioRecuperacion.get('correo')?.value;
    this.authService.validarCorreo(correoControl).subscribe((existe) => {
      if (existe) {
        // Redirige al formulario para ingresar la nueva contraseña
        this.router.navigate(['restablecer-contrasena'], {
          queryParams: { correoControl },
        });
      } else {
        this.mostrarMensajeError('El correo ingresado no está registrado');
      }
    }, error => {
      this.mostrarMensajeError('Hubo un problema al validar el correo. Intente nuevamente.');
    });
  }

  validarCampo(campo: string): boolean {
    return !!this.formularioRecuperacion.get(campo)?.invalid && 
        (this.formularioRecuperacion.get(campo)?.touched || false);
  }

  mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

  ngOnInit(): void {
    this.formularioRecuperacion = this.fb.group({
      correo: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|cl)$/)]],
    }
  )}
}
