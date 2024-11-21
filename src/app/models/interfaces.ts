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

export interface Libro {
    id: number;
    titulo: string;
    autor: string;
    editorial: string;
    precio: number;
    resena: string;
    especificaciones: {
        categoria: string;
        sub_categoria: string;
        idioma: string;
        formato: string;
        paginas: number;
    };
    stock: number;
    imagen: string
}