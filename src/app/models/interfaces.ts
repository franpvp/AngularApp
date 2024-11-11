export interface Usuario {
    rol: string;
    username: string;
    contrasena: string;
    nombres: string;
    apellidos: string;
    correo: string;
    fecha_nacimiento: string;
    domicilio: string;
    puntos?: number;
}

export interface Juego {
    id: number;
    titulo: string;
    precio: number;
    descripcion: string;
    especificaciones: {
        formato: string;
        condicion: string;
        idioma: string;
        cant_jugadores: string;
        edad?: string;
        tiempo?: string;
    };
    stock: number;
    imagen: string
}