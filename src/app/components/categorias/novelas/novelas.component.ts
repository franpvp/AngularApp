import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";

@Component({
  selector: 'app-novelas',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './novelas.component.html',
  styleUrl: './novelas.component.css'
})
export class NovelasComponent {
  constructor() {

  }

  ngOnInit() {
    
  }
}
