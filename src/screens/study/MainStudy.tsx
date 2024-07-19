import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Menu1_Arias from './opera/Menu1_Arias';
import Menu2_Duets from './opera/Menu2_Duets';
import Menu3_Others from './opera/Menu3_Others';
import Menu4_Operas from './opera/Menu4_Operas';
import Menu5_Synopsis from './opera/Menu5_Synopsis';
import Menu6_Libretto from './opera/Menu6_Libretto';
import Menu7_Roles from './opera/Menu7_Roles';
import Menu8_Composers from './opera/Menu8_Composers';

import AriasDetail from './opera/AriasDetail';
import OperasDetail from './opera/OperasDetail';
import ComposersDetail from './opera/ComposersDetail';
import Menu1_Italian from './song/Menu1_Italian';
import Menu2_German from './song/Menu2_German';
import Menu3_French from './song/Menu3_French';
import Menu4_English from './song/Menu4_English';
import Menu5_Russian from './song/Menu5_Russian';
import Menu6_Korea from './song/Menu6_Korea';

import SongsDetail from './song/SongsDatail';
import WordDetail from './WordDetail';
import RequestList from './RequestList';
import RequestPost from './RequestPost';

export default function MainStudy() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Menu1_Arias/>}/>
        <Route path="/duets" element={<Menu2_Duets/>}/>
        <Route path="/others" element={<Menu3_Others/>}/>
        <Route path="/operas" element={<Menu4_Operas/>}/>
        <Route path="/synopsis" element={<Menu5_Synopsis/>}/>
        <Route path="/libretto" element={<Menu6_Libretto/>}/>
        <Route path="/roles" element={<Menu7_Roles/>}/>
        <Route path="/composers" element={<Menu8_Composers/>}/>
        <Route path="/ariasdetail" element={<AriasDetail/>}/>
        <Route path="/operasdetail" element={<OperasDetail/>}/>
        <Route path="/composerdetail" element={<ComposersDetail/>}/>
        <Route path="/song" element={<Menu1_Italian/>}/>
        <Route path="/song/german" element={<Menu2_German/>}/>
        <Route path="/song/french" element={<Menu3_French/>}/>
        <Route path="/song/english" element={<Menu4_English/>}/>
        <Route path="/song/russian" element={<Menu5_Russian/>}/>
        <Route path="/song/korea" element={<Menu6_Korea/>}/>
        <Route path="/songsdetail" element={<SongsDetail/>}/>
        <Route path="/requestlist" element={<RequestList/>}/>
        <Route path="/requestpost" element={<RequestPost/>}/>
        <Route path="/worddetail" element={<WordDetail/>}/>
      </Routes>
    </div>
  );
}

