import type { PageServerLoad } from './$types';
import { teacherService } from '$lib/services/teachers.service';

export const load: PageServerLoad = async () => {
  const teachers = teacherService.listTeachers();
  return { teachers };
};
