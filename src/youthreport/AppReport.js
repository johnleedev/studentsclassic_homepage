/*eslint-disable*/
import './Reset.css';
import './dep/css/ReportMain.css';
import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dep from './dep/Dep';
import NameAdd from './depcommon/NameAdd';
import GroupAdd from './depcommon/GroupAdd';
import Login from './depcommon/Login';
import Report from './report/Report';
import ReportMain from './dep/ReportMain';

function AppReport() {

  return (
    <div className="AppReport">
      <Routes>
        <Route path="/main" element={<ReportMain></ReportMain>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/dep/*" element={<Dep></Dep>}/>
        <Route path="/nameadd" element={<NameAdd></NameAdd>}/>
        <Route path="/groupadd" element={<GroupAdd></GroupAdd>}/>
        <Route path="/lastreport/*" element={<Report></Report>}/>
      </Routes>
    </div>
  );

}


export default AppReport;

