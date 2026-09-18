import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router';

import Home from './components/homepage';
import Navigation from './components/navigation';
import Dashboard from './components/dashboard';
import Login from './components/login';
import FourOFour from './components/FourOFour';

import "@radix-ui/themes/styles.css";
import {Theme} from "@radix-ui/themes";
 
function App() {

  return (
    <section className="main-container">
      <Theme> 

      <BrowserRouter>

      <Navigation />

      <Routes> 

      <Route path='/' element={<Home />}> Home </Route>
      <Route path='/login' element={<Login />}> Login </Route>
      <Route path='/Dashboard' element={<Dashboard />}> Dashboard </Route>
      <Route path='*' element={<FourOFour />}>  </Route>

      </Routes>

      </BrowserRouter>

      </Theme>
    </section>
  )
}

export default App
