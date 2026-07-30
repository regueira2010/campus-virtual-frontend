export function generateCourseCounterHtml(count: number): string {
  const label = count === 1 ? "curso" : "cursos";

  return `
    <div class="course-counter">
      <p>Mostrando <strong>${count}</strong> ${label}</p>
    </div>
  `;
}