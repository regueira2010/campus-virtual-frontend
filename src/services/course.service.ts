import type { Course, CourseRequest, CourseUpdate, ApiErrorResponse } from "../models/Course";
import type { CourseEnrollmentPayload } from "../components/CourseEnrollmentForm/CourseEnrollmentValidator";

const API_BASE = "http://localhost:8080/api/v1/courses";

/**
 * Maneja la respuesta HTTP y parsea errores del GlobalExceptionHandler del backend.
 * Lanza un Error con el mensaje devuelto por el backend si la respuesta no es OK.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `Error HTTP: ${response.status} ${response.statusText}`;
    try {
      const errorBody: ApiErrorResponse = await response.json();
      errorMessage = errorBody.message;
    } catch {
      // Si el body no es JSON válido, usamos el mensaje HTTP por defecto
    }
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}

/** GET /api/v1/courses — Lista todos los cursos del backend */
export async function getCourses(): Promise<Course[]> {
  const response = await fetch(API_BASE);
  return handleResponse<Course[]>(response);
}

/** GET /api/v1/courses/{id} — Obtiene un curso por su ID */
export async function getCourseById(id: string): Promise<Course> {
  const response = await fetch(`${API_BASE}/${id}`);
  return handleResponse<Course>(response);
}

/** POST /api/v1/courses — Crea un nuevo curso */
export async function createCourse(course: CourseRequest): Promise<Course> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  return handleResponse<Course>(response);
}

/** PUT /api/v1/courses/{id} — Actualiza un curso existente */
export async function updateCourse(id: string, course: CourseUpdate): Promise<Course> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  return handleResponse<Course>(response);
}

/** DELETE /api/v1/courses/{id} — Elimina un curso por su ID */
export async function deleteCourse(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!response.ok) {
    let errorMessage = `Error HTTP: ${response.status} ${response.statusText}`;
    try {
      const errorBody: ApiErrorResponse = await response.json();
      errorMessage = errorBody.message;
    } catch {
      // Si el body no es JSON válido, usamos el mensaje HTTP por defecto
    }
    throw new Error(errorMessage);
  }
}

/**
 * Simulación local de inscripción de estudiante.
 * No requiere endpoint en el backend — se mantiene como mock funcional.
 */
export async function enrollStudent(payload: CourseEnrollmentPayload): Promise<{ success: boolean; message: string }> {
  console.log("Enviando payload al servidor:", payload.fullName, payload.email, payload.courseId);
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (payload.email.toLowerCase().includes("error")) {
    throw new Error("Error en el servidor de inscripciones (HTTP 500). Intente más tarde.");
  }

  return {
    success: true,
    message: "¡Inscripción exitosa!",
  };
}
