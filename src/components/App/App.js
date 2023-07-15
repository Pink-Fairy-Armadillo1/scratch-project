import React from 'react'
import Header from '../Header/Header'
import Login from '../Login/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Trending from '../Trending/Trending'
import SimpleBottomNavigation from '../NavBar/NavBar';

const App = () => {
  return (
    <BrowserRouter>
    {/* <Header /> */}
    <div className="app">
      <Routes>
        <Route path='/' element={<Login />}/>
        {/* <Route path='/' element={<Login/>}/> */}
        {/* <Route path='/Genre' element={<Genre />}/>
        <Route path='/Search' element={<Search />}/>  */}
        <Route path='/Trending' element={<Trending />}/>
     </Routes>
    </div>
    {/* <SimpleBottomNavigation /> */}
    </BrowserRouter>
  )
}

export default App
