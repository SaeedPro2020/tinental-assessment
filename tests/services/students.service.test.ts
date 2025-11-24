import { describe, it, expect, beforeEach } from 'vitest';
import { studentService } from '$lib/services/students.service';
import { StudentsRepository } from '$lib/repositories/students.repository';

beforeEach(() => {
    StudentsRepository.reset();
});

describe('StudentsService', () => {
  it('creates a valid student', () => {
    const student = studentService.createStudent({
      firstName: 'John',
      lastName: 'Doe',
      age: 14,
      class: '3A'
    });

    expect(student).toHaveProperty('id');
    expect(student.firstName).toBe('John');
    expect(student.class).toBe('3A');
  });

  it('fails if firstName is empty', () => {
    expect(() =>
      studentService.createStudent({
        firstName: '',
        lastName: 'Doe',
        age: 14,
        class: '3A'
      })
    ).toThrow('First name is required');
  });

  it('fails if age is invalid', () => {
    expect(() =>
      studentService.createStudent({
        firstName: 'John',
        lastName: 'Doe',
        age: -1,
        class: '3A'
      })
    ).toThrow('Age must be positive');
  });

  it('fails if class format is invalid', () => {
    expect(() =>
      studentService.createStudent({
        firstName: 'John',
        lastName: 'Doe',
        age: 14,
        class: 'AAA'
      })
    ).toThrow('Class must follow format like "3A"');
  });
});
