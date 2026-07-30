import "./style.css";
import { getCourses } from "./services/course.service";
import { generateCourseCardHtml } from "./components/CourseCard";

const appContainer = document.getElementById("app");

async function renderApp() {
  if (appContainer === null) return;

  appContainer.innerHTML = `
    <main class="container">
      <h1>Campus Virtual - Cursos</h1>
      <p class="loading-message">⏳ Cargando listado de cursos...</p>
    </main>
  `;

  try {
    const courses = await getCourses();

    appContainer.innerHTML = `
      <main class="container">
        <h1>Campus Virtual - Cursos</h1>
        <ul class="courses-list">
          ${courses.map((course) => generateCourseCardHtml(course)).join("")}
        </ul>
      </main>
    `;
  } catch (error) {
    console.error("Error al obtener cursos:", error);

    appContainer.innerHTML = `
      <main class="container">
        <h1>Campus Virtual - Cursos</h1>
        <div class="error-banner">
          ⚠️ No se puede obtener la data. Intente nuevamente más tarde.
        </div>
      </main>
    `;
  }
}

renderApp();
