import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Injección de Servicios
import { LibrosService } from '../../services/libros/libros.service';
import { AuthService } from '../../services/auth/auth.service';

// Interfaces
import { Libro } from '../../models/interfaces';

// Componentes
import { NavComponent } from "../nav/nav.component";
import { EncuestaComponent } from "../encuesta/encuesta.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, EncuestaComponent, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    LibrosService,
    AuthService
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

  constructor(private router: Router, private librosService: LibrosService) {
    
  }

  agregarAlCarrito(libro: Libro): void {
    this.productosEnCarrito.push(libro);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
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

  // Enlaces Categorías
  goToCateAutoAyuda(): void {
    this.router.navigate(['auto-ayuda']);
  }

  goToCateNovelas(): void {
    this.router.navigate(['novelas']);
  }

  goToCateLiteratura(): void {
    this.router.navigate(['literatura']);
  }

  goToCateComicsMangas(): void {
    this.router.navigate(['comics-mangas']);
  }

  goToCateInformatica(): void {
    this.router.navigate(['informatica']);
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

    // this.librosService.obtenerLibros().subscribe(libros => {
    //   this.libros = libros;
    // });

    this.librosService.obtenerLibrosJson().subscribe(
      (data) => {
        this.librosJson = data;
        console.log(this.librosJson);
      },
      (error) => {
        console.error('Error al cargar los datos', error);
      }
    );
  }
}
