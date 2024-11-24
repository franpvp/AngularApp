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

  formularioNuevaContrasena!: FormGroup;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    
  }

  submitForm(): void {
    const nuevaContrasena = this.formularioNuevaContrasena.get(
      'nuevaContrasena'
    )?.value;
    const confirmarContrasena = this.formularioNuevaContrasena.get(
      'confirmarContrasena'
    )?.value;

    if (nuevaContrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Lógica para guardar la nueva contraseña
    alert(`Contraseña restablecida para ${this.correo}`);
    this.router.navigate(['/login']); // Redirige al login
  }

  validarCampo(campo: string): boolean {
    return !!this.formularioNuevaContrasena.get(campo)?.invalid && 
        (this.formularioNuevaContrasena.get(campo)?.touched || false);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.correo = params['correo'] || null;
    });

    this.formularioNuevaContrasena = this.fb.group({
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmarContrasena: ['', [Validators.required]],
    });
  }

}
