import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {useState} from 'react'
import NotesPage from './components/NotesPage'
import Note from './components/Note'
import { ReactComponent as SunIcon } from './assets/sun.svg'
import { ReactComponent as MoonIcon } from './assets/moon.svg'

import './App.css';

function App() {
  const [theme, setTheme] = useState('container dark');
  const [mode, setMode] = useState('app');
  const [header, setHeader] = useState('app-header');
  let setSombre = () =>{
    setTheme('container dark');
    setMode('app')
    setHeader('app-header')
  }
  let setClair = () =>{
    setTheme('light');
    setMode('appClair');
    setHeader('headerClair')
  }
  return (
    <Router>
      <div className={`App ${theme}`}>
        <div className={`App ${mode}`}>
        <div className={`App ${header}`}>
            <h1>Liste des notes</h1>
            <div className="flex">
              <div><button onClick={setClair}>
                <SunIcon/>
              </button>
              </div>
              <div className="btnS">
              <button onClick={setSombre}>
                <MoonIcon />
              </button>
              </div>
            </div>
        </div>
        <Routes>
          <Route element={<NotesPage/>} path="/" exact />
          <Route  element={<Note />} path="/note/:id"/>
        </Routes>
        </div>
    </div>
    </Router>
  );
}

export default App;

