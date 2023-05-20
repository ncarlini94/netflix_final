import './App.css';
import { Route, Routes } from 'react-router';
import { HomePage,
        SingInPage,
        SingUpPage,
        TrailerPage,
        MoviesPage,
        PopularPage,
        SeriesPage,
        DetailPage,
        ErrorPage
        } from './pages';
import PublicLayout from './layouts/PublicLayout/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout/ProtectedLayout';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<PublicLayout/>}>
      <Route path='/SingInPage' element={<SingInPage/>}/>
      <Route path='/SingUpPage' element={<SingUpPage/>}/>
      </Route>
      <Route element={<ProtectedLayout/>}>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/PopularPage' element={<PopularPage/>}/>
      <Route path='/MoviesPage' element={<MoviesPage/>}/>
      <Route path='/SeriesPage' element={<SeriesPage/>}/>
      <Route path='/Trailer/:id'  element={<TrailerPage />}/>
      <Route path='Detail/:id' element={<DetailPage/>}/>
      </Route>
      <Route path="*" element={<ErrorPage/>} />
    </Routes>

    </>
  );
}

export default App;
