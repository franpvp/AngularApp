import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-restablecer-contrasena',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavComponent, FormsModule],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.css'
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

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    
  }

  submitForm(): void {
    if (this.formularioNuevaContrasena.valid) {
      this.mensajeExitoso = true;
      console.log('Resultado', this.formularioNuevaContrasena.value);

      // Mostrar mensaje y redirigir
      setTimeout(() => {
        this.mensajeExitoso = false;
        this.router.navigate(['login']);
      }, 3000);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      this.formularioNuevaContrasena.markAllAsTouched();
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
    this.route.queryParams.subscribe((params) => {
      this.correo = params['correo'] || null;
    });

    // Formulario con validaciones
    this.formularioNuevaContrasena = this.fb.group(
      {
        nuevaContrasena: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(18),
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
          ],
        ],
        confirmarContrasena: ['', Validators.required],
      },
      { validators: this.validarContrasenasIguales }
    );
  }

}


