import { CourseStatus, type Course } from "../models/Course";

export function generateCourseCardHtml(course: Course): string {
  const statusClassMap: Record<CourseStatus, string> = {
    [CourseStatus.AVAILABLE]: "status--available",
    [CourseStatus.IN_PROGRESS]: "status--in-progress",
    [CourseStatus.ARCHIVED]: "status--archived",
  };

  const statusClass = statusClassMap[course.status] || "";

  return `
    <li class="course-card">
      <h3>${course.title}</h3>
      <p><strong>Profesor:</strong> ${course.professor}</p>
      <p><strong>Estado:</strong> <span class="status ${statusClass}">${course.status}</span></p>
      ${course.schedule ? `<p><strong>Horario:</strong> ${course.schedule}</p>` : ""}
    </li>
  `;
}
