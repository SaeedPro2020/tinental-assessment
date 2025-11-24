import { studentService } from '$lib/services/students.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const students = studentService.listStudents();
  return { students };
};
