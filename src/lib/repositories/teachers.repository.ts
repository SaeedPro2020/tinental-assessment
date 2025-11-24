import type { Teacher, NewTeacher } from '$lib/types/teacher';

let teachers: Teacher[] = []; // in-memory mock data

export const TeachersRepository = {
	findAll: (): Teacher[] => {
		return teachers;
	},

	add: (data: NewTeacher): Teacher => {
		const newTeacher: Teacher = {
			id: crypto.randomUUID(),
			...data
		};
		teachers.push(newTeacher);
		return newTeacher;
	},

    reset() {
        teachers = [];
    }
};
