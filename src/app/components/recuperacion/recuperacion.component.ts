import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {
  constructor(private router: Router) {

  }

  ngOnInit() {

  }
}
