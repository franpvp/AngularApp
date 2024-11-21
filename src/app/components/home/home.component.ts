import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  username: string | null = null;
  // Crear variable para llamar en el componente Home
  libros: Libro[] = [];
  productosEnCarrito: Libro[] = [];
  encuestaVisible: boolean = false;
  intentosActuales: number = 0;

  constructor(private router: Router, private librosService: LibrosService, private renderer: Renderer2, private el: ElementRef ) {
    
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

    this.librosService.obtenerLibros().subscribe(libros => {
      this.libros = libros;
    });

    // 
    // if(!this.encuestaVisible) {
    //   this.encuestaVisible = true;
    //   localStorage.setItem("encuesta", JSON.stringify(this.encuestaVisible));
    // } else {
    //   console.log("Ya se ha mostrado la encuesta");
    // }

  }
}
