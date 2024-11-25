import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "../../nav/nav.component";
import { Router } from '@angular/router';
import { Libro } from '../../../models/interfaces';
import { LibrosService } from '../../../services/libros/libros.service';

@Component({
  selector: 'app-novelas',
  standalone: true,
  imports: [NavComponent, CommonModule, FormsModule],
  templateUrl: './novelas.component.html',
  styleUrl: './novelas.component.css'
})
export class NovelasComponent {
  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];
  categoriaSeleccionada: string = 'Novela';

  productosEnCarrito: Libro[] = [];

  constructor(private router: Router, private librosService: LibrosService) {

  }

  goToHome(): void {
    this.router.navigate(['home']);
  }

  filtrarPorCategoria(categoria: string): void {
    this.librosFiltrados = this.libros.filter(
      (libro) => libro.especificaciones.categoria === categoria
    );
  }

  agregarAlCarrito(libro: Libro): void {
    this.productosEnCarrito.push(libro);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  } 

  calcularTotal(): number {
    return this.productosEnCarrito ? this.productosEnCarrito.reduce((acc, prod) => acc + prod.precio, 0) : 0;
  }

  verDetalles(libroId: number) {
    this.router.navigate(['/producto', libroId]);
  }

  ngOnInit() {
    this.librosService.obtenerLibros().subscribe((libros) => {
      this.libros = libros;
      this.filtrarPorCategoria(this.categoriaSeleccionada);
    })
  }
}
