import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-comics-mangas',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './comics-mangas.component.html',
  styleUrl: './comics-mangas.component.css'
})
export class ComicsMangasComponent {
  constructor(private router: Router) {
    
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  ngOnInit() {

  }

}
