import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  contrasena: string = '';
  edad: number = 25;
  listaElementos: string[] = ['Elemento 1', 'Elemento 2'];

  constructor(private router: Router) {}

  goToHome(): void {
    console.log("hola: " + this.username);
    let navigationExtras: NavigationExtras = {
      state: {
        usernameEnviado: this.username,
        contrasenaEnviada: this.contrasena
      }
    }

    this.router.navigate(['home'], navigationExtras);
  }

}
