import type { Course } from "../models/Course";

export async function getCourses(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const response = await fetch("/data/courses.json");

  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
  }

  const data: Course[] = await response.json();
  return data;
}
