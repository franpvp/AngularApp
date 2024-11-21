import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Servicios
import { JuegosService } from '../../services/juegos/juegos.service';
import { LibrosService } from '../../services/libros/libros.service';
import { Juego } from '../../models/interfaces';
import { Libro } from '../../models/interfaces';

@Component({
  selector: 'app-detalle-carro',
  standalone: true,
  imports: [CommonModule, NavComponent, FormsModule],
  templateUrl: './detalle-carro.component.html',
  styleUrl: './detalle-carro.component.css'
})
export class DetalleCarroComponent {

  libro: Libro | undefined;
  productosEnCarrito: Libro[] = [];

  constructor(private route: ActivatedRoute, private librosService: LibrosService) {
  }

  agregarAlCarrito(libro: Libro): void {
    this.productosEnCarrito.push(libro);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.librosService.obtenerLibroPorId(id).subscribe((libro) => {
      this.libro = libro;
  });

  const carritoData = localStorage.getItem('productosEnCarrito');
  this.productosEnCarrito = carritoData ? JSON.parse(carritoData) : [];

  }
}
