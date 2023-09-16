import React from 'react'
import './Main.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './component/Header';
import Question from './component/Question';
import LocationMap from './component/LocationMap';
import Footer from './component/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import mainlogo from './assets/images/mainlogo.png'


export default function () {

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
          University Students of Classic Vocal
          </div>
          <div className="sub_notice2">
          본 사이트는 '음악대학'에 재학중인 학생들의 소통과 교류를 위해 만든 곳이며,
          <br></br>현재 음대 재학생들을 위한 공간을 찾기 힘들어, 이 공간을 만들게 되었습니다.
          <br></br>본 사이트의 내용과 운영방침은, 음대생들의 필요에 따라 맞춰갈 예정입니다.
          </div>
          <div className="mainlogo">
           <img src={mainlogo} className="img" alt="Logo" />
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

      {/* 오시는길  */}
      <section className="LocationMap" id='LocationMap'>
      <div className="inner">
          <div className="notice_name">
          <div className="box1"><FontAwesomeIcon icon={faMusic}/></div>
          <div className="box2">오시는길</div>
          </div>

      <LocationMap></LocationMap>
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
