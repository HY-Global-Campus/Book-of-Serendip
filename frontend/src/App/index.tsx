import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Mindmap from "./Pages/Mindmap";
import FrontPage from './Pages/Frontpage';
import ExercisePage from './Pages/ExercisePage';
import gothamNarrow from '../assets/Gotham-Narrow-Font-Family/GothamNarrow-Book.otf';
import EndPage from './Pages/EndPage';
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './Components/Login';
import NavigationButtons from './Components/NavigationButtons';
import ChooseChallengeExercise from './Components/Exercise/ChooseChallenge';
import IdentifyLeveragePointsExercise from './Components/Exercise/IdentifyLeveragePoints';
import RedefineChallengeExercise from './Components/Exercise/RedefineChallenge';
import ValuesExercise from './Components/Exercise/Values';
import FromFutureToPresentExercise from './Components/Exercise/FromFutureToPresent';
import FuturePitchExercise from './Components/Exercise/FuturePitch';
import Logout from './Components/Logout';
import ViewAllExercises from './Pages/View';
import Prologue from './Components/Exercise/Prologue';
import Reflection from './Components/Exercise/Reflection';
import Welcome from './Components/Exercise/Welcome';
import Chapter1Banner from './Components/Exercise/Chapter1Banner';
import Chapter2Banner from './Components/Exercise/Chapter2Banner';
import Chapter3Banner from './Components/Exercise/Chapter3Banner';
import Chapter4Banner from './Components/Exercise/Chapter4Banner';

const pages = [
  { path: '/', label: 'FrontPage', color: 'white' },
  { path: '/exercise/welcome', label: 'Welcome', color: 'black' },
  { path: '/exercise/prologue', label: 'Prologue', color: 'black' },
  { path: '/exercise/chapter1', label: 'Chapter 1', color: 'black' },
  { path: '/exercise/choose-challenge', label: 'Choose Challenge', color: 'black' },
  { path: '/exercise/chapter2', label: 'Chapter 2', color: 'black' },
  { path: '/mindmap', label: 'Mindmap', color: 'black' },
  { path: '/exercise/identify-leverage-points', label: 'Identify Leverage Points', color: 'black' },
  { path: '/exercise/redefine-challenge', label: 'Redefine Challenge', color: 'black' },
  { path: '/exercise/chapter3', label: 'Chapter 3', color: 'black' },
  { path: '/exercise/values', label: 'Values', color: 'black' },
  { path: '/exercise/chapter4', label: 'Chapter 4', color: 'black' },
  { path: '/exercise/from-future-to-present', label: 'From Future to Present', color: 'black' },
  { path: '/exercise/future-pitch', label: 'Future Pitch', color: 'black' },
  { path: '/exercise/reflection', label: 'Reflection', color: 'black' },
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
          <Route path="/mindmap" element={<Mindmap />} />
          <Route path="/exercise" element={<ExercisePage />}>
            <Route path="welcome" element={<Welcome />} />
            <Route path="prologue" element={<Prologue />} />
            <Route path="chapter1" element={<Chapter1Banner />} />
            <Route path="choose-challenge" element={<ChooseChallengeExercise />} />
            <Route path="chapter2" element={<Chapter2Banner />} />
            <Route path="identify-leverage-points" element={<IdentifyLeveragePointsExercise />} />
            <Route path="redefine-challenge" element={<RedefineChallengeExercise />} />
            <Route path="chapter3" element={<Chapter3Banner />} />
            <Route path="values" element={<ValuesExercise />} />
            <Route path="chapter4" element={<Chapter4Banner />} />
            <Route path="from-future-to-present" element={<FromFutureToPresentExercise />} />
            <Route path="future-pitch" element={<FuturePitchExercise />} />
            <Route path="reflection" element={<Reflection />} />
          </Route>
          <Route path="/endpage" element={<EndPage />} />
          <Route path='/view/:userId' element={<ViewAllExercises />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

