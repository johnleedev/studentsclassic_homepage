import React, { useEffect, useState } from "react";
import axios from "axios";
import './Login.scss'
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import MainURL from "../../MainURL";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import kakaologo from "../../images/login/kakao.png"
import naverlogo from "../../images/login/naver.png"


export default function Login(props:any) {
  
  let navigate = useNavigate();

  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  // 네이버 로그인
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_SECRET = process.env.REACT_APP_NAVER_SECRET;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const NAVER_STATE = "sdfsdfsdf";
  const naverToken = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  
  return (
    <div className="login">
      
      <div className="inner">

        <div className="container">
          
          <div className="title">
            <h1>로그인</h1>
            <p>로그인을 하시면 더 많은 정보를 보실수 있습니다.</p>
          </div>

          <div className="stepnotice">
            <div className="rowbar"></div>
          </div>

          <h2>SNS 계정으로 간편하게 시작하세요!</h2>
      
          <div className="inputbox">
            <a href={kakaoToken}>
              <div className="snsloginbox">
                <img src={kakaologo}/>
                <p>카카오로 로그인</p>
              </div>
            </a>
            <a href={naverToken}>
              <div className="snsloginbox">
                <img src={naverlogo}/>
                <p>네이버로 로그인</p>
              </div>
            </a>
          </div>

          <p style={{margin:'20px 0'}}>어플로 가입하셨다면, 가입한 SNS로 로그인해주세요.</p>
 
          <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>
        
          <div className="bottombox">
            <div className="cover">
              <p onClick={()=>{
                navigate('/logister');
              }}>회원가입</p>
              <p onClick={()=>{
                // navigate('/logistersns');
              }}>어플로 가입하셨나요?</p>
            </div>
          </div>
          
        </div>

      </div>

      <Footer/>
    </div>
  );
}
