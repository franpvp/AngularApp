import { Component } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Servicios
import { JuegosService } from '../../services/juegos/juegos.service';
import { Juego } from '../../models/interfaces';

@Component({
  selector: 'app-detalle-carro',
  standalone: true,
  imports: [CommonModule, NavComponent, FormsModule],
  templateUrl: './detalle-carro.component.html',
  styleUrl: './detalle-carro.component.css'
})
export class DetalleCarroComponent {

  juego: Juego | undefined;
  productosEnCarrito: Juego[] = [];

  constructor(private route: ActivatedRoute, private juegosService: JuegosService) {
  }

  agregarAlCarrito(juego: Juego): void {
    this.productosEnCarrito.push(juego);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.juegosService.obtenerJuegoPorId(id).subscribe((juego) => {
      this.juego = juego;
  });

  const carritoData = localStorage.getItem('productosEnCarrito');
  this.productosEnCarrito = carritoData ? JSON.parse(carritoData) : [];

  }
}
