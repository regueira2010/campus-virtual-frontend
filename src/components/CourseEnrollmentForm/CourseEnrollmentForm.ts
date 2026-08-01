import type { Course } from "../../models/Course";
import { CourseEnrollmentValidator, type CourseEnrollmentPayload } from "./CourseEnrollmentValidator";

export function generateCourseFormHtml(courses: Course[]): string {
  const available = courses.filter((c) => c.status === "Disponible");

  return `
    <section class="form-container">
      <h2>Inscripción a Curso</h2>
      <form id="course-form" novalidate>
        <div class="form-group">
          <label for="student-name">Nombre Completo:</label>
          <input type="text" id="student-name" name="fullName" placeholder="Ej: Ana Pérez" />
          <span class="error-message" id="name-error"></span>
        </div>

        <div class="form-group">
          <label for="student-email">Correo Electrónico:</label>
          <input type="email" id="student-email" name="email" placeholder="ejemplo@correo.com" />
          <span class="error-message" id="email-error"></span>
        </div>

        <div class="form-group">
          <label for="course-select">Curso a Inscribir:</label>
          <select id="course-select" name="courseId">
            <option value="" selected disabled>-- Seleccione un curso --</option>
            ${available.map((c) => `<option value="${c.id}">${c.title}</option>`).join("")}
          </select>
          <span class="error-message" id="course-error"></span>
        </div>

        <button type="submit" class="btn-primary">Confirmar Inscripción</button>
      </form>
      <div id="form-feedback" class="feedback-message"></div>
    </section>
  `;
}

export function setupCourseFormListener(): void {
  const form = document.getElementById("course-form") as HTMLFormElement | null;
  if (!form) return;

  const nameInput = document.getElementById("student-name") as HTMLInputElement | null;
  const emailInput = document.getElementById("student-email") as HTMLInputElement | null;
  const courseSelect = document.getElementById("course-select") as HTMLSelectElement | null;

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const courseError = document.getElementById("course-error");
  const feedback = document.getElementById("form-feedback");

  // 1. Eventos de entrada para los textos (limpian error al escribir)
  if (nameInput) {
    nameInput.addEventListener("input", () => {
      nameInput.value = CourseEnrollmentValidator.formatFullName(nameInput.value);
      if (nameError) nameError.textContent = "";
      if (feedback) feedback.textContent = "";
    });
  }

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      emailInput.value = CourseEnrollmentValidator.formatEmail(emailInput.value);
      if (emailError) emailError.textContent = "";
      if (feedback) feedback.textContent = "";
    });
  }

  // 2. Evento explícito sobre el SELECT (limpia el error INMEDIATAMENTE al cambiar)
  if (courseSelect) {
    courseSelect.addEventListener("change", () => {
      if (courseSelect.value.trim() !== "") {
        if (courseError) courseError.textContent = "";
      }
      if (feedback) feedback.textContent = "";
    });
  }

  // 3. Submit del Formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload: CourseEnrollmentPayload = {
      fullName: nameInput?.value || "",
      email: emailInput?.value || "",
      courseId: courseSelect?.value || "",
    };

    const { isValid, errors } = CourseEnrollmentValidator.validate(payload);

    if (feedback) {
      feedback.textContent = "";
      feedback.className = "feedback-message";
    }

    // Renderizar mensajes de error
    if (nameError) nameError.textContent = errors.fullName || "";
    if (emailError) emailError.textContent = errors.email || "";
    if (courseError) courseError.textContent = errors.courseId || "";

    // Renderizar éxito si todo es correcto
    if (isValid && feedback && courseSelect) {
      feedback.className = "feedback-message success";
      feedback.textContent = `¡Inscripción exitosa! ${payload.fullName.trim()} (${payload.email.trim()}) ha sido inscrito en "${courseSelect.options[courseSelect.selectedIndex].text}".`;

      form.reset();
    }
  });
}