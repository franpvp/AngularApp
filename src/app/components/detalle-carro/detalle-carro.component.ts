import { Component, LOCALE_ID } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Servicios
import { LibrosService } from '../../services/libros/libros.service';
import { Libro } from '../../models/interfaces';
import { HttpClientModule } from '@angular/common/http';

/**
 * @description
 * Componente para mostrar los detalles de un libro y agregarlo al carrito de compras.
 */
@Component({
  selector: 'app-detalle-carro',
  standalone: true,
  imports: [CommonModule, NavComponent, FormsModule, HttpClientModule],
  templateUrl: './detalle-carro.component.html',
  styleUrl: './detalle-carro.component.css',
  providers: [
    LibrosService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
})
export class DetalleCarroComponent {

  /**
   * @description
   * Objeto que representa el libro seleccionado para mostrar sus detalles.
   */
  libro: Libro | undefined;

  /**
   * @description
   * Lista de productos (libros) que el usuario ha agregado al carrito.
   */
  productosEnCarrito: Libro[] = [];

  /**
   * @constructor
   * Constructor del componente DetalleCarroComponent.
   * @param route Instancia de ActivatedRoute para acceder a los parámetros de la URL.
   * @param librosService Servicio para obtener los detalles de los libros.
   */
  constructor(private route: ActivatedRoute, private librosService: LibrosService) { }

  /**
   * @method
   * Método para agregar un libro al carrito de compras.
   * @param libro El libro que se va a agregar al carrito.
   * @description
   * Este método agrega el libro seleccionado al carrito de compras y actualiza el localStorage.
   */
  agregarAlCarrito(libro: Libro): void {
    this.productosEnCarrito.push(libro);
    localStorage.setItem('productosEnCarrito', JSON.stringify(this.productosEnCarrito));
  }

  /**
   * @method
   * Método que se ejecuta cuando el componente es inicializado.
   * @description
   * Este método obtiene el ID del libro desde la ruta, luego llama al servicio `librosService`
   * para obtener los detalles del libro y asignarlos a la propiedad `libro`.
   * Además, carga los productos del carrito desde el localStorage.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.librosService.obtenerLibroPorId(id).subscribe((libro) => {
      this.libro = libro;
    });

    const carritoData = localStorage.getItem('productosEnCarrito');
    this.productosEnCarrito = carritoData ? JSON.parse(carritoData) : [];
  }
}