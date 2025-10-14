import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import FrontPage from './Pages/Frontpage';
import AssignmentPage from './Pages/Assignment';
import Part1Page from './Pages/Part1';
import Part2Page from './Pages/Part2';
import Part3Page from './Pages/Part3';
import ExercisePage from './Pages/ExercisePage';
import gothamNarrow from '../assets/Gotham-Narrow-Font-Family/GothamNarrow-Book.otf';
import EndPage from './Pages/EndPage';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Components/Login';
import NavigationButtons from './Components/NavigationButtons';
import Logout from './Components/Logout';
import ViewAllExercises from './Pages/View';
import TextExercise from './Components/Exercise/TextExercise';
import TableExercise from './Components/Exercise/TableExercise';
import TwoColumnExercise from './Components/Exercise/TwoColumnExercise';
import LearningObjectivesExercise from './Components/Exercise/LearningObjectivesExercise';
import { exercisesMeta } from '../content/exercises';

const pages = [
  { path: '/', label: 'FrontPage', color: 'white' },
  { path: '/assignment', label: 'Assignment', color: 'black' },
  { path: '/part1', label: 'Part 1', color: 'black' },
  ...exercisesMeta.slice(0, 2).map(e => ({ path: e.route, label: e.title, color: 'black' })), // Course Info and Learning Objectives
  { path: '/part2', label: 'Part 2', color: 'black' },
  ...exercisesMeta.slice(2, 4).map(e => ({ path: e.route, label: e.title, color: 'black' })), // Core Content and Teaching Methods
  { path: '/part3', label: 'Part 3', color: 'black' },
  ...exercisesMeta.slice(4, 6).map(e => ({ path: e.route, label: e.title, color: 'black' })), // Assessment Methods and Grading Criteria & Reflection
  { path: '/endpage', label: 'End', color: 'black' },
];

function App() {
  const myFontFace = `
    @font-face {
      font-family: 'Gotham Narrow';
      src: url(${gothamNarrow}) format('opentype');
      font-weight: normal;
      font-style: normal;
    }
    body {
      font-family: 'Gotham Narrow', sans-serif;
    }
  `;

  const location = useLocation();
  const currentPageIndex = pages.findIndex(page => page.path === location.pathname);

  return (
    <>
      <style>
        {myFontFace}
      </style>
      <NavigationButtons pages={pages} currentPage={currentPageIndex} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/bos" element={<Navigate to="/" />} />
          <Route path="/" element={<FrontPage />} />
          <Route path="/assignment" element={<AssignmentPage />} />
          <Route path="/part1" element={<Part1Page />} />
          <Route path="/part2" element={<Part2Page />} />
          <Route path="/part3" element={<Part3Page />} />
          <Route path="/exercise" element={<ExercisePage />}>
            {exercisesMeta.map(meta => (
              <Route 
                key={meta.id} 
                path={meta.route.replace('/exercise/', '')} 
                element={
                  meta.id === 'learningObjectives' ? <LearningObjectivesExercise /> :
                  meta.type === 'text' ? <TextExercise /> : 
                  meta.type === 'table' ? <TableExercise /> : 
                  meta.type === 'two-column' ? <TwoColumnExercise /> : 
                  <TextExercise />
                } 
              />
            ))}
          </Route>
          <Route path="/endpage" element={<EndPage />} />
          <Route path='/view/:userId' element={<ViewAllExercises />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

