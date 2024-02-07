import React from 'react'
import './Main.css';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Header from './component/Header';
import Question from './component/Question';
import LocationMap from './component/LocationMap';
import Footer from './component/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import mainlogo from './assets/images/mainlogo.png'
import apple from './assets/images/apple.png'
import google from './assets/images/google.png'


export default function () {

  const navigate = useNavigate();

  return (
    <div className="main">
      {/* menu */}
      <Header/>
      
      {/* 메인화면 */}
      <section className="MainNotice">
        <div className="inner">
            <div className="notice_name">
            <div className="box1"><FontAwesomeIcon icon={faMusic}/></div>
            <div className="box2">About Us</div>
            </div>
            <div className="sub_notice">
            Students of Classic Vocal
            </div>
        </div>        
      </section>

      <section className="Content">
        <div className="inner">
          <div className="mainlogo">
            <img src={mainlogo} className="img" alt="Logo" />
          </div>

        
          <div className="button-box">
            <a href='https://apps.apple.com/kr/app/%EC%84%B1%EC%95%85%ED%95%98%EB%8A%94%EB%8C%80%ED%95%99%EC%83%9D%EB%93%A4/id6451302745'>
              <div className="button">
                <img src={apple} className="img" alt="Logo" />
                <p>App Store</p>
              </div>
            </a>
            <a href='https://play.google.com/store/apps/details?id=com.studentsclassic.app'>
              <div className="button">
                  <img src={google} className="img" alt="Logo" />
                  <p>Google Play</p>
              </div>
            </a>
          </div>
        </div>        
      </section>

      {/* 문의방법  */}
      <section className="Qustion" id='Qustion'>
      <div className="inner">
        <div className="notice_name">
          <div className="box1"><FontAwesomeIcon icon={faMusic}/></div>
          <div className="box2">문의방법</div>
        </div>
      <Question></Question>
      </div>        
      </section>

      {/* footer */}
      <section className="footer">
      <div className="inner">
          <Footer></Footer>
      </div>
      </section>
    </div>
  )
}
