import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './screens/main/Main';
import Admin from './Admin/Admin';
import Lyrics from './work/Lyrics';
import Words from './work/Words';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import MainCompt from './screens/company/MainCompt';
import MainStudy from './screens/study/MainStudy';
import Login from './screens/login/Login';
import LogisterDetail from './screens/login/LogisterDetail';
import CommunityMain from './screens/community/CommunityMain';
import Trans from './work/Trans';
import Logister from './screens/login/Logister';
import LoginSns from './screens/login/LoginSns';
import MypageMain from './screens/mypage/MypageMain';


function App() {

  return (
    <div className="App">
      <RecoilRoot>

        <Header/>
        
        <div className='Main'>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/company/*" element={<MainCompt/>}/>
            <Route path="/study/*" element={<MainStudy/>}/>
            <Route path="/community/*" element={<CommunityMain/>}/>
            

            <Route path="/login" element={<Login/>}/>
            <Route path="/loginsns" element={<LoginSns/>}/>
            <Route path="/logister" element={<Logister/>}/>
            <Route path="/logisterDetail" element={<LogisterDetail/>}/>
            <Route path="/mypage" element={<MypageMain/>}/>
            
            <Route path="/admin/*" element={<Admin/>}/>
            <Route path="/trans" element={<Trans/>}/>
            <Route path="/lyrics" element={<Lyrics/>}/>
            <Route path="/words" element={<Words/>}/>
          </Routes>
        </div>
      </RecoilRoot>
    </div>
  );
}

export default App;
