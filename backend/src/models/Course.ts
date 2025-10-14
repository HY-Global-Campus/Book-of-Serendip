import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { CourseExercises } from '../types/exercises';

export interface CourseAttributes {
  id: number;
  exercises: CourseExercises; // TODO: replace with new course exercise types when defined
  mindmap: object | null;
  userId: string;
  displayName: string;
  reflection: string | null;
}

export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}

class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  declare id: number;
  declare exercises: CourseExercises;
  declare mindmap: object | null;
  declare userId: string;
  declare displayName: string;
  declare reflection: string | null;

  static initialize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        exercises: {
          type: DataTypes.JSONB,
          allowNull: false,
        },
        mindmap: {
          type: DataTypes.JSONB,
          allowNull: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        displayName: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "",
        },
        reflection: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Course',
        tableName: 'course',
        underscored: true,
      }
    );
  }
}

export default Course;


