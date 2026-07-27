import { CourseStatus, type Course } from "../models/Course";

export const coursesList: Course[] = [
  {
    id: "1",
    title: "Fundamentos de JavaScript con TypeScript",
    professor: "Prof. Albert Einstein",
    startDate: new Date("2026-08-01"),
    schedule: "19:00",
    status: CourseStatus.SCHEDULED,
  },
  {
    id: "2",
    title: "Fundamentos de React con TypeScript",
    professor: "Prof. Tomás Alva Edison",
    startDate: new Date("2026-09-15"),
    schedule: "21:00",
    status: CourseStatus.IN_PROGRESS,
  },
  {
    id: "3",
    title: "Fundamentos de Node.js con TypeScript",
    professor: "Prof. Nikola Tesla",
    startDate: new Date("2026-10-01"),
    schedule: "20:00",
    status: CourseStatus.FINISHED,
  },
];