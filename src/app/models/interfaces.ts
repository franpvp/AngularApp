interface Usuario {
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

interface Juego {
    id: number;
    titulo: string;
    precio: number;
    resena: string;
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