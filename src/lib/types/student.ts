export interface Student {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	class: string; // e.g. "3A"
}

export interface NewStudent {
	firstName: string;
	lastName: string;
	age: number;
	class: string;
}
