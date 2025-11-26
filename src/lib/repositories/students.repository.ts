/**
 * In-memory Students repository used by the demo services.
 * Simple CRUD helpers — no persistence.
 */
import type { Student, NewStudent } from '$lib/types/student';

let students: Student[] = []; // in-memory mock data

export const StudentsRepository = {
	findAll: (): Student[] => {
		return students;
	},

	add: (data: NewStudent): Student => {
		const newStudent: Student = {
			id: crypto.randomUUID(),
			...data,
		};
		students.push(newStudent);
		return newStudent;
	},

	reset() {
		students = [];
	},
};
