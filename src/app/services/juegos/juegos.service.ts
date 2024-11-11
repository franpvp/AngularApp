import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Juego } from '../../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class JuegosService {
    private juegos: Juego[] = [
        {
            "id": 1,
            "titulo": "Cyberpunk 2077: Bandas de Night City - Juego de Mesa",
            "precio": 94990,
            "descripcion": "The Dursleys were so mean and hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature named Dobby who says that if Harry Potter returns to Hogwarts, disaster will strike.And strike it does. For in Harry's second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockhart, a spirit named Moaning Myrtle who haunts the girls' bathroom, and the unwanted attentions of Ron Weasley's younger sister, Ginny.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "tiempo": "90-120 min"
            },
            "stock": 10,
            "imagen": "/assets/img/games/cyberpunk-2077-bandas-de-night-city.jpg"
        },
        {
            "id": 2,
            "titulo": "Cortex Challenge Harry Potter",
            "precio": 15990,
            "descripcion": "¡Desafía a tu cerebro con un divertido juego que pondrá a prueba tu razonamiento, memoria y rapidez!",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2-6",
                "tiempo": "40 min"
            },
            "stock": 15,
            "imagen": "/assets/img/games/cortex-challenge-harry-potter-promo-3x2.jpg"
        },
        {
            "id": 3,
            "titulo": "Dixit",
            "precio": 24990,
            "descripcion": `¡Dixit es un creativo juego de deducción, bellamente ilustrado, donde tu imaginación crea increíbles historias! En este galardonado juego de mesa, los jugadores podrán utilizar la hermosa imaginería de sus cartas para engañar a sus rivales y adivinar cuál es la carta que mejor se adapta a la historia. Dixit es un juego sorprendente, encantador y de reglas fáciles, para disfrutar con amigos y familiares por igual. 

                            ¿Cómo se juega? En tu turno, como narrador, elige una carta de tu mano y da una pista sobre ella (palabras, frases, canciones, etc.). 

                            Por ejemplo: “Viaje”. Todos los jugadores eligen de entre sus cartas, la que mejor se adapte a la pista. Baraja y revela todas las cartas elegidas. Todos los jugadores, en secreto, intentan adivinar tu carta, utilizando las fichas de voto. Una vez que todos hayan votado, 

                            ¡Comienza la ronda de puntuación! 

                            CONTENIDO 84 cartas, 8 diales de votación, 8 conejos de madera y un tablero de puntuación con espacio para 8 cartas y una ayuda de juego sobre la puntuación.`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "3-8",
                "edad": "",

            },
            "stock": 20,
            "imagen": "/assets/img/games/dixit.jpg"
        },
        {
            "id": 4,
            "titulo": "Dobble",
            "precio": 11990,
            "descripcion": `Dobble un juego con más de 50 símbolos, 55 cartas, con uno, y solamente un símbolo idéntico entre cada carta. ¿Serás capaz de descubrirlo?

                            Si nunca habéis jugado a Dobble, coge dos cartas al azar y ponlas boca arriba sobre la mesa a la vista de todos los jugadores. Buscad el símbolo idéntico en las dos cartas (misma forma y mismo color, sólo el tamaño puede variar). El primer jugador que encuentre este símbolo, lo nombra y roba dos nuevas cartas que pondrá sobre la mesa. Repetid esta operación hasta que todos los jugadores hayan entendido que siempre hay solamente un símbolo idéntico entre dos cartas

                            ¡Y ya está! sencillo, ¿verdad? Pues ahora prepárate, porque Dobble contiene varios mini-juegos, cada cual más divertido e hilarante, aunque el objetivo siempre es el mismo: ser el más rápido, ya que todos los jugadores juegan a la vez.`,
            "especificaciones": {
                "formato": "Juego Físico",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2-8",
                "edad": "10+",
                "tiempo": "15 min"
            },
            "stock": 10,
            "imagen": "/assets/img/games/dobble.jpg"
        },
        {
            "id": 5,
            "titulo": "Pathfinder: El Juego de Cartas de Aventuras",
            "precio": 42990,
            "descripcion": ``,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "13+",
                "tiempo": "90 min aprox"
            },
            "stock": 5,
            "imagen": "/assets/img/games/pathfinder-el-juego-de-cartas-de-aventuras.jpg"
        },
        {
            "id": 6,
            "titulo": "Guerra Del Anillo - Juego De Mesa",
            "precio": 79990,
            "descripcion": `Guerra del Anillo se publicó originalmente en 2004 y rápidamente se convirtió en un clásico en todo el mundo, recibiendo las mejores críticas de toda la comunidad de jugadores. Esta edición ha sido mejorada y revisada por sus autores originales, Roberto Di Meglio, Marco Maggi y Francesco Nepitello.

                            En Guerra del Anillo cuatro jugadores podrán sumergirse en el mundo de El Señor de los Anillos, de J.R.R. Tolkien y experimentar su acción épica, sus dramáticos conflictos y sus personajes memorables. El juego se basa en que 2 jugadores encarnarán las fuerzas de los Pueblos Libres de Gondor y los Elfos, el otro jugador tendrá Rohan, el Norte y los Enanos. Los dos jugadores oponentes encarnarán las fuerzas del mal, uno será el Rey Brujo y el otro tendrá el dominio de Saruman y las fuerzas del Este y el Sur.

                            Los jugadores de los Pueblos Libres defenderán la Comunidad del Anillo hasta que llegue al Monte del Destino y así ganar el juego; las fuerzas del mal deben interceptar a la Comunidad del Anillo y así ganarán el juego. Por lo tanto, la eficiencia táctica y estratégica es vital. Los fanáticos del Señor de los Anillos y de los wargames serán los más afortunados en tener esta joya debido a que trae más de 200 figuras de distintas unidades.

                            Se recomienda para personas que tengan mucha experiencia en juegos de mesa de Devir.`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2-4",
                "edad": "13+",
                "tiempo": "120-180 minutos"
            },
            "stock": 5,
            "imagen": "/assets/img/games/guerra-del-anillo-juego-de-mesa.jpg"
        },
        {
            "id": 7,
            "titulo": "Sushi Dice",
            "precio": 15990,
            "descripcion": `Sólo los más rápidos y meticulosos cocineros se unirán a la prestigiosa élite de chefs de sushi. Para formar parte de este selecto grupo, debes lanzar los dados y preparar platos de sushi más rápido que tus oponentes y además, señalar hasta el más mínimo error de tus adversarios.`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2-6",
                "edad": ""
            },
            "stock": 10,
            "imagen": "/assets/img/games/sushi-dice-juego-de-mesa.jpg"
        },
        {
            "id": 8,
            "titulo": "Gloomhaven",
            "precio": 119990,
            "descripcion": `¡Bienvenidos a Gloomhaven!

                            Ser un mercenario en la frontera de la civilización no es nada fácil. A aquellos lo suficientemente estúpidos o valientes como para dejar la relativa seguridad de los muros de Gloomhaven, la aventura, la riqueza y la fama les esperan en los bosques salvajes y sombríos, las cuevas nevadas de las montañas y las criptas largo tiempo olvidadas. Simplemente no esperes que nadie pague por tus servicios por adelantado, porque nadie espera que vuelvas.

                            Gloomhaven es un juego cooperativo de combate táctico en un mundo de fantasía único y en evolución. Cada jugador asumirá el papel de un mercenario curtido con sus propios intereses personales. Juntos, los jugadores lucharán a través de una campaña de escenarios que reaccionan y cambian en función de las acciones de los jugadores, creando un exclusivo tipo de juego lleno de tesoros descubiertos, aventureros retirados y opciones permanentes. Cada escenario ofrece a los jugadores decisiones tácticas profundas, donde las cartas de habilidad tienen múltiples usos, y usar la habilidad correcta en el momento adecuado puede significar la diferencia entre el éxito y el fracaso.

                            Gloomhaven ofrece un combate táctico sin dados contra enemigos totalmente automatizados, cada uno con sus propios patrones de comportamiento. En esta caja, los jugadores encontrarán una experiencia de campaña de fantasía totalmente desarrollada de un alcance y profundidad sin precedentes.`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": ""
            },
            "stock": 4,
            "imagen": "/assets/img/games/gloomhaven-juego-de-mesa.jpg"
        },
        {
            "id": 9,
            "titulo": "Dominion",
            "precio": 30990,
            "descripcion": `En Dominion (segunda edición) cada jugador posee un Reino (su mazo inicial) y unas inevitables ganas de aumentar sus recursos, objetivo que no es fácil de alcanzar cuando hay tres o cuatro jugadores que tienen los mismos planes.

                            A diferencia de los juegos de mesa y cartas tradicionales, aquí cada participante debe elaborar su mazo y su estrategia a lo largo de la partida. Con un total de 500 cartas de diferentes tipos (Tesoro, Victoria, Reino y Maldición), una parte de ellas constituyen los suministros que son instalados sobre la mesa (los territorios por dominar y los recursos necesarios para hacerlo); luego, cada jugador comienza la partida con un mazo de diez cartas, con las cuales deberá comprar los diferentes suministros que le permitirán llevar a cabo sus planes y acrecentar sus puntos de Victoria.

                            De esta manera, los jugadores deberán luchar por lograr la mayor cantidad de puntos de Victoria en su reino para ganar la partida.

                            Componentes del juego

                            130 Cartas de Tesoro (60 Cartas de Cobre, 40 Cartas de Plata y 30 Cartas de Oro).

                            48 Cartas de Victoria (24 Cartas de Finca, 12 Cartas de Ducado y 12 Cartas de Provincia).

                            252 Cartas de Reino (10 Cartas de Aldea, Aventurero, Banquete, Biblioteca, Bruja, Burócrata, Canciller, Capilla, Espía, Festival, Foso, Herrería, Laboratorio, Ladrón, Leñadores, Mercado, Milicia, Mina, Prestamista, Remodelar, Sala del Consejo, Salón del Trono, Sótano y Taller; y 12 Cartas de Jardines).

                            30 Cartas de Maldición.

                            33 Cartas de Mazo Agotado (una por cada tipo de Carta, más una Carta “Cartas Eliminadas”).

                            7 Cartas en blanco`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2-4",
                "edad": "13+"
            },
            "stock": 12,
            "imagen": "/assets/img/games/dominion-juego-de-mesa.jpg"
        },
        {
            "id": 10,
            "titulo": "Arkham Horror: El Juego de Carta",
            "precio": 51990,
            "descripcion": ``,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "",
                "tiempo": "60-120 min"
            },
            "stock": 9,
            "imagen": "/assets/img/games/arkham-horror-el-juego-de-carta-ed-revisada.jpg"
        },
        {
            "id": 11,
            "titulo": "Un Dia En Las Carreras",
            "precio": 32990,
            "descripcion": `Te has reunido con tus amigos en el hipódromo para pasarla genial: ¡animando, abucheando y apostando por tus caballos favoritos! Haz tus apuestas en tiempo real mientras los dados mueven a los caballos por la pista.

                            Creado por John D. Clair (Space Base, Cubitos, Dead Reckoning, Mystic Vale) e ilustrado por Kirk W. Buckendorf y Athena Cagle, Un día en las carreras se puede disfrutar solo o en grupos de hasta 9 jugadores, desde los 10 años, en partidas de 45 a 90 minutos.

                            El juego se desarrolla en 4 rondas. En cada una, los participantes apuestan por un caballo durante la carrera. Al final de cada una, ganan o pierden dinero según sus apuestas. También reciben premios especiales y apuestan por resultados inesperados. Después de 4 rondas, ¡quien tenga más dinero gana!

                            Con reglas simples y varios modos de juego, Un día en las carreras es muy versátil y se adapta a cualquier ocasión. En cada juego, alguien puede ser la “Casa”, dirigiendo la carrera, o se puede usar una app gratuita que hace esta función, lanzando los dados automáticamente. Con cada lanzamiento, los caballos avanzan hasta que uno cruce la meta. Durante la carrera, los participantes apuestan al mismo tiempo, tan rápido o lento como quieran; pero no se pueden colocar fichas en espacios ocupados y una vez puesta, no se puede mover. Hay apuestas de todo tipo, desde acertar al ganador, a los que llegan entre los primeros o incluso los últimos. Al finalizar la carrera, se resuelven las apuestas y se reparte el dinero.

                            La emoción, los giros inesperados y las risas están garantizados en Un día en las carreras. Como en la vida real, el resultado es siempre incierto. El caballo puntero puede ser superado en cualquier momento. ¿Apostarás de inmediato para obtener las mejores probabilidades? ¿O esperarás a ver cómo avanza la carrera y apostarás en el último momento? La decisión es tuya en este emocionante juego de apuestas de carreras de caballos en tiempo real. `,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2-9",
                "edad": "14+"
            },
            "stock": 7,
            "imagen": "/assets/img/games/un-dia-en-las-carreras-juego-de-mesa.jpg"
        },
        {
            "id": 12,
            "titulo": "¡Rescate! Fire Rescue",
            "precio": 30990,
            "descripcion": `«Suena el teléfono… “Emergencias. ¿En qué puedo ayudarle?” Al otro lado se oye un grito de pánico: “¡FUEGO!”.

                            En apenas un instante te pones el traje protector, tomas el resto de tu equipo y sales corriendo hacia el lugar donde se ha desatado un infierno en llamas.

                            Cuando llegas al lugar del incendio apenas dispones de unos segundos para evaluar la situación y preparar un plan de ataque; al momento te pones en acción. Tienes que superar tus miedos, no desfallecer y, por encima de todo, trabajar como un equipo. ¡El fuego lo está arrasando todo, el edificio amenaza con derrumbarse y hay gente en peligro!

                            Perteneces al valiente cuerpo de bomberos y tienes que lograrlo, porque las vidas de muchas personas están en tus manos. A fin de cuentas, es tu pan de cada día.»

                            ¡Rescate! es un juego cooperativo de lucha contra el fuego. Los jugadores son un equipo de bomberos que acude a un incendio con el objetivo de rescatar a todos los ocupantes de un edificio. A lo largo de la partida el fuego se extenderá a menos que los jugadores se dediquen a extinguirlo, aunque el tiempo apremia y lo fundamental es poner a todo el mundo a salvo antes de que el fuego colapse el edificio. El juego incorpora una versión de juego avanzado en el que los personajes tienen capacidades especiales, se incorporan vehículos y también materiales especialmente inflamables. El juego incluye también un segundo tablero con un plano de un edificio diferente para hacer el juego siempre imprevisible.

                            Componentes del juego

                            6 peones y 6 cartas para los jugadores

                            6 tipos de fichas distintas (en diferentes cantidades)

                            24 cubos de daño

                            2 dados

                            Tablero, reversible

                            8 Tarjetas de personaje

                            Cartas de ayudas para el juego (resumen de las instrucciones)`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2-6",
                "edad": "10+"
            },
            "stock": 13,
            "imagen": "/assets/img/games/rescate-fire-rescue-juego-de-mesa.jpg"
        },
        {
            "id": 13,
            "titulo": "Catan Plus - Nueva Edicion 2023",
            "precio": 64990,
            "descripcion": `¡Entra por la puerta grande en el mundo de Catan! Esta edición incluye el juego básico, la ampliación para 5-6 jugadores, la miniexpansión ‘Entre amigos’, dos escenarios alternativos de preparación de partida (en la que en vez de jugar en la isla con forma de hexágono lo haremos o bien en la India o bien en la Península Ibérica) y las miniexpansiones Santa Claus y El conejo de Pascua. El clásico de Klaus Teuber nunca pasa de moda y ahora tienes la oportunidad de descubrir el juego de mesa que revolucionó el sector con la edición más completa del mercado.`,
            "especificaciones": {
                "formato": "Producto Físico",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "3-6",
                "edad": ""
            },
            "stock": 25,
            "imagen": "/assets/img/games/catan-plus-nueva-edicion-2023.jpg"
        },
        {
            "id": 14,
            "titulo": "Block Block Burrito",
            "precio": 17990,
            "descripcion": `EL JUEGO DE CARTAS DE BALÓN PRISIONERO QUE TE TIENE FASCINADO ESTÁ A PUNTO DE SER MÁS FASCINANTE TODAVÍA.

                            ¡AHORA puedes utilizar una Tortilla hinchable como escudo para BLOQUEAR los Burritos que te lancen y protegerte!

                            Consigue conjuntos de cartas.

                            Enfréntate en nuevas batallas.

                            Lanza Burritos.

                            Bloquéalos con Tortillas

                            y protégete.

                            LA MEJOR DEFENSA ES UNA BUENA DEFENSA.

                            CONTENIDO

                            72 cartas, 2 escudos de tortilla, 2 parches de reparación.`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2-6",
                "edad": ""
            },
            "stock": 4,
            "imagen": "/assets/img/games/block-block-burrito-promo3x2.jpg"
        },
        {
            "id": 15,
            "titulo": "Patchwork",
            "precio": 14990,
            "descripcion": `¡Cuántos retales y parches de cuero! ¡Vamos a coser una colcha hermosa! Pero eso conlleva tiempo y mucho esfuerzo, además de un suministro importante de botones. Para ganar la partida, deberás combinar hábilmente retazos de tela y elaborar una colcha con los mejores parches.`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "2",
                "edad": ""
            },
            "stock": 8,
            "imagen": "/assets/img/games/patchwork-juego-de-mesa.jpg"
        },
        {
            "id": 16,
            "titulo": "Exit: La Cabaña Abandonada",
            "precio": 12990,
            "descripcion": `Exit: La cabaña abandonada es el primer título de esta popular colección de juegos de aventura, en la que los jugadores deben resolver todos los enigmas necesarios para encontrar la salida de una siniestra cabaña.

                            Exit: La cabaña abandonada es el más emblemático título de esta colección, diseñada por los afamados autores Markus e Inka Brand y publicado en el año 2016. En él, los jugadores se refugian en una siniestra cabaña para resguardarse de una tormenta, pero una vez en su interior quedan atrapados y solo podrán salir usando todo su ingenio para resolver los enigmas que esconden las habitaciones de la cabaña. El juego incluye todas las pistas y ayudas necesarias para que jugadores de todos los niveles puedan disfrutar de la experiencia. Una de las características más interesantes de este juego es que para resolver los enigmas se usan absolutamente todos los elementos del juego (cartas, reglas, ayudas de juego y hasta la propia caja e inserto)

                            Un misterioso dial y unos pocos elementos es todo lo que tienen los jugadores para empezar a encontrar las pistas que les permitan salir de esta cabaña abandonada. ¿Te atreves a enfrentarte a Exit: La cabaña abandonada?`,
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-6",
                "edad": "12+"
            },
            "stock": 15,
            "imagen": "/assets/img/games/exit-la-cabana-abandonada.jpg"
        }
    ];

    constructor() {}

    obtenerJuegos(): Observable<Juego[]> {
        return of(this.juegos);
    }
}