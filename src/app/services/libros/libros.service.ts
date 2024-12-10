import { Injectable } from '@angular/core';
import { Libro } from '../../models/interfaces';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LibrosService {

    private jsonUrl = 'https://bucketangulartest.s3.us-east-1.amazonaws.com/libros.json';

    constructor(private http: HttpClient) { }

    // Obtener desde AWS S3
    obtenerLibros(): Observable<Libro[]> {
        return this.http.get<Libro[]>(this.jsonUrl).pipe(
          catchError(error => {
            console.error('Error al obtener libros', error);
            return of([]);
          })
        );
      }

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

    private actualizarLibros(libros: Libro[]): Observable<Libro[]> {
      return this.http.put<Libro[]>(this.jsonUrl, libros).pipe(
        catchError(error => {
          console.error('Error al actualizar libros', error);
          return [];
        })
      );
    }

    obtenerLibroPorId(id: number): Observable<Libro | undefined> {
        return this.obtenerLibros().pipe(
            map(libros => libros.find(libro => libro.id === id))
        );
    }

    // Método para actualizar los libros en el backend (o S3 simulado)
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
