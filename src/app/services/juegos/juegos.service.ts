import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

@Injectable({
    providedIn: 'root'
})
export class JuegosService {
    private juegos: Juego[] = [
        {
            "id": 1,
            "titulo": "Cyberpunk 2077: Bandas de Night City - Juego de Mesa",
            "precio": 94990,
            "resena": "The Dursleys were so mean and hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature named Dobby who says that if Harry Potter returns to Hogwarts, disaster will strike.And strike it does. For in Harry's second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockhart, a spirit named Moaning Myrtle who haunts the girls' bathroom, and the unwanted attentions of Ron Weasley's younger sister, Ginny.",
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
            "resena": "¡Desafía a tu cerebro con un divertido juego que pondrá a prueba tu razonamiento, memoria y rapidez!",
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
            "titulo": "El Niño Que Perdio La Guerra",
            "precio": 24990,
            "resena": "Clotilde, una artista gráfica que dibuja caricaturas para los diarios republicanos, asiste en Madrid a los últimos meses de la Guerra Civil. La caída de la República es inminente, por lo que su marido, militante comunista que trabaja para los rusos, decide enviar a Moscú a su hijo Pablo, de tan solo cinco años, en contra de su voluntad. Clotilde se resiste con todas sus fuerzas, pero no logra evitar que el comandante Borís Petrov emprenda ese arriesgado viaje por una España en llamas para cumplir con el deseo de su camarada de llevar a Pablo a la Unión Soviética, donde Stalin está levantando un nuevo país sobre las ruinas del antiguo régimen.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 20,
            "imagen": "/assets/img/games/dixit.jpg"
        },
        {
            "id": 4,
            "titulo": "La Chica Oculta",
            "precio": 21990,
            "resena": "Nacida en un pequeño pueblo de Inglaterra, Leah Thompson crece para convertirse en una joven de belleza deslumbrante. Y, cuando capta la atención de la influyente pero conflictiva familia Delancey, sabe que su vida nunca volverá a ser la misma. Años más tarde, Leah se ha convertido en la supermodelo más cotizada del mundo, rodeada de lujo y glamour. Pero su pasado la persigue como una oscura sombra, misteriosamente entrelazado con la trágica historia de dos hermanos en la Polonia de la Segunda Guerra Mundial. Mientras dos generaciones de secretos amenazan con estallar, Leah se siente atrapada por una terrible profecía de su pasado. Y deberá desafiar al destino que las estrellas han trazado para ella...",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 10,
            "imagen": "/assets/img/games/dobble.jpg"
        },
        {
            "id": 5,
            "titulo": "Si Lo Crees Lo Creas",
            "precio": 14990,
            "resena": "Dejar ir los pensamientos negativos es uno de los pasos más importantes para vivir una vida exitosa y satisfactoria, pero también el más difícil. En esta práctica guía, el autor best seller Brian Tracy y la psicoterapeuta Christina Stein presentan su programa 'Psicología del logro' para ayudarte a identificar y superar patrones e ideas perjudiciales que te impiden alcanzar tus metas o sentirte feliz y satisfecho en tu vida. Tracy y Stein te ayudan a reconocer cómo la negatividad consciente (y muchas veces inconsciente) afecta tu personalidad, tu perspectiva y tus decisiones, y te muestran cómo recuperar el control de tus pensamientos, sentimientos y acciones para convertir lo negativo en positivo y aprender a aceptar cambios de vida inesperados.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 5,
            "imagen": "/assets/img/games/forbidden-island.jpg"
        },
        {
            "id": 6,
            "titulo": "Deja De Ser Tu",
            "precio": 29990,
            "resena": "Joe Dispenza saltó a la fama en nuestro país tras participar en la película ¿Y tú qué sabes?, un documental sobre la sobrecogedora capacidad de la mente para transformar la realidad que corrió de mano en mano sin ninguna publicidad, gracias al boca oreja. Ahora, el popularísimo científico y autor de Desarrolla tu cerebro profundiza en todos aquellos temas que tanto nos cautivaron -física cuántica, neurociencia, biología y genética- para enseñarnos a reprogramar el cerebro y ampliar nuestro marco de realidad. El resultado es un método práctico de trasformación para crear prosperidad y riqueza, pero también un viaje prodigioso a un nuevo estado de conciencia.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 12,
            "imagen": "/assets/img/games/ghost-stories.jpg"
        },
        {
            "id": 7,
            "titulo": "El Gato Que Cuidaba Las Bibliotecas",
            "precio": 15990,
            "resena": "La joven Nanami no puede participar en actividades extraescolares por su asma, pero le encanta leer y pasar el tiempo en la biblioteca, entre historias. Un día, Nanami se da cuenta de que, a pesar de que la biblioteca está tan poco frecuentada como siempre, sus libros favoritos están desapareciendo poco a poco. Cuando avisa al personal, nadie la toma en serio. Pero entonces Nanami se topa con un misterioso hombre con un traje gris. Intenta seguirlo, pero fracasa y él deja a su paso tan solo un extraño haz de luz entre las estanterías. Es entonces cuando Tigre, el gato favorito de los lectores, acude al rescate. ¿Podrán superar juntos los desafíos que les aguardan?.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 10,
            "imagen": "/assets/img/games/jenga.jpg"
        },
        {
            "id": 8,
            "titulo": "Un Buen Dia Para Estar Sola",
            "precio": 18990,
            "resena": "«Llovía cuando llegué a la casa. Las paredes de mi habitación estaban cubiertas de fotos de gatos con marcos elegantes, justo debajo del techo». Cuando su madre emigra a China por motivos de trabajo, Chizu, una joven de veinte años, se muda con Ginko, una pariente lejana y excéntrica de setenta y uno. Se instala en una habitación de su destartalada casa de Tokio, donde la acompañan los dos gatos que habitan allí y el traqueteo persistente de los trenes que pasan en las inmediaciones. Viviendo en una simetría imperfecta, ambas establecen una alianza incómoda, que se verá puesta a prueba por los momentos de rencor juvenil de Chizu. A lo largo de las cuatro estaciones, la joven navegará por una serie de tediosos trabajos a tiempo parcial y de relaciones insatisfactorias, hasta encontrar su lugar, y descubrirá que su soledad también encierra una gran sensación de independencia. Con momentos de humor y una visión aguda para los detalles conmovedores, Aoyama narra el doloroso proceso de liberarse de las ataduras de la juventud a través de este análisis, minucioso y emotivo, de la soledad y el desamor.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 4,
            "imagen": "/assets/img/games/jumanji.jpg"
        },
        {
            "id": 9,
            "titulo": "Deten El Estres",
            "precio": 15990,
            "resena": "¡Domina tu estrés antes de que te domine a ti! Descubre cómo con el Dr. Jaime Silva. “Este libro quiere impulsar a las personas –y a la sociedad– a mirarse a sí mismas y que, al hacerlo, comprendan su lugar en el entramado que constituyen los pilares del bienestar psicológico”. Escribir un libro sobre bienestar puede ser una aventura riesgosa, dice el autor en las primeras páginas de Detén el estrés. Sin embargo, transitamos una época inédita en la historia de la humanidad en la que la salud mental se ha vuelto protagonista de la agenda social, dando cuenta de la urgente necesidad de la población por obtener herramientas para enfrentar la epidemia de estrés. Jaime Silva, psicólogo y doctor en Psicobiología, se sumerge en dicha aventura y propone conocer el concepto de homeostasis social –el equilibrio entre el sentido de seguridad de un ser humano y su sentido de libertad– como determinante del bienestar. Para alcanzarlo, se concentra en cuatro pilares fundamentales: la relevancia de conectar con otros, la importancia de ser conscientes del aquí y el ahora, tener un propósito de vida y, finalmente, conocer y entender nuestras emociones. Haciendo referencia a casos clínicos, ejemplos prácticos y una serie de estudios mundiales, Detén el estrés no es un libro de recomendaciones paso a paso, ni tampoco una letanía de prescripciones de cómo se debe vivir la vida. Al contrario, se constituye como una herramienta complementaria a una terapia o como apoyo al desarrollo emocional del lector, estimulándolo a hacerse sus propias preguntas y acompañándolo a comprender que el bienestar psicológico no es equivalente a una vida sin dificultades, traumas, estrés o sufrimiento.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 12,
            "imagen": "/assets/img/games/jungle-speed"
        },
        {
            "id": 10,
            "titulo": "Metodos Numericos Aplicados A La Ingenieria. Problemas En Polymath Y M",
            "precio": 15990,
            "resena": "Este libro es una herramienta académica idónea para resolver diversos problemas de ingeniería, donde previamente se plantean modelos matemáticos que describen el comportamiento de un fenómeno físico. Estos modelos resultan muchas veces ser muy complejos, por ello el libro le ayudará a resolver modelos matemáticos de alta dificultad para así encontrar una solución aproximada. Mediante el uso de los métodos numéricos y la ayuda de un software simple como el Ploymath el lector desarrollará proyectos de relativa complejidad, tal como se ilustra en los problemas de aplicaciones presentados en este texto.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 9,
            "imagen": "/assets/img/games/monopoly.jpg"
        },
        {
            "id": 11,
            "titulo": "Administracion Hardware De Un Sistema Informatico",
            "precio": 24990,
            "resena": "Los contenidos incluidos en este libro abarcan desde conceptos básicos, como la arquitectura Von Neumann de computadoras, los componentes de un sistema informático, etc., hasta conceptos muy utilizados y más avanzados en el ámbito empresarial actual, como el balanceo de carga, la alta disponibilidad y los sistemas en clúster, que harán que el lector encuentre el libro sumamente interesante.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 7,
            "imagen": "/assets/img/games/pandemic.jpg"
        },
        {
            "id": 12,
            "titulo": "Sistemas Operativos",
            "precio": 33990,
            "resena": "Enseña los diferentes componentes que conforman los sistemas operativos. Por su enfoque espiral, permite tener un acercamiento más amigable con el tema. Mientras que los sistemas operativos han cambiado, al paso de los años, la mayoría de los libros del SO utilizan un acercamiento lineal para cada componente. Este enfoque espiral es más eficaz pedagógicamente, e inspira a estudiantes a que continúen explorando conceptos más avanzados.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 13,
            "imagen": "/assets/img/games/risk.jpg"
        },
        {
            "id": 13,
            "titulo": "Todo Sobre Los NFT",
            "precio": 22990,
            "resena": "El libro responde a estas y otras muchas preguntas. Empezando por lo que son los tókens y la representación digital del valor que puede expresar un activo tokenizado, el lector se adentra en un viaje de aprendizaje progresivo para entender cómo funciona la blockchain en la que se acuñan los NFT y cómo elegir los mercados a través de los cuales intercambiarlos. Los NFT no son una moda del momento y, aunque han sido traido a primer plano gracias a la crypto art, ya son capaces de mirar más allá, dejándonos entrever la relevancia que tendrán en unas relaciones sociales cada vez más mediadas por tecnologías como la inteligencia artificial o la realidad aumentada y por nuevos ecosistemas digitales como el metaverso. El libro, por tanto, no sólo se centra en las áreas de aplicación actuales, sino que identifica posibles desarrollos estratégicos en áreas que realmente podrían beneficiarse de una adopción útil de los NFT. Resumen: Qué es un NFT - Tokens y tokenización - La historia de los NFT entre la fascinación y el desencanto - Lo que realmente se posee con un NFT - El intercambio de NFT en la blockchain.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 25,
            "imagen": "/assets/img/games/sushi-go.jpg"
        },
        {
            "id": 14,
            "titulo": "Vinland Saga Nº 27",
            "precio": 15990,
            "resena": "Las aventuras de unos pioneros vikingos.Desde su llegada a Vinland, la tierra de todas sus esperanzas, los pioneros han descifrado grandes areas forestales para crear vastos campos de trigo. Aunque sus primeros contactos con los nativos, el pueblo Lnu, fueron cordiales y bajo el signo de la curiosidad mutua, algunos nordicos, liderados por Ivar y Ugge, siguen convencidos de que deben prepararse para la guerra. Esta creencia es compartida por el chaman de la tribu Gitpi, traumatizado por su vision profetica de la destruccion de su pueblo y del continente americano por parte de los colonos. ¿Conseguira Thorfinn perseguir su sueño pacifista contra gente que solo piensa en la guerra?",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 4,
            "imagen": "/assets/img/games/terraforming.jpg"
        },
        {
            "id": 15,
            "titulo": "Attack On Titan #21",
            "precio": 12990,
            "resena": "Durante el último siglo, lo que quedaba de la humanidad se vio obligada a refugiarse en una ciudad enorme y escondida, protegida por tres inmensos muros debido al temor hacia los extraños y gigantescos Titanes. Poco se sabe acerca de sus orígenes, pero la repentina aparición de un enorme Titán está a punto de cambiarlo todo...",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 8,
            "imagen": "/assets/img/games/ticket-to-ride.jpg"
        },
        {
            "id": 16,
            "titulo": "Star Wars Darth Vader Tomo Nº 03/04",
            "precio": 15990,
            "resena": "El penúltimo recopilatorio de la serie del Lord Sith más temido en la galaxia. Hay una revolución en Shu-Torun y el Imperio no piensa permitirlo. Cuando a Darth Vader le encargan que lidere un asalto militar contra el planeta, ¿puede ser que su ascenso a la gloria haya empezado? ¿Pero quién seguirá a Vader a la guerra? ¿Tú lo harías? Claro que siempre es mejor pelear junto a Vader que contra él. Esa es una lección que muchos están a punto de aprender.",
            "especificaciones": {
                "formato": "Juego de Mesa",
                "condicion": "Nuevo Sellado",
                "idioma": "Español",
                "cant_jugadores": "1-4",
                "edad": "10+"
            },
            "stock": 15,
            "imagen": "/assets/img/games/uno.jpg"
        }
    ];

    constructor() {}

    obtenerJuegos(): Observable<Juego[]> {
        return of(this.juegos);
    }
}