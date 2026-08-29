export enum CourseStatus {
  AVAILABLE = "AVAILABLE",
  IN_PROGRESS = "IN_PROGRESS",
  ARCHIVED = "ARCHIVED"
}

/**
 * Interfaz alineada con CourseResponseDto del backend.
 * Respuesta JSON de GET /api/v1/courses y GET /api/v1/courses/{id}.
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  professor: string;
  startDate: string;
  schedule: string;
  status: CourseStatus;
}

/**
 * Interfaz alineada con CourseRequestDto del backend.
 * Payload para POST /api/v1/courses.
 */
export interface CourseRequest {
  id: string;
  title: string;
  description: string;
  professor: string;
  startDate: string;
  schedule: string;
  status: string;
}

/**
 * Interfaz alineada con CourseUpdateDto del backend.
 * Payload para PUT /api/v1/courses/{id}.
 */
export interface CourseUpdate {
  title: string;
  description: string;
  professor: string;
  startDate: string;
  schedule: string;
  status: string;
}

/**
 * Interfaz alineada con ErrorResponse del GlobalExceptionHandler del backend.
 * Estructura unificada para errores 400, 404, 422 y 500.
 */
export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}