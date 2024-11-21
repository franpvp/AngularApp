import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auto-ayuda',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './auto-ayuda.component.html',
  styleUrl: './auto-ayuda.component.css'
})
export class AutoAyudaComponent {
  constructor(private router: Router) {

  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    
  }
}
