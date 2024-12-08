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
        return [];
      })
    );
  }

  crearUsuario(usuario: Partial<Usuario>): Observable<Usuario[]> {
    return this.obtenerUsuarios().pipe(
      switchMap((usuarios: Usuario[]) => {
        // Crear un nuevo objeto que cumpla estrictamente con la interfaz Usuario
        const nuevoUsuario: Usuario = {
          rol: usuario.rol || 'cliente', // Valor predeterminado si no se proporciona
          username: usuario.username!,
          contrasena: usuario.contrasena!,
          nombres: usuario.nombres!,
          apellidos: usuario.apellidos!,
          correo: usuario.correo!,
          fecha_nacimiento: usuario.fecha_nacimiento!,
          domicilio: usuario.domicilio!,
          puntos: usuario.puntos || 0, // Asigna 0 si no se proporciona
        };
  
        // Agregar el nuevo usuario al array de usuarios
        const usuariosActualizados = [...usuarios, nuevoUsuario];
  
        // Actualizar el archivo JSON en el servidor
        return this.actualizarUsuarios(usuariosActualizados);
      }),
      catchError((error) => {
        console.error('Error al crear el usuario:', error);
        return of([]); // Devuelve un arreglo vacío si ocurre un error
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

  editarUsuarioActualizado(usuarioActualizado: Usuario): Observable<any> {
    return this.obtenerUsuarios().pipe(
      switchMap((usuarios) => {
        const usuariosActualizados = usuarios.map((u) =>
          u.username === usuarioActualizado.username ? usuarioActualizado : u
        );
        return this.http.put(this.jsonUrl, usuariosActualizados, {
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
  }


  eliminarUsuario(username: string): Observable<any> {
    // Carga el archivo JSON, filtra el usuario y reescribe el archivo.
    return new Observable(observer => {
      this.obtenerUsuarios().subscribe({
        next: (usuarios) => {
          const usuariosActualizados = usuarios.filter(user => user.username !== username);
          this.http.put(this.jsonUrl, usuariosActualizados).subscribe({
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

  validarCorreo(correo: string): Observable<boolean> {
    return this.obtenerUsuarios().pipe(
      map((usuarios: Usuario[]) => usuarios.some(usuario => usuario.correo === correo)),
      catchError(error => {
        console.error('Error al validar correo', error);
        return of(false); // Devuelve `false` si hay un error
      })
    );
  }

  cambiarContrasena(correo: string, nuevaContrasena: string): Observable<any> {
    return this.obtenerUsuarios().pipe(
      switchMap((usuarios) => {
        // Buscar al usuario por correo
        const usuario = usuarios.find((u) => u.correo === correo);
        if (!usuario) {
          throw new Error('El usuario no fue encontrado');
        }
  
        // Actualizar la contraseña
        usuario.contrasena = nuevaContrasena;
  
        // Subir los usuarios actualizados al bucket S3
        return this.actualizarUsuarios(usuarios).pipe(
          map(() => true), // Devuelve `true` si todo salió bien
          catchError((err) => {
            console.error('Error al actualizar los usuarios en S3:', err);
            return of(false); // Devuelve `false` si hay un error al subir
          })
        );
      }),
      catchError((error) => {
        console.error('Error al cambiar la contraseña:', error);
        return of(false);
      })
    );
  }
}
