import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Company from './Company';
import Application from './Application';



export default function MainCompt() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Company/>}/>
        <Route path="/application" element={<Application/>}/>
      </Routes>
    </div>
  );
}

