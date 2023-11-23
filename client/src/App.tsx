import { Navbar } from './components';
import { Routes, Route } from 'react-router-dom';
import {
  LandingPage,
  ExercisePage,
  ExerciseDetailsPage,
  FormsPage,
  ProfilePage,
} from './pages';
import { PageWrapper } from './hoc';
function App() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<FormsPage form='login' />} />
          <Route path='/sign-up' element={<FormsPage form='sign-up' />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/exercises'>
            <Route index element={<ExercisePage />} />
            <Route path=':exerciseId' element={<ExerciseDetailsPage />} />
          </Route>
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
