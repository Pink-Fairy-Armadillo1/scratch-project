import React from 'react'
import Header from '../Header/Header'
import Login from '../Login/Login'
import { BrowserRouter, Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import Trending from '../Trending/Trending'
import SimpleBottomNavigation from '../NavBar/NavBar';
import SignUp from '../SignUp/SignUp';
import Search from '../Search/Search';
import Favorites from '../Favorites/Favorites';
import './App.css'
import Container from '@mui/material/Container';


const routes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/trending',
    element: <Trending />
  },
  {
    path: '/signup',
    element: <SignUp/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/search',
    element: <Search/>
  },
  {
    path: '/favorites',
    element: <Favorites/>
  },

];


const App = () => {
  const location = useLocation();

  // , '/signup'
  // '/',
  const hiddenPaths = ['/', '/signup', '/login'];

  const isHidden = hiddenPaths.includes(location.pathname);

  const routing = useRoutes(routes);

  return (
 
    <div className="app">
       <Container>
       <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      </Container>
      {!isHidden && <SimpleBottomNavigation />} 
    </div>
 
  )
};


export default App;


    // <BrowserRouter>
    // {/* <Header /> */}
    // <div className="app">
    //   <Routes>
    //      <Route path='/' element={<Login />}/>
    //     <Route path='/signup' element={<SignUp />}/> 
    //     <Route path='/login' element={<Login />}/>
    //     {/* <Route path='/' element={<SignUp/>}/> */}
    //     {/* <Route path='/Genre' element={<Genre />}/>
    //     <Route path='/Search' element={<Search />}/>  */}
    //     <Route path='/trending' element={<Trending />}/>
        
    //   </Routes>
    //   {/* {!isHidden && <SimpleBottomNavigation />} */}
    //   <SimpleBottomNavigation />
    //  </div>
    //  </ BrowserRouter>
