import { Injectable } from '@angular/core';
import { Libro } from '../../models/interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LibrosService {

    constructor() { }

    private libros: Libro[] = [
        {
            "id": 1,
            "titulo": "Harry Potter And The Chamber Of Secrets",
            "autor": "ROWLING, JOANNE K.",
            "editorial": "Scholastic", 
            "precio": 19990,
            "resena": "The Dursleys were so mean and hideous that summer that all Harry Potter wanted was to get back to the Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature named Dobby who says that if Harry Potter returns to Hogwarts, disaster will strike.And strike it does. For in Harry's second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockhart, a spirit named Moaning Myrtle who haunts the girls' bathroom, and the unwanted attentions of Ron Weasley's younger sister, Ginny.",
            "especificaciones": {
                "categoria": "Literatura",
                "sub_categoria": "Young Readers",
                "idioma": "Inglés",
                "formato": "Tapa Blanda",
                "paginas": 352
            },
            "stock": 10,
            "imagen": "/assets/img/libros/literatura/harry-potter2.webp"
        },
        {
            "id": 2,
            "titulo": "Alas De Hierro",
            "autor": "YARROS, REBECCA",
            "editorial": "Planeta", 
            "precio": 26990,
            "resena": "El segundo volumen de la serie Empíreo tras Alas de sangre. El fenómeno juvenil de fantasía del que todo el mundo habla. Todos esperaban que Violet Sorrengail muriera en su primer año en el Colegio de Guerra de Basgiath, incluso ella misma. Pero la Trilla fue tan solo la primera de una serie de pruebas imposibles destinadas a deshacerse de los pusilánimes, los indignos y los desafortunados. Ahora comienza el verdadero entrenamiento y Violet no sabe cómo logrará superarlo. No solo porque es brutal y agotador ni porque está diseñado para llevar al límite el umbral del dolor de los jinetes, sino porque el nuevo vicecomandante está empeñado en demostrar a Violet lo débil que es a menos que traicione al hombre que ama. Aunque el cuerpo de Violet es más frágil que el de sus compañeros, su fuerza radica en su ingenio y voluntad de hierro. Además, los líderes están olvidando la lección más importante que Basgiath les ha enseñado: los jinetes de dragones crean sus propias reglas. La voluntad de sobrevivir no será suficiente este año, porque Violet conoce el secreto que se oculta entre los muros del colegio y nada, ni siquiera el fuego de dragón, será suficiente para salvarlos.",
            "especificaciones": {
                "categoria": "Literatura",
                "sub_categoria": "Narrativa Fantastica",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 880
            },
            "stock": 15,
            "imagen": "/assets/img/libros/literatura/Alas-De-Hierro.webp"
        },
        {
            "id": 3,
            "titulo": "El Niño Que Perdio La Guerra",
            "autor": "NAVARRO, JULIA",
            "editorial": "Plaza & Janés", 
            "precio": 24990,
            "resena": "Clotilde, una artista gráfica que dibuja caricaturas para los diarios republicanos, asiste en Madrid a los últimos meses de la Guerra Civil. La caída de la República es inminente, por lo que su marido, militante comunista que trabaja para los rusos, decide enviar a Moscú a su hijo Pablo, de tan solo cinco años, en contra de su voluntad. Clotilde se resiste con todas sus fuerzas, pero no logra evitar que el comandante Borís Petrov emprenda ese arriesgado viaje por una España en llamas para cumplir con el deseo de su camarada de llevar a Pablo a la Unión Soviética, donde Stalin está levantando un nuevo país sobre las ruinas del antiguo régimen.",
            "especificaciones": {
                "categoria": "Novela",
                "sub_categoria": "Historica", 
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 640
            },
            "stock": 20,
            "imagen": "/assets/img/libros/novelas/el-niño-que-perdio-la-guerra.webp"
        },
        {
            "id": 4,
            "titulo": "La Chica Oculta",
            "autor": "RILEY, LUCINDA",
            "editorial": "Plaza & Janés", 
            "precio": 21990,
            "resena": "Nacida en un pequeño pueblo de Inglaterra, Leah Thompson crece para convertirse en una joven de belleza deslumbrante. Y, cuando capta la atención de la influyente pero conflictiva familia Delancey, sabe que su vida nunca volverá a ser la misma. Años más tarde, Leah se ha convertido en la supermodelo más cotizada del mundo, rodeada de lujo y glamour. Pero su pasado la persigue como una oscura sombra, misteriosamente entrelazado con la trágica historia de dos hermanos en la Polonia de la Segunda Guerra Mundial. Mientras dos generaciones de secretos amenazan con estallar, Leah se siente atrapada por una terrible profecía de su pasado. Y deberá desafiar al destino que las estrellas han trazado para ella...",
            "especificaciones": {
                "categoria": "Novela",
                "sub_categoria": "Historica",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 544
            },
            "stock": 10,
            "imagen": "/assets/img/libros/novelas/La-Chica-Oculta.webp"
        },
        {
            "id": 5,
            "titulo": "Si Lo Crees Lo Creas",
            "autor": "TRACY, BRIAN",
            "editorial": "Aguilar", 
            "precio": 14990,
            "resena": "Dejar ir los pensamientos negativos es uno de los pasos más importantes para vivir una vida exitosa y satisfactoria, pero también el más difícil. En esta práctica guía, el autor best seller Brian Tracy y la psicoterapeuta Christina Stein presentan su programa 'Psicología del logro' para ayudarte a identificar y superar patrones e ideas perjudiciales que te impiden alcanzar tus metas o sentirte feliz y satisfecho en tu vida. Tracy y Stein te ayudan a reconocer cómo la negatividad consciente (y muchas veces inconsciente) afecta tu personalidad, tu perspectiva y tus decisiones, y te muestran cómo recuperar el control de tus pensamientos, sentimientos y acciones para convertir lo negativo en positivo y aprender a aceptar cambios de vida inesperados.",
            "especificaciones": {
                "categoria": "Autoayuda",
                "sub_categoria": "Autoayuda",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 240
            },
            "stock": 5,
            "imagen": "/assets/img/libros/auto-ayuda/Si-Lo-Crees-Lo-Creas.webp"
        },
        {
            "id": 6,
            "titulo": "Deja De Ser Tu",
            "autor": "DISPENZA, JOE",
            "editorial": "Urano", 
            "precio": 29990,
            "resena": "Joe Dispenza saltó a la fama en nuestro país tras participar en la película ¿Y tú qué sabes?, un documental sobre la sobrecogedora capacidad de la mente para transformar la realidad que corrió de mano en mano sin ninguna publicidad, gracias al boca oreja. Ahora, el popularísimo científico y autor de Desarrolla tu cerebro profundiza en todos aquellos temas que tanto nos cautivaron -física cuántica, neurociencia, biología y genética- para enseñarnos a reprogramar el cerebro y ampliar nuestro marco de realidad. El resultado es un método práctico de trasformación para crear prosperidad y riqueza, pero también un viaje prodigioso a un nuevo estado de conciencia.",
            "especificaciones": {
                "categoria": "Autoayuda",
                "sub_categoria": "Autoayuda",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 352
            },
            "stock": 12,
            "imagen": "/assets/img/libros/auto-ayuda/Deja-De-Ser-Tu.webp"
        },
        {
            "id": 7,
            "titulo": "El Gato Que Cuidaba Las Bibliotecas",
            "autor": "NATSUKAWA, SOSUKE",
            "editorial": "Grijalbo", 
            "precio": 15990,
            "resena": "La joven Nanami no puede participar en actividades extraescolares por su asma, pero le encanta leer y pasar el tiempo en la biblioteca, entre historias. Un día, Nanami se da cuenta de que, a pesar de que la biblioteca está tan poco frecuentada como siempre, sus libros favoritos están desapareciendo poco a poco. Cuando avisa al personal, nadie la toma en serio. Pero entonces Nanami se topa con un misterioso hombre con un traje gris. Intenta seguirlo, pero fracasa y él deja a su paso tan solo un extraño haz de luz entre las estanterías. Es entonces cuando Tigre, el gato favorito de los lectores, acude al rescate. ¿Podrán superar juntos los desafíos que les aguardan?.",
            "especificaciones": {
                "categoria": "Novela",
                "sub_categoria": "Romantica",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 256
            },
            "stock": 10,
            "imagen": "/assets/img/libros/novelas/El-Gato-Que-Cuidaba-Las-Bibliotecas.webp"
        },
        {
            "id": 8,
            "titulo": "Un Buen Dia Para Estar Sola",
            "autor": "AOYAMA, NANAE",
            "editorial": "Plata", 
            "precio": 18990,
            "resena": "«Llovía cuando llegué a la casa. Las paredes de mi habitación estaban cubiertas de fotos de gatos con marcos elegantes, justo debajo del techo». Cuando su madre emigra a China por motivos de trabajo, Chizu, una joven de veinte años, se muda con Ginko, una pariente lejana y excéntrica de setenta y uno. Se instala en una habitación de su destartalada casa de Tokio, donde la acompañan los dos gatos que habitan allí y el traqueteo persistente de los trenes que pasan en las inmediaciones. Viviendo en una simetría imperfecta, ambas establecen una alianza incómoda, que se verá puesta a prueba por los momentos de rencor juvenil de Chizu. A lo largo de las cuatro estaciones, la joven navegará por una serie de tediosos trabajos a tiempo parcial y de relaciones insatisfactorias, hasta encontrar su lugar, y descubrirá que su soledad también encierra una gran sensación de independencia. Con momentos de humor y una visión aguda para los detalles conmovedores, Aoyama narra el doloroso proceso de liberarse de las ataduras de la juventud a través de este análisis, minucioso y emotivo, de la soledad y el desamor.",
            "especificaciones": {
                "categoria": "Literatura",
                "sub_categoria": "Literatura Oriental",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 160
            },
            "stock": 4,
            "imagen": "/assets/img/libros/literatura/Un-Buen-Dia-Para-Estar-Sola.webp"
        },
        {
            "id": 9,
            "titulo": "Deten El Estres",
            "autor": "SILVA, JAIME",
            "editorial": "Diana", 
            "precio": 15990,
            "resena": "¡Domina tu estrés antes de que te domine a ti! Descubre cómo con el Dr. Jaime Silva. “Este libro quiere impulsar a las personas –y a la sociedad– a mirarse a sí mismas y que, al hacerlo, comprendan su lugar en el entramado que constituyen los pilares del bienestar psicológico”. Escribir un libro sobre bienestar puede ser una aventura riesgosa, dice el autor en las primeras páginas de Detén el estrés. Sin embargo, transitamos una época inédita en la historia de la humanidad en la que la salud mental se ha vuelto protagonista de la agenda social, dando cuenta de la urgente necesidad de la población por obtener herramientas para enfrentar la epidemia de estrés. Jaime Silva, psicólogo y doctor en Psicobiología, se sumerge en dicha aventura y propone conocer el concepto de homeostasis social –el equilibrio entre el sentido de seguridad de un ser humano y su sentido de libertad– como determinante del bienestar. Para alcanzarlo, se concentra en cuatro pilares fundamentales: la relevancia de conectar con otros, la importancia de ser conscientes del aquí y el ahora, tener un propósito de vida y, finalmente, conocer y entender nuestras emociones. Haciendo referencia a casos clínicos, ejemplos prácticos y una serie de estudios mundiales, Detén el estrés no es un libro de recomendaciones paso a paso, ni tampoco una letanía de prescripciones de cómo se debe vivir la vida. Al contrario, se constituye como una herramienta complementaria a una terapia o como apoyo al desarrollo emocional del lector, estimulándolo a hacerse sus propias preguntas y acompañándolo a comprender que el bienestar psicológico no es equivalente a una vida sin dificultades, traumas, estrés o sufrimiento.",
            "especificaciones": {
                "categoria": "Autoayuda",
                "sub_categoria": "Autoayuda",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 188
            },
            "stock": 12,
            "imagen": "/assets/img/libros/auto-ayuda/Deten-El-Estres.webp"
        },
        {
            "id": 10,
            "titulo": "Metodos Numericos Aplicados A La Ingenieria. Problemas En Polymath Y M",
            "autor": "CARRASCO, LUIS",
            "editorial": "Imp. Macro Peru Macro Peru", 
            "precio": 15990,
            "resena": "Este libro es una herramienta académica idónea para resolver diversos problemas de ingeniería, donde previamente se plantean modelos matemáticos que describen el comportamiento de un fenómeno físico. Estos modelos resultan muchas veces ser muy complejos, por ello el libro le ayudará a resolver modelos matemáticos de alta dificultad para así encontrar una solución aproximada. Mediante el uso de los métodos numéricos y la ayuda de un software simple como el Ploymath el lector desarrollará proyectos de relativa complejidad, tal como se ilustra en los problemas de aplicaciones presentados en este texto.",
            "especificaciones": {
                "categoria": "Informatica",
                "sub_categoria": "Lenguajes De Programacion",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 592
            },
            "stock": 9,
            "imagen": "/assets/img/libros/informatica/Metodos Numericos Aplicados A La Ingenieria. Problemas En Polymath Y M.webp"
        },
        {
            "id": 11,
            "titulo": "Administracion Hardware De Un Sistema Informatico",
            "autor": "RAMOS PEREZ, ARTURO FRANCISCO",
            "editorial": "Imp. Macro Peru Macro Peru", 
            "precio": 24990,
            "resena": "Los contenidos incluidos en este libro abarcan desde conceptos básicos, como la arquitectura Von Neumann de computadoras, los componentes de un sistema informático, etc., hasta conceptos muy utilizados y más avanzados en el ámbito empresarial actual, como el balanceo de carga, la alta disponibilidad y los sistemas en clúster, que harán que el lector encuentre el libro sumamente interesante.",
            "especificaciones": {
                "categoria": "Informatica",
                "sub_categoria": "Hardware",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 208
            },
            "stock": 7,
            "imagen": "/assets/img/libros/informatica/Administracion-hardware-de-un-sistema-informatico.webp"
        },
        {
            "id": 12,
            "titulo": "Sistemas Operativos",
            "autor": "ELMASRI, RAMEZ",
            "editorial": "Mcgraw Hill", 
            "precio": 33990,
            "resena": "Enseña los diferentes componentes que conforman los sistemas operativos. Por su enfoque espiral, permite tener un acercamiento más amigable con el tema. Mientras que los sistemas operativos han cambiado, al paso de los años, la mayoría de los libros del SO utilizan un acercamiento lineal para cada componente. Este enfoque espiral es más eficaz pedagógicamente, e inspira a estudiantes a que continúen explorando conceptos más avanzados.",
            "especificaciones": {
                "categoria": "Informatica",
                "sub_categoria": "Ingenieria Informatica",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 544
            },
            "stock": 13,
            "imagen": "/assets/img/libros/informatica/Sistemas-operativos.webp"
        },
        {
            "id": 13,
            "titulo": "Todo Sobre Los NFT",
            "autor": "GARAVAGLIA, ROBERTO",
            "editorial": "Hoepli Ediciones", 
            "precio": 22990,
            "resena": "El libro responde a estas y otras muchas preguntas. Empezando por lo que son los tókens y la representación digital del valor que puede expresar un activo tokenizado, el lector se adentra en un viaje de aprendizaje progresivo para entender cómo funciona la blockchain en la que se acuñan los NFT y cómo elegir los mercados a través de los cuales intercambiarlos. Los NFT no son una moda del momento y, aunque han sido traido a primer plano gracias a la crypto art, ya son capaces de mirar más allá, dejándonos entrever la relevancia que tendrán en unas relaciones sociales cada vez más mediadas por tecnologías como la inteligencia artificial o la realidad aumentada y por nuevos ecosistemas digitales como el metaverso. El libro, por tanto, no sólo se centra en las áreas de aplicación actuales, sino que identifica posibles desarrollos estratégicos en áreas que realmente podrían beneficiarse de una adopción útil de los NFT. Resumen: Qué es un NFT - Tokens y tokenización - La historia de los NFT entre la fascinación y el desencanto - Lo que realmente se posee con un NFT - El intercambio de NFT en la blockchain.",
            "especificaciones": {
                "categoria": "Informatica",
                "sub_categoria": "Ingenieria Informatica",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 196
            },
            "stock": 25,
            "imagen": "/assets/img/libros/informatica/Todo-Sobre-Los-NFT.webp"
        },
        {
            "id": 14,
            "titulo": "Vinland Saga Nº 27",
            "autor": "YUKIMURA, MAKOTO",
            "editorial": "Planeta Comic", 
            "precio": 15990,
            "resena": "Las aventuras de unos pioneros vikingos.Desde su llegada a Vinland, la tierra de todas sus esperanzas, los pioneros han descifrado grandes areas forestales para crear vastos campos de trigo. Aunque sus primeros contactos con los nativos, el pueblo Lnu, fueron cordiales y bajo el signo de la curiosidad mutua, algunos nordicos, liderados por Ivar y Ugge, siguen convencidos de que deben prepararse para la guerra. Esta creencia es compartida por el chaman de la tribu Gitpi, traumatizado por su vision profetica de la destruccion de su pueblo y del continente americano por parte de los colonos. ¿Conseguira Thorfinn perseguir su sueño pacifista contra gente que solo piensa en la guerra?",
            "especificaciones": {
                "categoria": "Comics y Manga",
                "sub_categoria": "Manga",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 200
            },
            "stock": 4,
            "imagen": "/assets/img/libros/comics-mangas/Vinland Saga Nº 27.webp"
        },
        {
            "id": 15,
            "titulo": "Attack On Titan #21",
            "autor": "ISAYAMA, HAJIME",
            "editorial": "Ovni Press", 
            "precio": 12990,
            "resena": "Durante el último siglo, lo que quedaba de la humanidad se vio obligada a refugiarse en una ciudad enorme y escondida, protegida por tres inmensos muros debido al temor hacia los extraños y gigantescos Titanes. Poco se sabe acerca de sus orígenes, pero la repentina aparición de un enorme Titán está a punto de cambiarlo todo...",
            "especificaciones": {
                "categoria": "Comics y Manga",
                "sub_categoria": "Comics Chilenos",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 200
            },
            "stock": 8,
            "imagen": "/assets/img/libros/comics-mangas/Attack-On-Titan-21.webp"
        },
        {
            "id": 16,
            "titulo": "Star Wars Darth Vader Tomo Nº 03/04",
            "autor": "LARROCA, SALVADOR",
            "editorial": "Planeta Comic", 
            "precio": 15990,
            "resena": "El penúltimo recopilatorio de la serie del Lord Sith más temido en la galaxia. Hay una revolución en Shu-Torun y el Imperio no piensa permitirlo. Cuando a Darth Vader le encargan que lidere un asalto militar contra el planeta, ¿puede ser que su ascenso a la gloria haya empezado? ¿Pero quién seguirá a Vader a la guerra? ¿Tú lo harías? Claro que siempre es mejor pelear junto a Vader que contra él. Esa es una lección que muchos están a punto de aprender.",
            "especificaciones": {
                "categoria": "Comics y Manga",
                "sub_categoria": "Comics en Español",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 136
            },
            "stock": 15,
            "imagen": "/assets/img/libros/comics-mangas/Star-Wars-Darth-Vader-Tomo-Nº-03:04.webp"
        },
        {
            "id": 17,
            "titulo": "Spy X Family #10",
            "autor": "ENDO, TETSUYA",
            "editorial": "Ivrea", 
            "precio": 10990,
            "resena": "Libro de historietas de estilo manga y de género shonen (orientado al público juvenil) encuadernado en rústica de 200 páginas interiores en blanco y negro más cubiertas con sobrecubierta con solapas, sentido de lectura oriental. Los países de Westalis y Ostania libran desde hace años una guerra fría donde el espionaje y los asesinatos son moneda corriente. El inigualable espía conocido como Twilight es el mejor agente de Westalis que tiene por objetivo encargarse del poderoso Donovan Desmond. El problema es que Desmond es un ermitaño antisocial cuyas únicas apariciones públicas son en los actos escolares de su hijo. Twilight deberá acercarse al objetivo lo suficiente como para desbaratar su agenda secreta. Para ello, sólo deberá simular que es un hombre de familia... con el pequeño detalle de que sólo tiene 7 días para conseguir la familia ideal. Es por eso que bajo la identidad del psiquiatra Loid Forger, Twilight reclutará a Yor Briar, una civil ostaniana que quiere tener bajo perfil y Anya, una huerfanita que sólo busca una familia cariñosa, para hacer las partes de esposa e hija respectivamente. Pero resulta que este par tampoco es nada normal, especialmente si tenemos en cuenta que Yor es una asesina profesional buscada por ambos bandos y Anya es una prófuga de un laboratorio secreto donde consiguió poderes telepáticos.",
            "especificaciones": {
                "categoria": "Comics y Manga",
                "sub_categoria": "Manga",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 200
            },
            "stock": 14,
            "imagen": "/assets/img/libros/comics-mangas/Spy-X-Family-10.webp"
        },
        {
            "id": 18,
            "titulo": "Guardianes De La Noche #8",
            "autor": "GOTOUGE, KOYOHARU",
            "editorial": "Norma Editorial", 
            "precio": 10990,
            "resena": "Libro de historietas de estilo manga y de género shonen (orientado al público juvenil) encuadernado en rústica de 192 páginas interiores en blanco y negro más cubiertas con sobrecubierta y sentido de lectura oriental. UN SER MISTERIOSO AMENAZA CON DESTRUIR AL EQUIPO MATADEMONIOS... Tanjirô ejecuta la forma 'cielo inmaculado' de la danza sagrada del dios del fuego para pararle los pies a Enmu, el demonio del sueño. ¡¿Habrá surtido efecto su estrategia?! Por otro lado, un misterioso ser se presenta ante el equipo de Matademonios y obliga al pilar de las llamas Kyôjurô Rengoku a entrar en acción...",
            "especificaciones": {
                "categoria": "Comics y Manga",
                "sub_categoria": "Manga",
                "idioma": "Español",
                "formato": "Tapa Blanda",
                "paginas": 192
            },
            "stock": 6,
            "imagen": "/assets/img/libros/comics-mangas/Guardianes-De-La-Noche-8.webp"
        }
    ]

    obtenerLibros(): Observable<Libro[]> {
        return of(this.libros);
    }

    obtenerLibroPorId(id: number): Observable<Libro | undefined> {
        const libro = this.libros.find((libro) => libro.id === id);
        return of(libro);
    }

}
