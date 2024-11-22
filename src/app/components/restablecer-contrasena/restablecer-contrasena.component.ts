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

  formularioNuevaContrasena: FormGroup;
  correo: string | null = null;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.formularioNuevaContrasena = this.fb.group({
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]],
    });
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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.correo = params['correo'] || null;
    });
  }

}
