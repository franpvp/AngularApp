import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-restablecer-contrasena',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavComponent, FormsModule, HttpClientModule],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.css',
  providers: [
    AuthService
  ],
})
export class RestablecerContrasenaComponent {

  
  correo: string | null = null;
  correoTouched: boolean = false;
  nuevaContrasena: string | null = null;
  nuevaContrasenaTouched: boolean = false;
  confirmarContrasena: string | null = null;
  confirmarContrasenaTouched: boolean = false;
  mensajeError: string = '';
  mensajeExitoso: boolean = false;

  formularioNuevaContrasena!: FormGroup;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    
  }

  submitForm(): void {
    if (this.formularioNuevaContrasena.valid && this.correo) {
      const nuevaContrasena = this.formularioNuevaContrasena.get('nuevaContrasena')?.value;

      this.authService.cambiarContrasena(this.correo, nuevaContrasena).subscribe({
        next: () => {
          this.mensajeExitoso = true;
          setTimeout(() => {
            this.mensajeExitoso = false;
            this.router.navigate(['/login']); // Redirigir al login después de actualizar la contraseña
          }, 3000);
        },
        error: (err: any) => {
          this.mostrarMensajeError('Hubo un error al actualizar la contraseña. Intente nuevamente.');
          console.error('Error al cambiar la contraseña:', err);
        },
      });
    } else {
      this.formularioNuevaContrasena.markAllAsTouched(); // Marcar campos como tocados para mostrar errores
    }
  }

  validarCampo(campo: string): boolean {
    return !!this.formularioNuevaContrasena.get(campo)?.invalid && 
        (this.formularioNuevaContrasena.get(campo)?.touched || false);
  }

  mostrarMensajeError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

  // Validador personalizado para comparar contraseñas
  validarContrasenasIguales(group: FormGroup): { [key: string]: boolean } | null {
    const nuevaContrasena = group.get('nuevaContrasena')?.value;
    const confirmarContrasena = group.get('confirmarContrasena')?.value;
    return nuevaContrasena === confirmarContrasena ? null : { noCoinciden: true };
  }

  obtenerErrorContrasenas(): boolean {
    return !!this.formularioNuevaContrasena.hasError('noCoinciden');
  }


  ngOnInit(): void {
    // Obtener el correo desde los queryParams
    this.route.queryParams.subscribe((params) => {
      this.correo = params['correo'] || null;
    });

    // Inicializar el formulario con validaciones
    this.formularioNuevaContrasena = this.fb.group(
      {
        nuevaContrasena: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
          ],
        ],
        confirmarContrasena: ['', Validators.required],
      },
      { validators: this.validarContrasenasIguales }
    );
  }
}


