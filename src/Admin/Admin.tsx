
import './Admin.css'; 
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Alert from './Alert';
import News from './News';

export default function Admin( props: any) {

  return (
    <div className="AdminContainer">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/alert" element={<Alert/>}/>
        <Route path="/news" element={<News/>}/>
      </Routes>
    </div>
  );
}
