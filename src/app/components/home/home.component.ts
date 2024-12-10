import { Component, ElementRef, LOCALE_ID, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Librerias para formateo de precios
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';

// Injección de Servicios
import { LibrosService } from '../../services/libros/libros.service';
import { AuthService } from '../../services/auth/auth.service';

// Interfaces
import { Libro } from '../../models/interfaces';

// Componentes
import { NavComponent } from "../nav/nav.component";
import { EncuestaComponent } from "../encuesta/encuesta.component";
import { CarritoService } from '../../services/carrito/carrito.service';

registerLocaleData(localeEsCL, 'es-CL');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, EncuestaComponent, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    LibrosService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
export class HomeComponent {

  username: string | null = null;
  // Crear variable para llamar en el componente Home
  libros: Libro[] = [];
  librosJson: Libro[] = [];
  productosEnCarrito: Libro[] = [];
  encuestaVisible: boolean = false;
  intentosActuales: number = 0;
  totalCarrito: number = 0;

  constructor(private router: Router, private librosService: LibrosService, private carritoService: CarritoService) {
    
  }

  // agregarAlCarrito(libro: Libro): void {
  //   this.productosEnCarrito.push(libro);
  //   localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  // } 

  agregarAlCarrito(libro: Libro): void {
    this.carritoService.agregarAlCarrito(libro);
  }

  calcularTotal(): number {
    return this.productosEnCarrito ? this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0) : 0;
  }

  goToPerfil(): void {
    this.router.navigate(['perfil']);
  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  goToLogin():void {
    this.router.navigate(['login']);
  }

  goToContacto(): void {
    this.router.navigate(['contacto']);
  }


  verDetalles(libroId: number) {
    this.router.navigate(['/producto', libroId]);
  }

  cerrarSesion(): void {
    this.username = null;
    this.router.navigate(['home']);
    localStorage.removeItem('username')
  }


  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    this.librosService.obtenerLibros().subscribe(
      (data) => {
        this.librosJson = data;
        console.log(this.librosJson);
      },
      (error: any) => {
        console.error('Error al cargar los datos', error);
      }
    );
  }

  
}
