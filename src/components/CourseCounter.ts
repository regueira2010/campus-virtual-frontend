export function generateCourseCounterHtml(count: number): string {
  const label = count === 1 ? "curso disponible" : "cursos disponibles";

  return `
    <div class="course-counter">
      <p>Mostrando <strong>${count}</strong> ${label}</p>
    </div>
  `;
}