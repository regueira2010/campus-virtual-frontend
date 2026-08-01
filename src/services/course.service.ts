import type { Course } from "../models/Course";
import type { CourseEnrollmentPayload } from "../components/CourseEnrollmentForm/CourseEnrollmentValidator";

export async function getCourses(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const response = await fetch("/data/courses.json");

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
  }

  const data: Course[] = await response.json();
  return data;
}

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
