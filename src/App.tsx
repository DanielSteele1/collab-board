import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router';

import Home from './components/homepage';
import Navigation from './components/navigation';
import Dashboard from './components/dashboard';
import Whiteboard from './components/whiteboard';
import Login from './components/login';
import FourOFour from './components/FourOFour';

import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
import { useEffect, useState } from 'react';
import { Analytics } from "@vercel/analytics/react";

function App() {

  const [isLightOn, setLightOn] = useState(() => {

    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === 'light' : false;

  })

  const toggleLight: React.MouseEventHandler<HTMLButtonElement> = () => setLightOn(prev => !prev);

  useEffect(() => {

    const theme = isLightOn ? 'light' : 'dark';

   document.documentElement.setAttribute(
    "data-mantine-color-scheme", theme,
   );

   localStorage.setItem("theme", theme);
  
  });


  return (
    <section className="main-container">
      <Theme className="app-theme" accentColor='purple' appearance={isLightOn ? 'light' : 'dark'}> 

      <BrowserRouter>

      <Navigation isLightOn={isLightOn}  toggleLight={toggleLight}/>

      <Routes> 

      <Route path='/' element={<Home />}> Home </Route>
      <Route path='/login' element={<Login />}> Login </Route>
      <Route path='/Dashboard' element={<Dashboard />}> Dashboard </Route>
      <Route path='/Whiteboard' element={<Whiteboard />}> Whiteboard </Route>
      <Route path='*' element={<FourOFour />}>  </Route>

      </Routes>

      <Analytics />

      </BrowserRouter>

      </Theme>
    </section>
  )
}

export default App
