
import User from '../models/user.js';
import BookOne from '../models/BookOne.js';
import { BookOneAttributes, BookOneCreationAttributes } from '../models/BookOne.js';
import { BookOneExercises } from '../types/exercises.js';

// Fetch all BookOne entries
export const findAllBookOnes = async () => {
  return await BookOne.findAll();
};

export const findBookOneById = async (id: number) => {
  return await BookOne.findByPk(id);
};

export const findBookOneByUserId = async (userId: string) => {
  let book = await BookOne.findOne({
    where: { userId },
    include: [User],
  });

  if (!book) {
    console.log('BookOne not found, creating a new one.');
    const exercises: BookOneExercises = {
      chooseChallengeAnswer: { left: { answer: '' }, right: { answer: '' } },
      identifyLeveragePointsAnswer: { 
        left: { question1: { answer: '' }, question2: { answer: '' }, question3: { answer: '' } },
        right: { answer: '' }
      },
      redefineChallengeAnswer: { left: { answer: '' }, right: { answer: '' } },
      valuesAnswer: { 
        left: { question1: { answer: '' }, question2: { answer: '' }, question3: { answer: '' } },
        right: null 
      },
      fromFutureToPresentAnswer: { 
        left: { answer: '' }, 
        right: { question1: { answer: '' }, question2: { answer: '' }, question3: { answer: '' }, question4: { answer: '' }, question5: { answer: '' }, question6: { answer: '' } }
      },
      futurePitchAnswer: { left: { answer: '' } }
    };

    book = await BookOne.create({ userId, exercises });
  }

  return book;
};

export const createBookOne = async (bookData: BookOneCreationAttributes) => {
  return await BookOne.create(bookData);
};

export const updateBookOne = async (id: number, bookData: Partial<BookOneAttributes>) => {
  const book = await BookOne.findByPk(id);
  if (!book) {
    return null;
  }
  return await book.update(bookData);
};

export const deleteBookOne = async (id: number) => {
  const book = await BookOne.findByPk(id);
  if (!book) {
    return null;
  }
  await book.destroy();
  return book;
};

