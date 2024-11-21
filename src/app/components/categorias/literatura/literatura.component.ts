import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";

@Component({
  selector: 'app-literatura',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './literatura.component.html',
  styleUrl: './literatura.component.css'
})
export class LiteraturaComponent {
  constructor(private router: Router) {
    
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  ngOnInit() {

  }
}
