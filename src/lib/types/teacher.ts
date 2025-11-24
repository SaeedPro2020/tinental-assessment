export interface Teacher {
	id: string;
	firstName: string;
	lastName: string;
	subject: string; // e.g. "Mathematics"
}

export interface NewTeacher {
	firstName: string;
	lastName: string;
	subject: string;
}
