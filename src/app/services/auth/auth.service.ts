import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, BehaviorSubject, switchMap } from 'rxjs';

// Interfaces
import { Usuario } from '../../models/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * URL del archivo JSON que contiene la lista de usuarios.
   * Puede ser reemplazada por una API o base de datos.
   */
  private jsonUrl = 'https://bucketangulartest.s3.us-east-1.amazonaws.com/usuarios.json';
  
  constructor(private http: HttpClient) { }

  /**
   * @method obtenerUsuarios 
   * @description Obtiene la lista completa de usuarios desde el archivo JSON.
   * @returns Observable con un arreglo de usuarios.
   */
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.jsonUrl).pipe(
      catchError(error => {
        console.error('Error al obtener usuarios', error);
        return [];
      })
    );
  }

  /**
   * @method crearUsuario 
   * @description Crea un nuevo usuario y lo guarda en el archivo JSON.
   * @param usuario Datos del nuevo usuario.
   * @returns Observable con la lista actualizada de usuarios.
   */
  crearUsuario(usuario: Partial<Usuario>): Observable<Usuario[]> {
    return this.obtenerUsuarios().pipe(
      switchMap((usuarios: Usuario[]) => {
        const nuevoUsuario: Usuario = {
          rol: usuario.rol || 'cliente',
          username: usuario.username!,
          contrasena: usuario.contrasena!,
          nombres: usuario.nombres!,
          apellidos: usuario.apellidos!,
          correo: usuario.correo!,
          fecha_nacimiento: usuario.fecha_nacimiento!,
          domicilio: usuario.domicilio!,
          puntos: usuario.puntos || 0,
        };

        const usuariosActualizados = [...usuarios, nuevoUsuario];
        return this.actualizarUsuarios(usuariosActualizados);
      }),
      catchError(error => {
        console.error('Error al crear el usuario:', error);
        return of([]);
      })
    );
  }

  /**
   * @method actualizarUsuarios 
   * @description Actualiza la lista de usuarios en el archivo JSON.
   * @param usuarios Lista actualizada de usuarios.
   * @returns Observable con la lista actualizada de usuarios.
   */
  private actualizarUsuarios(usuarios: Usuario[]): Observable<Usuario[]> {
    return this.http.put<Usuario[]>(this.jsonUrl, usuarios).pipe(
      catchError(error => {
        console.error('Error al actualizar usuarios', error);
        return [];
      })
    );
  }

  /**
   * @method editarUsuarioActualizado 
   * @description Actualiza los datos de un usuario específico.
   * @param usuarioActualizado Datos actualizados del usuario.
   * @returns Observable indicando el éxito de la operación.
   */
  editarUsuarioActualizado(usuarioActualizado: Usuario): Observable<any> {
    return this.obtenerUsuarios().pipe(
      switchMap(usuarios => {
        const usuariosActualizados = usuarios.map(u => 
          u.username === usuarioActualizado.username ? usuarioActualizado : u
        );
        return this.http.put(this.jsonUrl, usuariosActualizados, {
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );
  }

  /**
   * @method eliminarUsuario 
   * @description Elimina un usuario por su username.
   * @param username Identificador único del usuario.
   * @returns Observable indicando el éxito de la operación.
   */
  eliminarUsuario(username: string): Observable<any> {
    return new Observable(observer => {
      this.obtenerUsuarios().subscribe({
        next: usuarios => {
          const usuariosActualizados = usuarios.filter(user => user.username !== username);
          this.http.put(this.jsonUrl, usuariosActualizados).subscribe({
            next: () => {
              observer.next();
              observer.complete();
            },
            error: err => observer.error(err),
          });
        },
        error: err => observer.error(err),
      });
    });
  }

  /**
   * @method authenticateJson 
   * @description Autentica a un usuario con su username y contraseña.
   * @param username Nombre de usuario.
   * @param contrasena Contraseña del usuario.
   * @returns Observable con el usuario autenticado o `null` si no existe.
   */
  authenticateJson(username: string, contrasena: string): Observable<Usuario | null> {
    return this.obtenerUsuarios().pipe(
      map(usuarios => usuarios.find(usuario => 
        usuario.username === username && usuario.contrasena === contrasena) || null
      ),
      catchError(error => {
        console.error('Error al autenticar usuario:', error);
        return of(null);
      })
    );
  }

  /**
   * @method getUsuarioLogeado 
   * @description Busca un usuario específico por su username.
   * @param username Identificador único del usuario.
   * @returns Observable con el usuario encontrado o `undefined` si no existe.
   */
  getUsuarioLogeado(username: string): Observable<Usuario | undefined> {
    return this.obtenerUsuarios().pipe(
      map(usuarios => usuarios.find(usuario => usuario.username === username))
    );
  }

  /**
   * @method setUsuario 
   * @description Almacena el usuario logeado en localStorage.
   * @param usuario Usuario a guardar o `null` para eliminarlo.
   */
  setUsuario(usuario: Usuario | null): void {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }

  /**
   * @method validarCorreo 
   * @description Valida si un correo electrónico ya está registrado.
   * @param correo Correo a validar.
   * @returns Observable con un valor booleano indicando si el correo ya existe.
   */
  validarCorreo(correo: string): Observable<boolean> {
    return this.obtenerUsuarios().pipe(
      map(usuarios => usuarios.some(usuario => usuario.correo === correo)),
      catchError(error => {
        console.error('Error al validar correo', error);
        return of(false);
      })
    );
  }

  /**
   * @method cambiarContrasena 
   * @description Cambia la contraseña de un usuario identificado por su correo.
   * @param correo Correo del usuario.
   * @param nuevaContrasena Nueva contraseña.
   * @returns Observable indicando el éxito de la operación.
   */
  cambiarContrasena(correo: string, nuevaContrasena: string): Observable<any> {
    return this.obtenerUsuarios().pipe(
      switchMap(usuarios => {
        const usuario = usuarios.find(u => u.correo === correo);
        if (!usuario) {
          throw new Error('El usuario no fue encontrado');
        }
        usuario.contrasena = nuevaContrasena;
        return this.actualizarUsuarios(usuarios).pipe(
          map(() => true),
          catchError(err => {
            console.error('Error al actualizar los usuarios en S3:', err);
            return of(false);
          })
        );
      }),
      catchError(error => {
        console.error('Error al cambiar la contraseña:', error);
        return of(false);
      })
    );
  }
}