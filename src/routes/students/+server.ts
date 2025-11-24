import type { RequestEvent } from '@sveltejs/kit';
import { studentService } from '$lib/services/students.service';

export function GET(event: RequestEvent) {
  return Response.json(studentService.listStudents());
}

export async function POST(event: RequestEvent) {
  const body = await event.request.json();
  const created = studentService.createStudent(body);
  return Response.json(created, { status: 201 });
}
