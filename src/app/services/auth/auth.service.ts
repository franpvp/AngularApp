import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, BehaviorSubject, switchMap } from 'rxjs';

// Interfaces
import { Usuario } from '../../models/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jsonUrl = 'https://bucketangulartest.s3.us-east-1.amazonaws.com/usuarios.json';

  // private usuarios: Usuario[] = [
  //   {
  //     rol: "admin",
  //     username: "fr.valdiviap",
  //     contrasena: "Prueba123",
  //     nombres: "Francisca Patricia",
  //     apellidos: "Valdivia Palma",
  //     correo: "fr.valdiviap@gmail.com",
  //     fecha_nacimiento: "1998-03-30",
  //     domicilio: "",
  //     enEdicion: false
  //   },
  //   {
  //     rol: "cliente",
  //     username: "jperez",
  //     contrasena: "Contraseña456",
  //     nombres: "Juan",
  //     apellidos: "Pérez González",
  //     correo: "jperez@example.com",
  //     fecha_nacimiento: "1980-11-12",
  //     domicilio: "",
  //     puntos: 0,
  //     enEdicion: false
  //   },
  //   {
  //     rol: "cliente",
  //     username: "mgarcia",
  //     contrasena: "Pass789",
  //     nombres: "María",
  //     apellidos: "García López",
  //     correo: "mgarcia@example.com",
  //     fecha_nacimiento: "1993-05-12",
  //     domicilio: "",
  //     puntos: 0,
  //     enEdicion: false
  //   }
  // ];

  constructor(private http: HttpClient) { }

  // Método para obtener lista de usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.jsonUrl).pipe(
      catchError(error => {
        console.error('Error al obtener usuarios', error);
        return []; // Retorna un array vacío en caso de error
      })
    );
  }

  crearUsuario(usuario: Usuario): Observable<Usuario[]> {
    return this.obtenerUsuarios().pipe(
      // Aplanamos el Observable con switchMap
      switchMap((usuarios: Usuario[]) => {
        const usuariosActualizados = [...usuarios, usuario];
        return this.actualizarUsuarios(usuariosActualizados);
      })
    );
  }


  private actualizarUsuarios(usuarios: Usuario[]): Observable<Usuario[]> {
    return this.http.put<Usuario[]>(this.jsonUrl, usuarios).pipe(
      catchError(error => {
        console.error('Error al actualizar usuarios', error);
        return [];
      })
    );
  }

  authenticateJson(username: string, contrasena: string): Observable<Usuario | null> {
    return this.obtenerUsuarios().pipe(
      map((usuarios: Usuario[]) => {
        console.log('Usuarios obtenidos:', usuarios);
        const usuarioEncontrado = usuarios.find(
          usuario => usuario.username === username && usuario.contrasena === contrasena
        );
        if (usuarioEncontrado) {
          return usuarioEncontrado;
        }
        return null;
      }),
      catchError(error => {
        console.error('Error al autenticar usuario:', error);
        return of(null);
      })
    );
  }

  // Método para actualizar el usuario
  setUsuario(usuario: Usuario | null): void {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));  // Guarda en localStorage
    } else {
      localStorage.removeItem("usuario");  // Elimina el usuario de localStorage
    } // Emite el nuevo estado del usuario
  }

  // validarCorreo(correo: string): Observable<boolean> {
  //   const existeCorreo = this.usuarios.some((usuario) => usuario.correo === correo);
  //   return of(existeCorreo);
  // }
}
