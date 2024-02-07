import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './Main';
import Login from './login/Login'
import LoginKakao from './login/LoginKakao';
import LoginNaver from './login/LoginNaver';
import Logister from './login/Logister';
import Admin from './Admin/Admin';
import Lyrics from './screens/Lyrics';
import Words from './screens/Words';
import { RecoilRoot } from 'recoil';


function App() {

  return (
    <div className="App">
      <RecoilRoot>
      
      <Routes>
        <Route path="/" element={<Main></Main>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/loginnaver" element={<LoginNaver/>}/>
        <Route path="/loginkakao" element={<LoginKakao/>}/>
        <Route path="/logister" element={<Logister/>}/>
        <Route path="/admin/*" element={<Admin/>}/>
        <Route path="/lyrics" element={<Lyrics/>}/>
        <Route path="/words" element={<Words/>}/>
      </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
