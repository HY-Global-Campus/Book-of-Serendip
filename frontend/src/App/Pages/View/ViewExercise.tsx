
import React, { useState, useEffect, CSSProperties } from 'react';
import { Outlet } from 'react-router-dom';
import { getBookOneByUserId, BookOne } from '../../api/bookOneService';

interface ViewExerciseProps {
  userId: string;
}

const ViewExercise: React.FC<ViewExerciseProps> = ({userId}) => {

  const [bookOne, setBookOne] = useState<BookOne | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchBookOne = async () => {
      try {
        const data = await getBookOneByUserId(userId!);
        setBookOne(data);
      } catch (err) {
        setError('Failed to fetch BookOne data');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookOne();
    }
  }, [userId]);



  const pageStyle: CSSProperties = {
    padding: '0px 20px',
  };

  return (
    <>
      <div style={pageStyle}>
	<Outlet context={{ bookOne, onUpdateBookOne: () => {}, loading, error }} />
      </div>
    </>
  );
};

export default ViewExercise;
