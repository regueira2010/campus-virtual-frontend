export enum CourseStatus {
  AVAILABLE = "Disponible",
  IN_PROGRESS = "Cursando",
  ARCHIVED = "Archivado"
}

export interface Course {
  id: string;
  title: string;
  professor: string;
  startDate?: Date;
  schedule?: string;
  status: CourseStatus;
}