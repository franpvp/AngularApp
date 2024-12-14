import { Injectable } from '@angular/core';
import { Libro } from '../../models/interfaces';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  /**
   * @property jsonUrl
   * @description URL donde se encuentra el archivo JSON con la información de los libros.
   */
  private jsonUrl = 'https://bucketangulartest.s3.us-east-1.amazonaws.com/libros.json';

  /**
   * @constructor
   * @description Constructor del servicio. Inicializa el servicio HttpClient.
   * @param {HttpClient} http Servicio para hacer peticiones HTTP.
   */
  constructor(private http: HttpClient) { }

  /**
   * @method obtenerLibros
   * @description Método para obtener la lista de libros desde el archivo JSON en AWS S3.
   * @returns {Observable<Libro[]>} Devuelve un observable con la lista de libros.
   */
  obtenerLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.jsonUrl).pipe(
      catchError(error => {
        console.error('Error al obtener libros', error);
        return of([]);
      })
    );
  }

  /**
   * @method crearLibro
   * @description Método para crear un nuevo libro y agregarlo a la lista.
   * @param {Partial<Libro>} libro Datos del nuevo libro a crear.
   * @returns {Observable<Libro[]>} Devuelve un observable con la lista actualizada de libros.
   */
  crearLibro(libro: Partial<Libro>): Observable<Libro[]> {
    return this.obtenerLibros().pipe(
      switchMap((libros: Libro[]) => {
        const nuevoId = libros.length > 0 ? Math.max(...libros.map(lib => lib.id)) + 1 : 1;
        const nuevoLibro: Libro = {
          id: nuevoId,
          titulo: libro.titulo!,
          autor: libro.autor!,
          editorial: libro.editorial!,
          precio: libro.precio!,
          resena: libro.resena || '',
          especificaciones: {
            categoria: libro.especificaciones?.categoria || '',
            sub_categoria: libro.especificaciones?.sub_categoria || '',
            idioma: libro.especificaciones?.idioma || '',
            formato: libro.especificaciones?.formato || '',
            paginas: libro.especificaciones?.paginas || 0
          },
          stock: libro.stock || 0,
          imagen: libro.imagen || '',
          enPromo: libro.enPromo || false
        };

        const librosActualizados = [...libros, nuevoLibro];
        return this.actualizarLibros(librosActualizados);
      }),
      catchError((error) => {
        console.error('Error al crear el libro:', error);
        return throwError(error);
      })
    );
  }

  /**
   * @method actualizarLibros
   * @description Método para actualizar la lista de libros en el backend o S3 simulado.
   * @param {Libro[]} libros Lista actualizada de libros.
   * @returns {Observable<Libro[]>} Devuelve un observable con la lista de libros actualizada.
   */
  private actualizarLibros(libros: Libro[]): Observable<Libro[]> {
    return this.http.put<Libro[]>(this.jsonUrl, libros).pipe(
      catchError(error => {
        console.error('Error al actualizar libros', error);
        return [];
      })
    );
  }

  /**
   * @method obtenerLibroPorId
   * @description Método para obtener un libro específico por su ID.
   * @param {number} id ID del libro que se desea obtener.
   * @returns {Observable<Libro | undefined>} Devuelve un observable con el libro correspondiente o undefined si no se encuentra.
   */
  obtenerLibroPorId(id: number): Observable<Libro | undefined> {
    return this.obtenerLibros().pipe(
      map(libros => libros.find(libro => libro.id === id))
    );
  }

  /**
   * @method editarLibroActualizado
   * @description Método para editar un libro existente en la lista.
   * @param {Libro} libroActualizado El libro con los cambios.
   * @returns {Observable<any>} Devuelve un observable con el resultado de la actualización.
   */
  editarLibroActualizado(libroActualizado: Libro): Observable<any> {
    return this.obtenerLibros().pipe(
      switchMap((libros) => {
        const librosActualizados = libros.map((libro) =>
          libro.id === libroActualizado.id ? libroActualizado : libro
        );
        return this.http.put(this.jsonUrl, librosActualizados, {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
  }

  /**
   * @method eliminarLibro
   * @description Método para eliminar un libro de la lista.
   * @param {number} id ID del libro a eliminar.
   * @returns {Observable<any>} Devuelve un observable con el resultado de la eliminación.
   */
  eliminarLibro(id: number): Observable<any> {
    return new Observable(observer => {
      this.obtenerLibros().subscribe({
        next: (libros) => {
          const librosActualizados = libros.filter(libro => libro.id !== id);
          this.http.put(this.jsonUrl, librosActualizados).subscribe({
            next: () => {
              observer.next();
              observer.complete();
            },
            error: (err) => observer.error(err)
          });
        },
        error: (err) => observer.error(err)
      });
    });
  }
}