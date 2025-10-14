import React, { useMemo } from 'react';
import { useExerciseContext } from './ExerciseContext';
import { exercisesMeta } from '../../../content/exercises';
import { useLocation } from 'react-router-dom';
import './exercises.css';

const TableExercise: React.FC = () => {
  const { bookOne, onUpdateBookOne, readonly } = useExerciseContext();
  const location = useLocation();
  const meta = exercisesMeta.find(e => e.route === location.pathname);
  if (!meta) return null;

  const headers = meta.props?.headers ?? Array.from({ length: meta.props?.columns ?? 2 }, (_, i) => `Col ${i + 1}`);
  const rows = meta.props?.rows ?? 3;
  const subTitle = meta.props?.subTitle;
  const description = meta.props?.description;

  const value: string[][] = (bookOne as any)?.exercises?.[meta.id]?.value ?? Array.from({ length: rows }, () => Array(headers.length).fill(''));

  const onCellChange = useMemo(
    () => (r: number, c: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const copy = value.map(row => row.slice());
      copy[r][c] = e.target.value;
      onUpdateBookOne({
        exercises: {
          ...(bookOne as any)?.exercises,
          [meta.id]: { value: copy },
        },
      } as any);
    },
    [value, bookOne, onUpdateBookOne, meta?.id]
  );

  return (
    <div className="exercise-content">
      <div className="exercise-single-column">
        <div className="exercise-panel">
          <h2 className="exercise-title">{meta.title}</h2>
          {subTitle && <h3 className="exercise-subtitle">{subTitle}</h3>}
          {description && <p className="exercise-description">{description}</p>}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <table className="table-exercise" style={{ flex: 1 }}>
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rows }).map((_, r) => (
                  <tr key={r}>
                    {headers.map((_, c) => (
                      <td key={c}>
                        <input disabled={readonly} value={value?.[r]?.[c] ?? ''} onChange={onCellChange(r, c)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableExercise;


