import type { RequestEvent } from '@sveltejs/kit';
import { teacherService } from '$lib/services/teachers.service';

export function GET(event: RequestEvent) {
  return Response.json(teacherService.listTeachers());
}

export async function POST(event: RequestEvent) {
  const body = await event.request.json();
  const created = teacherService.createTeacher(body);
  return Response.json(created, { status: 201 });
}
