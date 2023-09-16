import React from 'react';
import './Login.css'; 
import Header from '../component/Header';
import Footer from '../component/Footer';
import mainlogo from '../assets/images/mainlogo.png'
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';

export default function Login(props: any) {
  
  const navigate = useNavigate();
  
  const NAVER_CLIENT_ID = 'NJivxK1ooCxnPodocRjp';
  const NAVER_CALLBACK_URL = `${MainURL}/loginnaver`;
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_CALLBACK_URL}&state=YOUR_UNIQUE_STATE`;

  const KAKAO_REST_API_KEY = 'ece291900807a6c37ef7506bac5c1c40';
  const KAKAO_REDIRECT_URI = `${MainURL}/loginkakao`;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`
  
  return (
    <div className="loginContainer">
      <Header/>

      <div  className="loginContent">
        <div className="mainlogo">
          <img src={mainlogo} className="img" alt="Logo" />
        </div>

        {/* KakaoTalk Login */}
        <a href={kakaoLoginUrl}>
          <button className="loginButtonkakao">
            카카오톡 로그인
          </button>
        </a>

        {/* Naver Login */}
        <a href={naverLoginUrl}>
          <button className="loginButtonNaver">
          네이버 로그인
          </button>    
        </a>

        <button className="registerButton" onClick={() => 
            navigate(`/logister`)
          }>
          email로 회원가입
        </button>
      </div>

      {/* footer */}
      <section className="footer">
      <div className="inner">
          <Footer></Footer>
      </div>
      </section>
    </div>
  );
}
