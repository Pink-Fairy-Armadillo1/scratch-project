import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM  from 'react-dom';
import App from './components/App/App';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);



// const root = createRoot(document.querySelector('#root'));
// root.render(<App />,);