import type { Teacher } from '$lib/types/teacher';

let teachers: Teacher[] = [
  {
    id: crypto.randomUUID(),
    firstName: "Mike",
    lastName: "Anderson",
    subject: "Physics"
  }
];

export const teacherService = {
    listTeachers() {
    return [...teachers];
    },

  createTeacher(teacher: Omit<Teacher, "id">) {
    const newTeacher: Teacher = {
      id: crypto.randomUUID(),
      ...teacher
    };
    teachers.push(newTeacher);
    return newTeacher;
  }
};
