import React from 'react';
import './Company.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Company() {
  
  let navigate = useNavigate();


  return (
    <div className='company'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">소개</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/company/application');}}
              className="subpage__menu__item"
            >
              소개
            </div>
            {/* <div
              onClick={()=>{navigate('/company/application');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              APP
            </div> */}
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">성악하는사람들 소개</div>
          <div className="subpage__main__content">
            
            <div className="notice-cover">
              <div className="cover">
                <div className="notice">
                  <h2>우리의 비전</h2>
                  <h4>Changing Culture, Changing World</h4>
                  <p>우리는 문화를 바꾸고, 세상을 바꿉니다.</p>
                </div>
              </div>

              <div className="cover">
                <div className="notice">
                  <h2>우리의 목적</h2>
                  <h4>'성악과학생들'은 성악 전공 학생들을 위한 서비스를 하는 플랫폼입니다. <br></br>
                  </h4>
                  
                  
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}

