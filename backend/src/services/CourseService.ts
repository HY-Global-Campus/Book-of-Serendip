import User from '../models/user.js';
import Course from '../models/Course.js';
import { CourseAttributes, CourseCreationAttributes } from '../models/Course.js';
import { CourseExercises } from '../types/exercises.js';

export const findAllCourses = async () => {
  return await Course.findAll();
};

export const findCourseById = async (id: number) => {
  return await Course.findByPk(id);
};

export const findCourseByUserId = async (userId: string) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return null;
  }

  let course = await Course.findOne({ where: { userId }, include: [User] });

  if (!course) {
    const exercises: CourseExercises = {
      courseInfo: {
        name: '',
        scope: '',
        targetStudents: '',
        studentsSkillLevel: '',
      },
      learningObjectives: {
        learningOutcomes: '',
      },
      coreContent: {
        coreContentLeft: '',
        coreContentRight: '',
      },
      teachingMethods: {
        value: Array(4).fill(null).map(() => ['', '', '']),
      },
      assessmentMethods: {
        value: Array(4).fill(null).map(() => ['', '', '']),
      },
      gradingCriteriaReflection: {
        gradingCriteria: '',
        reflection: '',
      },
    };

    const mindmap = {
      nodes: [
        {
          id: 'root',
          type: 'root',
          data: { label: 'Chosen challenge' },
          position: { x: 0, y: 0 },
        },
      ],
      edges: [],
    };

    course = await Course.create({ userId, exercises, mindmap, displayName: '', reflection: '' });
  }

  return course;
};

export const createCourse = async (courseData: CourseCreationAttributes) => {
  return await Course.create(courseData);
};

export const updateCourse = async (id: number, courseData: Partial<CourseAttributes>) => {
  const course = await Course.findByPk(id);
  if (!course) {
    return null;
  }
  return await course.update(courseData);
};

export const deleteCourse = async (id: number) => {
  const course = await Course.findByPk(id);
  if (!course) {
    return null;
  }
  await course.destroy();
  return course;
};


