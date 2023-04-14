import './App.css';
import { Route, Routes } from 'react-router';
import NavBar from "./components/Navbar/Navbar"
import { HomePage, MovieTrailerPage, SeriesDetailPage, MoviesPage, PopularPage, SeriesPage } from './pages';

function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/SeriesPage' element={<SeriesPage/>}/>
      <Route path='/MoviesPage' element={<MoviesPage/>}/>
      <Route path='/PopularPage' element={<PopularPage/>}/>
      <Route path='/MovieTrailerPage/:id' element={<MovieTrailerPage/>}/>
      <Route path='/SeriesDetailPage/:id' element={<SeriesDetailPage/>}/>
    </Routes>

    </>
  );
}

export default App;
