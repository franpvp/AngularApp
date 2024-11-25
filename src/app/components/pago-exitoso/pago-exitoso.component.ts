import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { Router } from 'express';

@Component({
  selector: 'app-pago-exitoso',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './pago-exitoso.component.html',
  styleUrl: './pago-exitoso.component.css'
})
export class PagoExitosoComponent {

  constructor(private router: Router) {

  }
}
