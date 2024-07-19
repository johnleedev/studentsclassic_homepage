import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';

import Post from './Post';
import Detail from './Detail';
import BoardNotice from './BoradNotice';
import BoardFree from './BoardFree';
import BoardConcours from './BoardConcours';
import BoardRecruit from './BoardRecruit';
import BoardGradeRequest from './BoardGradeRequest';

export default function CommunityMain() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<BoardNotice/>}/>
      <Route path="/free" element={<BoardFree/>}/>
      <Route path="/concours" element={<BoardConcours/>}/>
      <Route path="/recruit" element={<BoardRecruit/>}/>
      <Route path="/graderequest" element={<BoardGradeRequest/>}/>

      <Route path="/post" element={<Post/>}/>
      <Route path="/detail" element={<Detail/>}/>
    </Routes>
  </div>
  )
}
