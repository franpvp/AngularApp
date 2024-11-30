import { Injectable } from '@angular/core';
import { Libro } from '../../models/interfaces';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LibrosService {

    private jsonUrl = 'https://bucketangulartest.s3.us-east-1.amazonaws.com/libros.json';

    constructor(private http: HttpClient) { }

    // obtenerLibros(): Observable<Libro[]> {
    //     return of(this.libros);
    // }

    // Obtener desde AWS S3
    obtenerLibrosJson(): Observable<Libro[]> {
        return this.http.get<{ libros: Libro[] }>(this.jsonUrl)
        .pipe(map(response => response.libros));
    }

    obtenerLibroPorId(id: number): Observable<Libro | undefined> {
        return this.obtenerLibrosJson().pipe(
            map(libros => libros.find(libro => libro.id === id))
        );
    }


}
