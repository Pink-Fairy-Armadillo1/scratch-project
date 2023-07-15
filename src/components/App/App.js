import React from 'react'
import Header from '../Header/Header'
import Login from '../Login/Login'
import { BrowserRouter, Route, Routes, useLocation, useRoutes } from 'react-router-dom';
import Trending from '../Trending/Trending'
import SimpleBottomNavigation from '../NavBar/NavBar';
import SignUp from '../SignUp/SignUp'


// const routes = [
//   {
//     path: '/',
//     element: <Login />
//   },
//   {
//     path: '/trending',
//     element: <Trending />
//   },
//   // {
//   //   path: '/signup',
//   //   element: <SignUp/>
//   // },
//   // {
//   //   path: '/login',
//   //   element: <Login/>
//   // }
// ];


const App = () => {
  // const location = useLocation();

  // // , '/signup'
  // const hiddenPaths = ['/'];

  // const isHidden = hiddenPaths.includes(location.pathname);

  // const routing = useRoutes(routes);

  return (
    <BrowserRouter>
    {/* <Header /> */}
    <div className="app">
      <Routes>
        <Route path='/' element={<Login />}/>
        {/* <Route path='/signup' element={<SignUp />}/> */}

        {/* <Route path='/' element={<SignUp/>}/> */}
        {/* <Route path='/Genre' element={<Genre />}/>
        <Route path='/Search' element={<Search />}/>  */}
        <Route path='/trending' element={<Trending />}/>
        
      </Routes>
      {/* {!isHidden && <SimpleBottomNavigation />} */}
     </div>
     </ BrowserRouter>
    // <div className="app">
      // {/* <Routes>
      //   <Route path="/" element={<Login />} />
      //   <Route path="/trending" element={<Trending />} />
      // </Routes>
      // {!isHidden && <SimpleBottomNavigation />} */}
    // </div>
    // <div className="app">
    //   {routing}
    //   {!isHidden && <SimpleBottomNavigation />}
    // </div>
  )
};



export default App
