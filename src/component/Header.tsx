import React from 'react'
import './Header.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="menu" id="menu">
          <div className="menu_1">
            <div className="maintitle" onClick={()=>{
                navigate(`/`)
                }}>성악하는대학생들</div>
          </div>
          <div className="menu_2"></div>
          <div className="menu_3">
            <div className="menulist" onClick={()=>{}}>About Us</div>
            <div className="menulist" onClick={()=>{}}>문의</div>
            <div className="menulist" onClick={()=>{}}>위치</div>
            {/* <div className="menulist" onClick={()=>{
                navigate(`/login`)
            }}>회원가입</div> */}
          </div>
      </div>
    </header>
  )
}
