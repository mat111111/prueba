# Guía del portfolio (en español)

Esta guía es para vos, no para los visitantes. Explica por qué la página está armada así, cómo personalizarla y cómo publicarla en GitHub paso a paso.

---

## 1. Por qué esta página funciona para un cliente o reclutador

Un reclutador o cliente remoto suele mirar un portfolio **menos de un minuto** antes de decidir si sigue leyendo. Esta página está diseñada para ese minuto:

| Lo que busca el cliente | Cómo lo resuelve la página |
|---|---|
| ¿Qué hacés y para quién? | El hero lo dice en una línea: *junior backend developer focused on secure web apps*. |
| ¿Estás disponible? | El badge verde "Available for part-time remote work" arriba de todo. |
| ¿Vamos a coincidir en horario? | La zona horaria (UTC-3, 1–2 h adelante de Nueva York) aparece en el hero y en "About". Para un cliente de EE.UU. es un argumento de venta fuerte. |
| ¿Sabés resolver problemas reales? | Cada proyecto se cuenta como **Problema → Qué construí → Puntos clave**, no como una lista de tecnologías. |
| ¿Sos honesto con tu nivel? | Dice *junior* y separa "Currently learning". Prometer de más es la forma más rápida de perder un cliente. |
| ¿Cómo es trabajar con vos? | La sección "How I work" explica llamada, presupuesto, avances semanales y entrega. Es lo que más tranquiliza a quien contrata en remoto. |
| ¿Cómo te contacto? | Email con botón de copiar, formulario y links a GitHub y LinkedIn. |

Además, **la página misma demuestra lo que ofrecés**: CSP estricta, cero `innerHTML`, accesibilidad, CI/CD con GitHub Actions y validación automática de HTML. Si un técnico abre el código, ve buenas prácticas de seguridad aplicadas, coherentes con el servicio de "Security review".

---

## 2. Qué hay en el proyecto

```
portfolio/
├── index.html               ← estructura de la página
├── 404.html                 ← página de error personalizada
├── assets/
│   ├── css/styles.css       ← diseño: colores, tipografía, layout
│   ├── js/data.js           ← ⭐ TODO EL CONTENIDO (lo único que editás seguido)
│   ├── js/main.js           ← lógica: dibuja el contenido, idioma, tema, filtros, formulario
│   ├── js/theme-init.js     ← aplica claro/oscuro antes de pintar (evita parpadeo)
│   └── img/favicon.svg      ← ícono de la pestaña
├── docs/                    ← capturas para el README
├── .github/workflows/
│   ├── deploy.yml           ← publica en GitHub Pages en cada push a main
│   └── checks.yml           ← valida HTML y JS en cada push
├── .htmlvalidate.json       ← reglas del validador de HTML
├── README.md                ← lo que ve quien entra al repo (en inglés)
├── GUIA.md                  ← esta guía
├── LICENSE                  ← licencia MIT
├── .gitignore / .editorconfig / robots.txt
```

### Cómo funciona por dentro (resumen técnico)

1. El navegador carga `index.html`, que ya trae los textos en inglés (útil para buscadores y si JavaScript está desactivado).
2. `theme-init.js` se ejecuta primero y pone `data-theme="dark"` o `"light"` en `<html>`, según lo que elegiste antes o la preferencia del sistema.
3. `data.js` define `window.PORTFOLIO` con todo el contenido.
4. `main.js` lee ese objeto y:
   - reemplaza los textos con atributo `data-i18n` por el idioma elegido;
   - construye las tarjetas de servicios, proyectos, habilidades y pasos con `document.createElement` + `textContent`;
   - conecta los botones (idioma, tema, menú, filtros, copiar email, formulario).

**¿Por qué nunca `innerHTML`?** Si algún texto contuviera `<img src=x onerror=alert(1)>`, con `innerHTML` se ejecutaría (eso es un ataque XSS). Con `textContent` se muestra como texto plano. Es exactamente lo que vas a revisar en las apps de tus clientes.

**¿Qué es la CSP?** La etiqueta `<meta http-equiv="Content-Security-Policy">` le dice al navegador: "solo ejecutá scripts y estilos que vengan de este mismo sitio". Por eso no hay `<script>` ni `style="..."` inline: la propia política los bloquearía.

---

## 3. Personalizar (checklist)

### 3.1 Tus datos → `assets/js/data.js`

En el bloque `profile`, reemplazá:

- `name`: tu nombre real.
- `initials`: dos letras para el logo.
- `email`: un email profesional (idealmente `nombre.apellido@...`).
- `github`, `linkedin`, `repo`: tus URLs reales.
- `cvUrl`: dejalo vacío hasta tener el CV en PDF; después ponelo en `assets/cv/cv-en.pdf` y escribí esa ruta.

### 3.2 Los proyectos → `assets/js/data.js`, bloque `projects`

- Busca las líneas con **`⚠ VERIFICAR`**: puse en `tags` solo lo que sé con certeza de cada proyecto. Completá con el stack real (por ejemplo, si el sitio de autor usa Node + Express, o Spring Boot).
- Cambiá cada `links.repo` por la URL real del repositorio. Si un repo es privado, dejalo en `""` y el botón desaparece.
- Si tenés una demo online (Render, GitHub Pages), poné la URL en `links.demo`: aparece un botón "Live demo" destacado. **Una demo vale más que diez líneas de descripción.**
- Revisá el texto de "problem" de cada proyecto y contá la historia real (por qué lo hiciste, para quién).

### 3.3 Textos con datos fijos

- `heroText` y `factTimezoneValue`: mencionan Buenos Aires y UTC-3. Cambialos si corresponde.
- `factAvailabilityValue`: ajustá las horas semanales reales que podés ofrecer.
- Idiomas: si tenés un nivel de inglés que quieras mostrar, agregalo en `aboutP1` o como un dato más en `renderFacts()` de `main.js`. **No inventes un nivel**: si te hacen la entrevista en inglés, se nota.

### 3.4 Lugares fuera de data.js

| Archivo | Qué cambiar |
|---|---|
| `index.html` | `<title>`, `meta author`, `og:title`, `og:url` y los textos "Tu Nombre" / "tu-email" (son el respaldo si JS falla). |
| `README.md` | Nombre, link al sitio en vivo, email, LinkedIn, GitHub. |
| `LICENSE` | "Tu Nombre" en la línea de Copyright. |

Tip: en VS Code usá **Buscar en todos los archivos** (`Cmd + Shift + F` en Mac) y buscá `TU-USUARIO`, `Tu Nombre` y `tu-email`. Cuando no aparezca ninguno, terminaste.

### 3.5 Cambiar el color de marca

En `assets/css/styles.css`, cambiá `--accent`, `--accent-strong` y `--accent-soft` en **los dos temas** (`:root` y `:root[data-theme="dark"]`). Verificá que el texto siga siendo legible (contraste).

---

## 4. Probarlo en tu Mac

Opción rápida: doble clic en `index.html`.

Opción recomendada (igual que en producción), desde la Terminal, dentro de la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Abrí `http://localhost:8000` y probá: cambiar idioma, tema, los filtros de proyectos, enviar el formulario vacío (deben aparecer errores) y achicar la ventana (menú móvil).

---

## 5. Subirlo a GitHub y publicarlo

### 5.1 Elegí el nombre del repositorio

| Nombre del repo | URL resultante | Cuándo conviene |
|---|---|---|
| `TU-USUARIO.github.io` | `https://TU-USUARIO.github.io/` | **Recomendado**: URL más corta y profesional. |
| `portfolio` | `https://TU-USUARIO.github.io/portfolio/` | Si ya usás el otro nombre para algo más. |

### 5.2 Crear el repo y subir el código

1. En GitHub: **New repository** → nombre elegido → **Public** → **sin** README ni .gitignore (ya los tenés) → *Create repository*.
2. En la Terminal, dentro de la carpeta del proyecto:

```bash
git init
git add .
git commit -m "feat: initial portfolio (bilingual, dark mode, strict CSP, CI/CD)"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Si tenés instalada la CLI de GitHub (`gh`), el paso 1 y el remote se pueden reemplazar por:

```bash
gh repo create TU-REPO --public --source=. --push
```

### 5.3 Activar GitHub Pages (una sola vez)

1. En el repo: **Settings → Pages**.
2. En **Build and deployment → Source**, elegí **GitHub Actions**.
3. Andá a la pestaña **Actions**: vas a ver *Deploy to GitHub Pages* corriendo. Si ya había fallado antes de activar Pages, entrá al workflow y tocá **Re-run jobs**.
4. Cuando termine en verde, la URL aparece en Settings → Pages y en el resumen del workflow.

A partir de ahí, **cada `git push` a main publica la nueva versión sola**, en uno o dos minutos.

### 5.4 Alternativa: Render

Ya usás Render para otros proyectos. Si preferís tener todo ahí: **New → Static Site**, conectá el repo, dejá *Build Command* vacío y *Publish directory* en `.`. Si usás Render, podés borrar `deploy.yml`.

---

## 6. Checklist antes de compartir el link

- [ ] No queda ningún `TU-USUARIO`, `Tu Nombre` ni `tu-email` en el proyecto.
- [ ] Los stacks marcados con ⚠ VERIFICAR están corregidos.
- [ ] Todos los links de "Code" abren un repo **con README propio** (un repo sin README resta puntos).
- [ ] Probaste la página en el celular.
- [ ] La pestaña **Actions** muestra los dos workflows en verde.
- [ ] Le pediste a alguien que la mire 30 segundos y te diga qué hacés. Si no lo puede decir, ajustá el hero.
- [ ] Pusiste el link en LinkedIn (sección *Featured* y *Contact info*) y en tu perfil de GitHub.

---

## 7. Agregar un proyecto nuevo

Copiá este bloque dentro del array `projects` de `data.js` (respetá las comas entre objetos):

```js
{
  id: "mi-proyecto",
  year: 2026,
  categories: ["backend"],            // backend | fullstack | frontend | devops (podés inventar otras)
  tags: ["Java", "Spring Boot"],
  links: { repo: "https://github.com/TU-USUARIO/mi-proyecto", demo: "" },
  en: {
    title: "Project name",
    problem: "What problem it solves and for whom.",
    solution: "What you built, in one sentence.",
    highlights: ["Decision or result 1.", "Decision or result 2."]
  },
  es: {
    title: "Nombre del proyecto",
    problem: "Qué problema resuelve y para quién.",
    solution: "Qué construiste, en una oración.",
    highlights: ["Decisión o resultado 1.", "Decisión o resultado 2."]
  }
}
```

Si ponés `featured: true`, la tarjeta ocupa todo el ancho (usalo para un solo proyecto, el mejor). Si usás una categoría nueva, el filtro aparece solo; para darle un nombre lindo, agregala en `CATEGORY_LABELS` de `main.js`.

---

## 8. Problemas comunes

| Síntoma | Causa probable | Solución |
|---|---|---|
| El sitio da 404 en GitHub Pages | Pages no está configurado con *GitHub Actions* | Paso 5.3 y *Re-run jobs*. |
| El workflow *Quality checks* falla | Hay un error de HTML o de sintaxis JS | Entrá al log en Actions: dice archivo y línea. Localmente: `npx html-validate index.html`. |
| Agregué Google Fonts / un script y no carga | La CSP lo bloquea (y está bien que lo haga) | Agregá el dominio a la directiva correspondiente de la CSP en `index.html` (por ejemplo `style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com`). Solo si realmente lo necesitás. |
| Los cambios no se ven | Caché del navegador | `Cmd + Shift + R` para recargar sin caché. |
| Aparece texto en inglés con la página en español | Falta la clave en `i18n.es` | Agregá la misma clave en los dos idiomas. |

---

## 9. Hub de aprendizaje (`aprender.html`)

Es una página aparte con todo el material del plan de trabajo remoto, pensada para estudiar:

| Sección | Qué hace |
|---|---|
| **¿Qué hago hoy?** | Te propone el próximo paso: primero los repasos pendientes, después la siguiente tarea de la ruta. Hasta el 20/11 te recuerda que la prioridad son los parciales. |
| **Ruta por etapas** | Etapa 0 (parciales) y Fases 1 a 3 del PDF, como checklist con progreso. |
| **Temas** | 15 fichas: qué es, por qué importa, primer paso de unos 20 minutos, mini desafío y recursos (gratis o pago). Estado: Pendiente, En curso o Dominado. |
| **Quizzes** | 9 quizzes, 40 preguntas de razonamiento (seguir código, predecir resultados) con explicación. Repaso espaciado: con menos de 80 % vuelve mañana, si aprobás vuelve en 7 días. |
| **Biblioteca y certificaciones** | Libros, canales, podcast y certificaciones del PDF, para marcar. |
| **Plan semanal** | Las 10 a 12 h por semana del PDF. Se reinicia cada lunes. |

**Dónde se guarda el progreso:** en el `localStorage` de tu navegador. Cada visitante ve su propio progreso, no el tuyo. Para pasarlo de la Mac al celular usá **Exportar progreso** y después **Importar progreso** (el archivo importado se valida y se descarta todo lo que no reconoce).

**Editar contenido:** todo está en `assets/js/learn-data.js`. Para agregar una pregunta, copiá una existente dentro de `quizzes`; `answer` es la posición de la opción correcta, empezando en 0.

**Ocultarlo del portfolio:** si preferís que los clientes no vean el link, poné `showLearningHub: false` en `data.js`. La página sigue existiendo en `/aprender.html` para vos. Mostrarlo como "Learning in public" también suma: muestra constancia y método.

---

## 10. Próximos pasos para que el portfolio venda más

1. **README de cada proyecto** con: qué hace, captura o GIF, cómo correrlo (`docker compose up`), decisiones técnicas y qué mejorarías. El Sistema de Stock es el que está más cerca.
2. **Demos en vivo**: subí al menos el Sistema de Stock a Render con datos de ejemplo.
3. **Un proyecto de seguridad propio**, que refuerce el servicio de "Security review". Por ejemplo, una auditoría escrita de tu propio Sistema de Stock contra el OWASP Top 10 (qué revisaste, qué encontraste, cómo lo arreglaste), o write-ups de labs de PortSwigger o TryHackMe.
4. **Tests automatizados** en el Sistema de Stock (JUnit + un workflow de CI). "Tiene tests y CI" es de lo que más diferencia a un junior.
5. **Dominio propio** (por ejemplo `tunombre.dev`): en Settings → Pages → *Custom domain*.
6. **CV en PDF en inglés**, de una página, y activá el botón con `cvUrl`.
