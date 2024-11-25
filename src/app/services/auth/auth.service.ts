import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// Interfaces
import { Usuario } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarios: Usuario[] = [
    {
      rol: "admin",
      username: "fr.valdiviap",
      contrasena: "Prueba123",
      nombres: "Francisca Patricia",
      apellidos: "Valdivia Palma",
      correo: "fr.valdiviap@gmail.com",
      fecha_nacimiento: "1998-03-30",
      domicilio: "",
      enEdicion: false
    },
    {
      rol: "cliente",
      username: "jperez",
      contrasena: "Contraseña456",
      nombres: "Juan",
      apellidos: "Pérez González",
      correo: "jperez@example.com",
      fecha_nacimiento: "1980-11-12",
      domicilio: "",
      puntos: 0,
      enEdicion: false
    },
    {
      rol: "cliente",
      username: "mgarcia",
      contrasena: "Pass789",
      nombres: "María",
      apellidos: "García López",
      correo: "mgarcia@example.com",
      fecha_nacimiento: "1993-05-12",
      domicilio: "",
      puntos: 0,
      enEdicion: false
    }
  ];

  constructor() { }

  authenticate(username: string, password: string): Observable<Usuario | null> {
    const user = this.usuarios.find(u => u.username === username && u.contrasena === password);
    return of(user ? user : null);
  }

  // Método para obtener lista de usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return of(this.usuarios);
  }

  actualizarUsuario(usuarioActualizado: Usuario): Observable<boolean> {
    const index = this.usuarios.findIndex(u => u.username === usuarioActualizado.username);
  
    if (index !== -1) {
      // Actualiza los datos del usuario sin perder las credenciales
      this.usuarios[index] = { ...this.usuarios[index], ...usuarioActualizado };
      return of(true);
    }
  
    return of(false);
  }

  validarCorreo(correo: string): Observable<boolean> {
    const existeCorreo = this.usuarios.some((usuario) => usuario.correo === correo);
    return of(existeCorreo);
  }
}
