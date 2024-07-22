import "./App.css"
import React from "react"
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"

import StartPage from "./pages/StartPage"
import Settingpage from "./pages/Settingpage"
import Recommendpage from "./pages/Recommendpage"

const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/Settingpage" element={<Settingpage />}></Route>
        <Route path="/Recommendpage" element={<Recommendpage />}></Route>
      </Routes>
    </Router>

  )
}

export default App