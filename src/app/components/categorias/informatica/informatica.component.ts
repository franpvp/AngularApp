import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-informatica',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './informatica.component.html',
  styleUrl: './informatica.component.css'
})
export class InformaticaComponent {
  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['home']);
  }
}
