import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usernameEnviado: string = '';
  contrasenaEnviada: string = '';


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(param => {
      if(this.router.getCurrentNavigation()?.extras.state) {
        this.usernameEnviado = this.router.getCurrentNavigation()?.extras?.state?.['usernameEnviado'];
        this.contrasenaEnviada = this.router.getCurrentNavigation()?.extras?.state?.['contrasenaEnviada'];
      }
    })

  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  goToLogin():void {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {

  }
}
