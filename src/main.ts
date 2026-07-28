import "./style.css";
import { coursesList } from "./data/courses.data";
import { generateCourseCardHtml } from "./components/CourseCard";

console.log("Listado de Cursos:", coursesList);

const appContainer = document.getElementById("app");

if (appContainer !== null) {
  appContainer.innerHTML = `
    <main class="container">
      <h1>Campus Virtual - Cursos</h1>
      <ul class="courses-list">
        ${coursesList.map((course) => generateCourseCardHtml(course)).join("")}
      </ul>
    </main>
  `;
}
