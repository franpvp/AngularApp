import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from "../nav/nav.component";
import { Router } from '@angular/router';
import { Libro } from '../../models/interfaces';
import { LibrosService } from '../../services/libros/libros.service';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [NavComponent, CommonModule],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent {

  libros: Libro[] = [];
  productosEnCarrito: Libro[] = [];

  constructor(private router: Router, private librosService: LibrosService){

  }

  verDetalles(libroId: number) {
    this.router.navigate(['/producto', libroId]);
  }


  agregarAlCarrito(libro: Libro): void {
    this.productosEnCarrito.push(libro);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  } 

  ngOnInit(): void {
    this.librosService.obtenerLibros().subscribe((data: Libro[]) => {
      // Filtrar los libros que tienen enPromo = true
      this.libros = data.filter(libro => libro.enPromo);
    });
  }



}
