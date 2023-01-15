import{
  BrowserRouter as Router,
  Route, 
  Routes
} from "react-router-dom";
import { 
  useQuery,
  QueryClient
} from 'react-query'
import React, { useEffect, useState } from 'react'
import Home from "./Pages/Home";
import Games from "./Pages/Games";
import Trends from "./Pages/Trends";
import Teams from "./Pages/Teams";
import TeamStats from "./Pages/TeamStats";
import Friends from "./Pages/Friends";
import Admin from "./Pages/Admin";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

import Header from "./Base/Header";
import Footer from "./Base/Footer";

import './styles/app.scss'
import './styles/base.scss'

function App() {
  let [user, setUser] = useState(null)

  const { isLoading: userLoading, error: userError, data: userData } = useQuery('user', async () => {
    let response = await fetch('/auth/user')

    if (response.status === 200) { 
      return response.json()
    }
    else {
      return null
    }
  })

  useEffect(() => {
    setUser(userData)
  }, [userData])

  return (
    <Router>
      <div className="app">
        <Header user={user}/>

        <div className="app-wrapper">
          <Routes>
            <Route path='/admin' element={<Admin />} />
            <Route path='/' element={<Home />} />
            <Route path='/games/:date' element={<Games />} />
            <Route path='/trends' element={<Trends />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/teams/:id' element={<TeamStats />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='login' element={<Login />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
