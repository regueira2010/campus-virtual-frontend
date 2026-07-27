import "./style.css";
import { coursesList } from "./data/courses.data";

console.log("Listado de Cursos:", coursesList);

const appContainer = document.getElementById("app");

if (appContainer !== null) {
  appContainer.innerHTML = `
    <main class="container">
      <h1>Campus Virtual - Cursos</h1>
      <ul style="text-align: left;">
        ${coursesList
          .map(
            (course) => `
          <li>
            <strong>${course.title}</strong> - ${course.professor} (${course.status})
          </li>
        `
          )
          .join("")}
      </ul>
    </main>
  `;
}
