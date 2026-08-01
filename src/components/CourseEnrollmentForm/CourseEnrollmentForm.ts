import { CourseStatus, type Course } from "../../models/Course";
import { CourseEnrollmentValidator, type CourseEnrollmentPayload } from "./CourseEnrollmentValidator";
import { enrollStudent } from "../../services/course.service";

export function generateCourseFormHtml(courses: Course[]): string {
  const available = courses.filter((c) => c.status === CourseStatus.AVAILABLE);

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

        <button type="submit" id="submit-btn" class="btn-primary">Confirmar Inscripción</button>
      </form>
      <div id="form-feedback" class="feedback-message"></div>
    </section>
  `;
}

export function setupCourseFormListener(): void {
  const form = document.getElementById("course-form") as HTMLFormElement | null;
  const nameInput = document.getElementById("student-name") as HTMLInputElement | null;
  const emailInput = document.getElementById("student-email") as HTMLInputElement | null;
  const courseSelect = document.getElementById("course-select") as HTMLSelectElement | null;
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement | null;

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const courseError = document.getElementById("course-error");
  const feedback = document.getElementById("form-feedback");

 if (!form || !nameInput || !emailInput || !courseSelect || !submitBtn || !nameError || !emailError || !courseError || !feedback ) {
    return;
  }

  // Evento para la limpieza de input
  nameInput.addEventListener("input", () => {
    nameInput.value = CourseEnrollmentValidator.formatFullName(nameInput.value);
    nameError.textContent = "";
    feedback.textContent = "";
  });

  emailInput.addEventListener("input", () => {
    emailInput.value = CourseEnrollmentValidator.formatEmail(emailInput.value);
    emailError.textContent = "";
    feedback.textContent = "";
  });

  // Evento para el select de cursos
  courseSelect.addEventListener("change", () => {
    if (courseSelect.value.trim() !== "") {
      courseError.textContent = "";
    }
    feedback.textContent = "";
  });

  // Envío (Submit)
  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload: CourseEnrollmentPayload = {
      fullName: (formData.get("fullName") as string | null) || "",
      email: (formData.get("email") as string | null) || "",
      courseId: (formData.get("courseId") as string | null) || "",
    };

    const { isValid, errors } = CourseEnrollmentValidator.validate(payload);

    feedback.textContent = "";
    feedback.className = "feedback-message";

    nameError.textContent = errors.fullName || "";
    emailError.textContent = errors.email || "";
    courseError.textContent = errors.courseId || "";

    if (!isValid) return;

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Procesando inscripción...";
      
      feedback.className = "feedback-message loading";
      feedback.textContent = "Conectando con el servidor de inscripciones...";

      const response = await enrollStudent(payload);

      const courseTitle = courseSelect.options[courseSelect.selectedIndex].text;
      feedback.className = "feedback-message success";
      feedback.textContent = `${response.message} ${payload.fullName.trim()} (${payload.email.trim()}) ha sido inscrito en "${courseTitle}".`;

      form.reset();
    } catch (error: unknown) {
      feedback.className = "feedback-message error";
      feedback.textContent = error instanceof Error 
        ? error.message 
        : "Ocurrió un error inesperado al procesar la inscripción.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Confirmar Inscripción";
    }
  });
}