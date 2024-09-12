import React from 'react'
import Create from './Crud/Create'
import { BrowserRouter as Router } from "react-router-dom";
import {Route, Routes } from "react-router-dom"
import Read from './Crud/Read';
import Update from './Crud/Update';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path = '/' element = {<Read/>}></Route>
        <Route path = '/create' element = {<Create/>}></Route>
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
    </>
      

  )
}

export default App;
