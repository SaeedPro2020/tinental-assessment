import { describe, it, expect } from 'vitest';
import { teacherService } from '$lib/services/teachers.service';

describe('TeachersService', () => {
  it('creates a valid teacher', () => {
    const teacher = teacherService.createTeacher({
      firstName: 'Alice',
      lastName: 'Smith',
      subject: 'Mathematics'
    });

    expect(teacher).toHaveProperty('id');
    expect(teacher.subject).toBe('Mathematics');
  });

  it('fails if subject is empty', () => {
    expect(() =>
      teacherService.createTeacher({
        firstName: 'Alice',
        lastName: 'Smith',
        subject: ''
      })
    ).toThrow('Subject is required');
  });
});
