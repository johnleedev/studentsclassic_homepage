import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './studentsclassic/Main';
import AppReport from './youthreport/AppReport';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Main></Main>}/>
        <Route path="/test" element={<div>test</div>}/>
        <Route path="/youthreport" element={<AppReport></AppReport>}/>
      </Routes>
     
    </div>
  );
}

export default App;

