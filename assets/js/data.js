/* =====================================================================
   EDITÁ SOLO ESTE ARCHIVO PARA PERSONALIZAR EL PORTFOLIO
   ---------------------------------------------------------------------
   - Todo lo que dice "TU-USUARIO", "Tu Nombre" o "tu-email" es un
     placeholder: reemplazalo por tus datos reales.
   - Cada texto existe en inglés (en) y español (es).
   - Los campos que dejes vacíos ("") se ocultan solos en la página.
   - Líneas marcadas con  ⚠ VERIFICAR  → completá con el stack real.
   ===================================================================== */

window.PORTFOLIO = {
  profile: {
    name: "Tu Nombre",
    initials: "TN",
    email: "tu-email@ejemplo.com",
    github: "https://github.com/TU-USUARIO",
    linkedin: "https://www.linkedin.com/in/TU-USUARIO",
    repo: "https://github.com/TU-USUARIO/portfolio", // link "View source" del footer
    cvUrl: "", // ej: "assets/cv/cv-en.pdf"  (vacío = botón oculto)
    showLearningHub: true, // false = oculta los links al hub de aprendizaje (aprender.html)
    location: "Buenos Aires, Argentina",
    timezone: "UTC-3"
  },

  /* ---------------- Textos fijos de la interfaz ---------------- */
  i18n: {
    en: {
      metaRole: "Junior Backend Developer",
      metaDescription:
        "Junior backend developer (Java, Spring Boot, PostgreSQL, Docker) focused on secure, well-documented web apps. Available for part-time remote work.",
      skip: "Skip to content",
      navAbout: "About",
      navServices: "Services",
      navProjects: "Projects",
      navSkills: "Skills",
      navContact: "Contact",
      navLearn: "Learning",
      learnTitle: "Learning in public",
      learnText: "My study roadmap: topics, resources and the quizzes I use to practice (in Spanish).",
      langToggle: "Cambiar a español",
      themeToggle: "Toggle dark mode",
      menuOpen: "Open menu",
      available: "Available for part-time remote work",
      heroHello: "Hi, I'm",
      heroRole: "Junior backend developer focused on secure, well-documented web applications.",
      heroText:
        "I build REST APIs with Java and Spring Boot, ship them in Docker, and check them against the OWASP Top 10. I'm based in Buenos Aires (UTC-3), 1 to 2 hours ahead of New York, so we overlap during your whole workday.",
      ctaProjects: "See my projects",
      ctaContact: "Let's talk",
      ctaCv: "Download CV",
      terminalLabel: "Terminal summary: junior backend developer, Java, Spring Boot, PostgreSQL and Docker, available in UTC-3.",
      aboutTitle: "About me",
      aboutP1:
        "I'm studying the University Technician degree in Programming at UTN (Universidad Tecnológica Nacional, Buenos Aires) and I build real projects alongside my courses. I like turning a fuzzy problem into a small, working, documented solution.",
      aboutP2:
        "My courses in operating systems (processes, concurrency, memory) and data structures give me solid fundamentals; my projects are where I practice shipping. I'm growing towards application security: writing backends that are correct and hard to break.",
      factLocation: "Location",
      factTimezone: "Timezone",
      factTimezoneValue: "UTC-3 · 1–2 h ahead of US Eastern",
      factAvailability: "Availability",
      factAvailabilityValue: "10–15 h/week, contract or part-time",
      factEducation: "Education",
      factEducationValue: "UTN Buenos Aires · Programming (in progress)",
      servicesTitle: "What I can do for you",
      servicesIntro: "Small and medium tasks with a clear scope, a fixed price per milestone and written progress updates.",
      projectsTitle: "Selected projects",
      projectsIntro: "Each project lists the problem, what I built and the decisions behind it.",
      filterAll: "All",
      filterLabel: "Filter projects by area",
      showing: "Showing {n} of {total} projects",
      featured: "Featured",
      problem: "Problem",
      solution: "What I built",
      highlights: "Highlights",
      code: "Code",
      demo: "Live demo",
      skillsTitle: "Skills",
      skillsIntro: "What I use in my projects, and what I'm currently learning.",
      processTitle: "How I work",
      processIntro: "Remote work runs on clarity. This is what you can expect from me.",
      contactTitle: "Let's work together",
      contactText:
        "Tell me what you need and your deadline. I usually reply within one business day with questions or a first estimate.",
      copyEmail: "Copy email",
      copied: "Email copied to the clipboard.",
      copyFail: "Couldn't copy. Select the address and copy it manually.",
      formName: "Your name",
      formEmail: "Your email",
      formType: "Type of project",
      typeApi: "Backend / API",
      typeDocker: "Docker & deployment",
      typeSecurity: "Security review",
      typeBug: "Bug fix / maintenance",
      typeOther: "Other",
      formMessage: "Message",
      formHint: "What do you need, by when, and any links (repo, site).",
      formSend: "Send via email",
      formOk: "Your email app should open now. If it doesn't, write to me at {email}.",
      errRequired: "This field is required.",
      errEmail: "Enter a valid email address.",
      errShort: "Please write at least 20 characters.",
      emailSubject: "Project inquiry",
      footerBuilt: "Hand-coded with HTML, CSS and vanilla JavaScript · no trackers · strict Content Security Policy.",
      footerSource: "View source"
    },
    es: {
      metaRole: "Desarrollador Backend Junior",
      metaDescription:
        "Desarrollador backend junior (Java, Spring Boot, PostgreSQL, Docker) enfocado en aplicaciones web seguras y bien documentadas. Disponible para trabajo remoto part-time.",
      skip: "Saltar al contenido",
      navAbout: "Sobre mí",
      navServices: "Servicios",
      navProjects: "Proyectos",
      navSkills: "Habilidades",
      navContact: "Contacto",
      navLearn: "Aprendizaje",
      learnTitle: "Aprendiendo en público",
      learnText: "Mi ruta de estudio: temas, recursos y los quizzes con los que practico.",
      langToggle: "Switch to English",
      themeToggle: "Cambiar modo oscuro",
      menuOpen: "Abrir menú",
      available: "Disponible para trabajo remoto part-time",
      heroHello: "Hola, soy",
      heroRole: "Desarrollador backend junior enfocado en aplicaciones web seguras y bien documentadas.",
      heroText:
        "Construyo APIs REST con Java y Spring Boot, las entrego en Docker y las reviso contra el OWASP Top 10. Estoy en Buenos Aires (UTC-3), 1 a 2 horas adelante de Nueva York, así que coincidimos durante toda tu jornada.",
      ctaProjects: "Ver mis proyectos",
      ctaContact: "Hablemos",
      ctaCv: "Descargar CV",
      terminalLabel: "Resumen en terminal: desarrollador backend junior, Java, Spring Boot, PostgreSQL y Docker, disponible en UTC-3.",
      aboutTitle: "Sobre mí",
      aboutP1:
        "Estudio la Tecnicatura Universitaria en Programación en la UTN (Universidad Tecnológica Nacional, Buenos Aires) y construyo proyectos reales en paralelo a la cursada. Me gusta convertir un problema difuso en una solución chica, funcionando y documentada.",
      aboutP2:
        "Las materias de sistemas operativos (procesos, concurrencia, memoria) y estructuras de datos me dan fundamentos sólidos; en los proyectos practico entregar. Estoy creciendo hacia la seguridad de aplicaciones: backends correctos y difíciles de romper.",
      factLocation: "Ubicación",
      factTimezone: "Zona horaria",
      factTimezoneValue: "UTC-3 · 1–2 h adelante del este de EE.UU.",
      factAvailability: "Disponibilidad",
      factAvailabilityValue: "10–15 h/semana, por contrato o part-time",
      factEducation: "Formación",
      factEducationValue: "UTN Buenos Aires · Programación (en curso)",
      servicesTitle: "Qué puedo hacer por vos",
      servicesIntro: "Tareas chicas y medianas con alcance claro, precio fijo por hito y avances por escrito.",
      projectsTitle: "Proyectos destacados",
      projectsIntro: "Cada proyecto muestra el problema, lo que construí y las decisiones detrás.",
      filterAll: "Todos",
      filterLabel: "Filtrar proyectos por área",
      showing: "Mostrando {n} de {total} proyectos",
      featured: "Destacado",
      problem: "Problema",
      solution: "Qué construí",
      highlights: "Puntos clave",
      code: "Código",
      demo: "Demo en vivo",
      skillsTitle: "Habilidades",
      skillsIntro: "Lo que uso en mis proyectos y lo que estoy aprendiendo ahora.",
      processTitle: "Cómo trabajo",
      processIntro: "El trabajo remoto funciona con claridad. Esto es lo que podés esperar de mí.",
      contactTitle: "Trabajemos juntos",
      contactText:
        "Contame qué necesitás y para cuándo. Suelo responder en un día hábil con preguntas o un primer presupuesto.",
      copyEmail: "Copiar email",
      copied: "Email copiado al portapapeles.",
      copyFail: "No se pudo copiar. Seleccioná la dirección y copiala a mano.",
      formName: "Tu nombre",
      formEmail: "Tu email",
      formType: "Tipo de proyecto",
      typeApi: "Backend / API",
      typeDocker: "Docker y despliegue",
      typeSecurity: "Revisión de seguridad",
      typeBug: "Bug / mantenimiento",
      typeOther: "Otro",
      formMessage: "Mensaje",
      formHint: "Qué necesitás, para cuándo y links (repo, sitio).",
      formSend: "Enviar por email",
      formOk: "Se debería abrir tu app de correo. Si no, escribime a {email}.",
      errRequired: "Este campo es obligatorio.",
      errEmail: "Ingresá un email válido.",
      errShort: "Escribí al menos 20 caracteres.",
      emailSubject: "Consulta por proyecto",
      footerBuilt: "Hecho a mano con HTML, CSS y JavaScript puro · sin trackers · Content Security Policy estricta.",
      footerSource: "Ver código"
    }
  },

  /* ---------------- Servicios ---------------- */
  services: [
    {
      icon: "code",
      en: { title: "REST APIs & backends", text: "Java + Spring Boot APIs with server-side validation, clear error handling and PostgreSQL. Documented so the next developer can pick it up." },
      es: { title: "APIs REST y backends", text: "APIs en Java + Spring Boot con validación del lado del servidor, manejo de errores claro y PostgreSQL. Documentadas para que otro dev pueda continuarlas." }
    },
    {
      icon: "layers",
      en: { title: "Docker & deployment", text: "I containerize your app with Docker Compose and deploy it to Render or similar, with environment variables and secrets kept out of the code." },
      es: { title: "Docker y despliegue", text: "Dockerizo tu app con Docker Compose y la despliego en Render o similar, con variables de entorno y secretos fuera del código." }
    },
    {
      icon: "shield",
      en: { title: "Basic security review", text: "A checklist review of your web app against the OWASP Top 10: input validation, auth, secrets, headers. You get a written report with fixes ranked by risk." },
      es: { title: "Revisión de seguridad básica", text: "Revisión con checklist de tu app web contra el OWASP Top 10: validación, autenticación, secretos, headers. Recibís un informe con arreglos ordenados por riesgo." }
    },
    {
      icon: "tool",
      en: { title: "Bug fixing & maintenance", text: "Well-scoped tasks: fixing a bug, adding a feature, writing tests or a README. Fixed price per milestone, no surprises." },
      es: { title: "Bugs y mantenimiento", text: "Tareas acotadas: arreglar un bug, sumar una función, escribir tests o un README. Precio fijo por hito, sin sorpresas." }
    }
  ],

  /* ---------------- Proyectos ----------------
     categories: se usan para los filtros (backend, fullstack, frontend, devops)
     links.repo / links.demo: vacío = no se muestra el botón              */
  projects: [
    {
      id: "stock",
      featured: true,
      year: 2026,
      categories: ["backend", "fullstack", "devops"],
      tags: ["Java 17", "Spring Boot 3", "PostgreSQL", "Docker Compose", "Bootstrap 5", "Vanilla JS"],
      links: { repo: "https://github.com/TU-USUARIO/stock-manager", demo: "" },
      en: {
        title: "Stock & Inventory Management System",
        problem: "Small shops track stock on paper or spreadsheets, and expired products go unnoticed until it's too late.",
        solution: "A full-stack web app to manage products and batches with expiry alerts, built on a layered Spring Boot API and fully containerized.",
        highlights: [
          "Business rules enforced on the server: stock can never go below zero and required fields are validated.",
          "Batches with optional expiry dates; expired items are flagged in the table and summarized on start-up.",
          "Search by name with autocomplete from existing products.",
          "Runs with a single `docker compose up`: multi-stage build, app and database orchestrated together."
        ]
      },
      es: {
        title: "Sistema de Gestión de Stock e Inventario",
        problem: "Los comercios chicos controlan el stock en papel o planillas, y los productos vencidos pasan desapercibidos hasta que es tarde.",
        solution: "Una app web full stack para gestionar productos y lotes con alertas de vencimiento, sobre una API en capas con Spring Boot y 100 % dockerizada.",
        highlights: [
          "Reglas de negocio validadas en el servidor: el stock nunca baja de cero y los campos obligatorios se validan.",
          "Lotes con fecha de vencimiento opcional; los vencidos se marcan en la tabla y se resumen al iniciar.",
          "Búsqueda por nombre con autocompletado de productos existentes.",
          "Se levanta con un solo `docker compose up`: build multi-stage, app y base de datos orquestadas."
        ]
      }
    },
    {
      id: "academia-byte",
      year: 2026,
      categories: ["frontend"],
      tags: ["HTML", "CSS", "JavaScript", "Gamification"], // ⚠ VERIFICAR stack real
      links: { repo: "https://github.com/TU-USUARIO/academia-byte", demo: "" },
      en: {
        title: "Academia Byte: interactive learning platform",
        problem: "Learning to code alone is hard to sustain without practice and immediate feedback.",
        solution: "A platform with courses on networking, cybersecurity, SQL, Python and C++, plus modules for my university courses.",
        highlights: [
          "Auto-graded exercises with instant feedback.",
          "Gamification: XP, levels, avatars and a ranking.",
          "Deployable as a static site (GitHub Pages or Render)."
        ]
      },
      es: {
        title: "Academia Byte: plataforma interactiva de aprendizaje",
        problem: "Aprender a programar solo es difícil de sostener sin práctica y feedback inmediato.",
        solution: "Una plataforma con cursos de redes, ciberseguridad, SQL, Python y C++, más módulos de mis materias de la facultad.",
        highlights: [
          "Ejercicios autocorregidos con feedback al instante.",
          "Gamificación: XP, niveles, avatares y ranking.",
          "Desplegable como sitio estático (GitHub Pages o Render)."
        ]
      }
    },
    {
      id: "author-site",
      year: 2026,
      categories: ["fullstack"],
      tags: ["Authentication", "Admin panel", "Render", "CI from GitHub"], // ⚠ VERIFICAR stack real
      links: { repo: "https://github.com/TU-USUARIO/sitio-autor", demo: "" },
      en: {
        title: "Author website & bookstore",
        problem: "A writer needed a professional site to present their work and sell books, without a generic template look.",
        solution: "A site with biography, book catalogue, buyer accounts and a private admin panel to edit content.",
        highlights: [
          "Separate roles: buyers and admin.",
          "Content editable from the admin panel, no code changes needed.",
          "Continuous deployment from GitHub to Render."
        ]
      },
      es: {
        title: "Sitio de autor y tienda de libros",
        problem: "Un escritor necesitaba un sitio profesional para presentar su obra y vender libros, sin aspecto de plantilla genérica.",
        solution: "Un sitio con biografía, catálogo de libros, cuentas de compradores y un panel de administración privado.",
        highlights: [
          "Roles separados: compradores y administrador.",
          "Contenido editable desde el panel, sin tocar código.",
          "Despliegue continuo desde GitHub a Render."
        ]
      }
    },
    {
      id: "dunlosky",
      year: 2026,
      categories: ["fullstack", "devops"],
      tags: ["Docker", "Render"], // ⚠ VERIFICAR stack real
      links: { repo: "https://github.com/TU-USUARIO/estudio-dunlosky", demo: "" },
      en: {
        title: "Estudio Dunlosky: evidence-based study app",
        problem: "Most students re-read and highlight, techniques that research rates as low-utility.",
        solution: "A study app built around the high-utility techniques identified by Dunlosky et al. (2013): practice testing and distributed practice.",
        highlights: [
          "Runs in Docker for a reproducible setup on any machine.",
          "Deployed to Render from GitHub so other students can use it."
        ]
      },
      es: {
        title: "Estudio Dunlosky: app de estudio basada en evidencia",
        problem: "La mayoría de los estudiantes relee y subraya, técnicas que la investigación califica de baja utilidad.",
        solution: "Una app de estudio basada en las técnicas de alta utilidad identificadas por Dunlosky et al. (2013): autoevaluación y práctica espaciada.",
        highlights: [
          "Corre en Docker para tener el mismo entorno en cualquier máquina.",
          "Desplegada en Render desde GitHub para que la usen otros estudiantes."
        ]
      }
    }
  ],

  /* ---------------- Habilidades ---------------- */
  skills: [
    { en: "Languages", es: "Lenguajes", items: ["Java", "C++", "JavaScript", "SQL"] },
    { en: "Backend", es: "Backend", items: ["Spring Boot", "REST APIs", "PostgreSQL", "Maven"] },
    { en: "DevOps & tools", es: "DevOps y herramientas", items: ["Docker", "Docker Compose", "Git & GitHub", "Render", "Linux CLI"] },
    { en: "Frontend", es: "Frontend", items: ["HTML5", "CSS3", "Bootstrap 5", "Vanilla JS"] },
    { en: "Fundamentals", es: "Fundamentos", items: ["Operating systems", "Concurrency", "Data structures", "Discrete math"] },
    { en: "Currently learning", es: "Aprendiendo ahora", learning: true, items: ["OWASP Top 10", "Python", "AWS basics", "Automated testing"] }
  ],

  /* ---------------- Cómo trabajo ---------------- */
  process: [
    {
      en: { title: "Short call", text: "15–30 minutes to understand the problem, the deadline and the budget." },
      es: { title: "Llamada corta", text: "15 a 30 minutos para entender el problema, el plazo y el presupuesto." }
    },
    {
      en: { title: "Written estimate", text: "Scope, milestones and price in writing, before I write a line of code." },
      es: { title: "Presupuesto por escrito", text: "Alcance, hitos y precio por escrito, antes de escribir una línea de código." }
    },
    {
      en: { title: "Weekly updates", text: "Progress, blockers and next steps, written and async-friendly." },
      es: { title: "Avances semanales", text: "Progreso, bloqueos y próximos pasos, por escrito y sin necesidad de reuniones." }
    },
    {
      en: { title: "Delivery & handover", text: "Code in your repository, a README and clear instructions to run it." },
      es: { title: "Entrega y traspaso", text: "Código en tu repositorio, un README e instrucciones claras para correrlo." }
    }
  ]
};
