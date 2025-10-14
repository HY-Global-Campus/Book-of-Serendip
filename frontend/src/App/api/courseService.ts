import api from './axiosInstance';
import { CourseExercises } from '../../types/exercises';
import { MindMap } from '../../types/mindmap';

export interface Course {
  id: number;
  exercises: CourseExercises; // TODO: replace with new types after shared types update
  mindmap: MindMap;
  displayName: string;
  reflection: string;
}

export const getAllCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>('/course');
  return response.data;
};

export const getCourseById = async (id: number): Promise<Course> => {
  const response = await api.get<Course>(`/course/${id}`);
  return response.data;
};

export const getCourseByUserId = async (id: string): Promise<Course> => {
  const response = await api.get<Course>(`/course/user/${id}`);
  return response.data;
};

export const createCourse = async (course: Omit<Course, 'id'>): Promise<Course> => {
  const response = await api.post<Course>('/course', course);
  return response.data;
};

export const updateCourse = async (id: number, course: Partial<Course>): Promise<Course> => {
  const response = await api.put<Course>(`/course/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await api.delete(`/course/${id}`);
};


