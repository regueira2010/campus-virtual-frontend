import { CourseStatus, type Course } from "../models/Course";

export const coursesList: Course[] = [
  {
    id: "COD-001",
    title: "Fundamentos de JavaScript con TypeScript",
    description: "Aprende JavaScript moderno y TypeScript desde cero con proyectos prácticos.",
    professor: "Prof. Albert Einstein",
    startDate: "2026-08-01",
    schedule: "19:00",
    status: CourseStatus.AVAILABLE,
  },
  {
    id: "COD-002",
    title: "Fundamentos de React con TypeScript",
    description: "Desarrollo de aplicaciones SPA con React y tipado estricto en TypeScript.",
    professor: "Prof. Tomás Alva Edison",
    startDate: "2026-09-15",
    schedule: "21:00",
    status: CourseStatus.IN_PROGRESS,
  },
  {
    id: "COD-003",
    title: "Fundamentos de Node.js con TypeScript",
    description: "Construcción de APIs RESTful con Node.js, Express y TypeScript.",
    professor: "Prof. Nikola Tesla",
    startDate: "2026-10-01",
    schedule: "20:00",
    status: CourseStatus.ARCHIVED,
  },
];