/**
 * Service layer for Students.
 * Handles simple in-memory list operations used by the demo pages.
 */
import type { Student } from "$lib/types/student";

let students: Student[] = [
  {
    id: crypto.randomUUID(),
    firstName: "John",
    lastName: "Doe",
    age: 14,
    class: "2A"
  },
  {
    id: crypto.randomUUID(),
    firstName: "Sara",
    lastName: "Miller",
    age: 13,
    class: "1B"
  }
];

export const studentService = {
  listStudents() {
    return [...students]; // return NEW array reference
  },

  createStudent(student: Omit<Student, "id">) {
    const newStudent: Student = {
      id: crypto.randomUUID(),
      ...student,
    };
    students.push(newStudent);
    return newStudent;
  },
};
