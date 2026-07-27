export const CourseStatus = {
  SCHEDULED: "SCHEDULED",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED"
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