import React from 'react'
import './Company.scss';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import mainlogo from '../../images/mainlogomini.png'
import apple from '../../images/apple.png'
import google from '../../images/google.png'


export default function Application (props:any) {

  let navigate = useNavigate();

  return (
    <div className="company">

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">소개</div>
          <div className="subpage__menu__list">
            {/* <div
              onClick={()=>{navigate('/company');}}
              className="subpage__menu__item"
            >
              소개
            </div> */}
            <div
              onClick={()=>{navigate('/company/application');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              APP
            </div>
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">APP</div>
          <div className="subpage__main__content">
            
            <div className="mainlogo">
              <img src={mainlogo} className="img" alt="Logo" />
            </div>

          
            <div className="button-box">
              <a href='https://apps.apple.com/kr/app/%EC%84%B1%EC%95%85%ED%95%98%EB%8A%94%EB%8C%80%ED%95%99%EC%83%9D%EB%93%A4/id6451302745' target="_blank">
                <div className="button">
                  <img src={apple} className="img" alt="Logo" />
                  <p>App Store</p>
                </div>
              </a>
              <a href='https://play.google.com/store/apps/details?id=com.studentsclassic.app' target="_blank">
                <div className="button">
                    <img src={google} className="img" alt="Logo" />
                    <p>Google Play</p>
                </div>
              </a>
            </div>
      

          </div>
        </div>
      </div>


      <div className="inner">

        
      
        

      </div>

      <Footer/>

    </div>
  );
}
