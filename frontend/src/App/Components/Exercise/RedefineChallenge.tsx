
import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import ExpandingTextArea from './ExpandingTextarea';
import { containerStyle, panelStyle, separatorStyle } from './styles';
import { RedefineChallenge } from '../../../types/exercises';
import { getBookOneByUserId, updateBookOne } from '../../api/bookOneService';
import { BookOne } from '../../api/bookOneService';
import InfoIcon from '../InfoIcon';

interface RedefineChallengeProps {}

const infotext = `Write a definition for the problem you have chosen. What exactly does it mean? Why is it a problem? What are the causes and consequences it implies?`

const RedefineChallengeExercise: React.FC<RedefineChallengeProps> = () => {
  const [bookOne, setBookOne] = useState<BookOne | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<RedefineChallenge>({
    left: {
      title: 'Redefine Challenge - Left',
      description: 'Redefine a challenge in the context of climate change',
      answer: '',
    },
    right: {
      title: 'Redefine Challenge - Right',
      description: 'Provide a detailed explanation of the redefined challenge',
      answer: '',
    },
  });
  const userId = localStorage.getItem('id');

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchBookOne = async () => {
      try {
        const data = await getBookOneByUserId(userId!);
        setBookOne(data);
        setAnswers({
          left: {
            title: 'Redefine the chosen challenge',
            description: 'Is the initial chosen challenge still the focus of your future vision? Or have you found another one that caught your interest? Here you can redefine the chosen challenge based on the information you learned in the game.',
            answer: data.exercises.redefineChallengeAnswer.left.answer,
          },
          right: {
            title: 'Challenge description',
            description: 'Describe your new chosen challenge.',
            answer: data.exercises.redefineChallengeAnswer.right.answer,
          },
        });
      } catch (err) {
        setError('Failed to fetch BookOne data');
      } finally {
        setLoading(false);
      }
    };

    fetchBookOne();
  }, [userId]);

  const mutation = useMutation<BookOne, Error, Partial<BookOne>>({
    mutationFn: async (updatedBook: Partial<BookOne>) => {
      if (!bookOne) {
        throw new Error('bookOne is not defined');
      }
      return await updateBookOne(bookOne.id, updatedBook);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookone', userId] });
      console.log('BookOne updated successfully');
    },
    onError: (error) => {
      console.error('Error updating BookOne:', error);
    }
  });

  const debouncedMutation = useRef(
    debounce((updatedBook: Partial<BookOne>) => mutation.mutate(updatedBook), 500)
  ).current;

  const handleAnswerChange = (side: 'left' | 'right') => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [side]: {
        ...prevAnswers[side],
        answer: value,
      },
    }));

    setBookOne((prevBookOne) => {
      if (!prevBookOne) return prevBookOne;

      const updatedBook = {
        ...prevBookOne,
        exercises: {
          ...prevBookOne.exercises,
          redefineChallengeAnswer: {
            ...prevBookOne.exercises.redefineChallengeAnswer,
            [side]: { answer: value },
          },
        },
      };

      debouncedMutation(updatedBook);
      return updatedBook;
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={containerStyle}>
      <div style={panelStyle}>
                <InfoIcon
          infoText={infotext}
          />
        <h2>{answers.left.title}</h2>

        <p>{answers.left.description}</p>
        <ExpandingTextArea
          id="redefine-challenge-text-area-left"
          instructionText=""
          value={answers.left.answer}
          onChange={handleAnswerChange('left')}
        />
      </div>
      <div style={separatorStyle} />
      <div style={panelStyle}>
        <h2>{answers.right.title}</h2>
        <p>{answers.right.description}</p>
        <ExpandingTextArea
          id="redefine-challenge-text-area-right"
          instructionText=""
          value={answers.right.answer}
          onChange={handleAnswerChange('right')}
          rows={20}
        />
      </div>
    </div>
  );
};

export default RedefineChallengeExercise;
