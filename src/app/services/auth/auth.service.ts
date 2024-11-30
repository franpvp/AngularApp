import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, BehaviorSubject } from 'rxjs';

// Interfaces
import { Usuario } from '../../models/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jsonUrl = 'https://bucketangulartest.s3.us-east-1.amazonaws.com/usuarios.json';

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);

  usuario$: Observable<Usuario | null> = this.usuarioSubject.asObservable();

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

  // authenticate(username: string, password: string): Observable<Usuario | null> {
  //   const user = this.usuarios.find(u => u.username === username && u.contrasena === password);
  //   return of(user ? user : null);
  // }

  // Método para obtener lista de usuarios
  obtenerUsuariosJson(): Observable<Usuario[]> {
    return this.http.get<{ usuarios: Usuario[] }>(this.jsonUrl).pipe(
      map(response => response.usuarios || []), // <- Añade || [] para evitar undefined
      catchError(error => {
        console.error('Error al cargar usuarios:', error);
        return of([]);
      })
    );
  }

  authenticateJson(username: string, contrasena: string): Observable<Usuario | null> {
    return this.obtenerUsuariosJson().pipe(
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
    }
    this.usuarioSubject.next(usuario);  // Emite el nuevo estado del usuario
  }

  getUsuario(): Usuario | null {
    console.log("Datos de getUsuario()", this.usuarioSubject.getValue())
    return this.usuarioSubject.getValue();
  }

  // Método para limpiar el usuario (logout)
  limpiarUsuario(): void {
    this.usuarioSubject.next(null);
  }

  // actualizarUsuario(usuarioActualizado: Usuario): Observable<boolean> {
  //   const index = this.usuarios.findIndex(u => u.username === usuarioActualizado.username);
  
  //   if (index !== -1) {
  //     // Actualiza los datos del usuario sin perder las credenciales
  //     this.usuarios[index] = { ...this.usuarios[index], ...usuarioActualizado };
  //     return of(true);
  //   }
  
  //   return of(false);
  // }

  // validarCorreo(correo: string): Observable<boolean> {
  //   const existeCorreo = this.usuarios.some((usuario) => usuario.correo === correo);
  //   return of(existeCorreo);
  // }
}
