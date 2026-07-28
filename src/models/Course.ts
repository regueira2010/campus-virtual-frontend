export const CourseStatus = {
  AVAILABLE: "Disponible",
  IN_PROGRESS: "Cursando",
  ARCHIVED: "Archivado"
} as const;

export type CourseStatus = typeof CourseStatus[keyof typeof CourseStatus];

export interface Course {
  id: string;
  title: string;
  professor: string;
  startDate?: Date;
  schedule?: string;
  status: CourseStatus;
}