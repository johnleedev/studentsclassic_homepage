import React, { useEffect, useState } from "react";
import axios from "axios";
import './Login.scss'
import Footer from "../../components/Footer";
import {  useNavigate } from 'react-router-dom';
import MainURL from "../../MainURL";
import kakaologo from "../../images/login/kakao.png"
import naverlogo from "../../images/login/naver.png"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { recoilKaKaoLoginData, recoilLoginState, recoilNaverLoginData, recoilUserData } from "../../RecoilStore";


export default function Login(props:any) {
  
  let navigate = useNavigate();
  const setIsLogin = useSetRecoilState(recoilLoginState);
  const setUserData = useSetRecoilState(recoilUserData);
  const kakaoLoginData = useRecoilValue(recoilKaKaoLoginData);
  const naverLoginData = useRecoilValue(recoilNaverLoginData);

  const KAKAO_API_KEY = kakaoLoginData.APIKEY;
  const KAKAO_REDIRECT_URI = kakaoLoginData.REDIRECT_URI_Auth;
  const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

  // 네이버 로그인
  const NAVER_CLIENT_ID = naverLoginData.CLIENTID;
  const NAVER_SECRET = naverLoginData.SECRET;
  const NAVER_REDIRECT_URI = naverLoginData.REDIRECT_URI_Auth;
  const NAVER_STATE = "sdfsdfsdf";
  const naverToken = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${NAVER_STATE}`;

  interface ListProps {
    userAccount : string;
    userName : string;
    userSchool: string;
    userURL : string;
  }

  const [loginAccount, setLoginAccount] = useState('');
  const [loginPasswd, setLoginPasswd] = useState('');
  const [isViewLogisterState, setIsViewLogisterState] = useState<boolean>(false);
  const [logisterName, setLogisterName] = useState('');
  const [logisterSchool, setLogisterSchool] = useState('');
  const [users, setUsers] = useState<ListProps[]>([]);

  const handleCheckLogister = async () => {
    const userData = {
      userName : logisterName,
      userSchool : logisterSchool
    }
    await axios
     .post(`${MainURL}/login/checkisuser`, userData)
     .then((res)=>{
       if (res.data === false) {
          alert('가입되어 있지 않습니다. 회원가입해주세요');
          navigate('/logister');
       } else {
          const copy = [...res.data];
          alert(`해당 정보로 가입된 사람이 ${res.data.length}명 있습니다.`);
          setUsers(copy);
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
  };

  const handleLogin = async () => {
    await axios
     .post(`${MainURL}/login/loginemail`, {
      loginAccount : loginAccount,
      loginPasswd : loginPasswd,
      userURL : 'email'
     })
     .then((res)=>{
      if (res.data.isUser) {
        alert('로그인 되었습니다.');
        setIsLogin(true);
        setUserData({
          userAccount : res.data.userAccount,
          userName : res.data.userName,
          userSchool: res.data.userSchool,
          userSchNum: res.data.userSchNum,
          userPart : res.data.userPart,
          grade: res.data.grade
        })
        navigate('/');
        window.scrollTo(0, 0);
       } else {
        if (res.data.which === 'email') {
          alert('가입되어 있지 않은 이메일 계정입니다.');  
        }
        if (res.data.which === 'passwd') {
          alert('비밀번호가 정확하지 않습니다. SNS계정으로 회원가입&로그인 되어 있을수도 있습니다.');
        }
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
   };

  
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

          <h2>SNS 계정으로 간편하게 로그인 하세요!</h2>
      
          <div className="inputbox">
            <div className="link"
              onClick={()=>{
                window.location.href = kakaoToken;
              }}
            >
              <div className="snsloginbox">
                <img src={kakaologo}/>
                <p>카카오로 로그인</p>
              </div>
            </div>
            <div className="link"
              onClick={()=>{
                window.location.href = naverToken;
              }} 
            >
              <div className="snsloginbox">
                <img src={naverlogo}/>
                <p>네이버로 로그인</p>
              </div>
            </div>
          </div>

          <p style={{margin:'20px 0'}}>어플로 가입하셨다면, 가입한 SNS로 로그인해주세요.</p>

          <div className="inputbox">
            <p style={{marginTop:'20px'}}>이메일로 로그인하기</p>
            <input value={loginAccount} className={loginAccount === '' ? "inputdefault" : "inputdefault select" } type="text" 
              onChange={(e) => {setLoginAccount(e.target.value)}} placeholder="이메일"
              onKeyDown={(e)=>{
                if (loginAccount !== '' && loginPasswd !== '') {
                  if (e.key === 'Enter') {handleLogin();}
                }
              }}
            />
            <input value={loginPasswd} className={loginPasswd === '' ? "inputdefault" : "inputdefault select" } type="password" 
              onChange={(e) => {setLoginPasswd(e.target.value)}} placeholder="비밀번호"
              onKeyDown={(e)=>{
                if (loginAccount !== '' && loginPasswd !== '') {
                  if (e.key === 'Enter') {handleLogin();}
                }
              }}
            /> 
          </div>

          <div className="buttonbox">
            <div className="button"
              onClick={handleLogin}
            >
              <p>로그인</p>
            </div>
          </div>

 
          <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'20px 0'}}></div>
        
          <div className="bottombox">
            <div className="cover">
              <p onClick={()=>{
                navigate('/logister');
              }}>회원가입</p>
              {
                !isViewLogisterState &&
                <p onClick={()=>{
                  setIsViewLogisterState(true);
                }}>어플로 가입하셨나요?</p>
              }
            </div>
          </div>

          {
            isViewLogisterState &&
            <>
              <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'20px 0'}}></div>

              <div className="title">
                <h1>가입여부 확인</h1>
              </div>
            
              <div className="inputbox">
                <p>이름</p>
                <input value={logisterName} className={logisterName === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  onChange={(e) => {setLogisterName(e.target.value)}}/>
              </div>

              <div className="inputbox">
                <p>학교</p>
                <input value={logisterSchool} className={logisterSchool === '' ? "inputdefault" : "inputdefault select" } type="text" 
                  placeholder="00대학교&00고등학교에서 00만 입력 가능"
                  onChange={(e) => {setLogisterSchool(e.target.value)}}/>
              </div>
            
            
              { users.length > 0 &&
                users.map((item:any, index:any)=>{

                  const copy = item.userAccount.split('@');
                  const pront1 = copy[0].slice(0,2);
                  const pront2 = copy[0].slice(2);
                  const maskedPart1 = "*".repeat(pront2.length);
                  const maskedPart2 = "*".repeat(copy[1].length);
                  const result = `${pront1}${maskedPart1}@${maskedPart2}`
                  
                  return(
                    <div className="userCheckBox" key={index}>
                      <p>경로: {item.userURL}</p>
                      <p>{result}</p>
                    </div>
                  )
                })
              }             

              <div className="bottombox" style={{marginTop:'20px'}}>
                <div className="cover">
                  <p onClick={()=>{
                    setLogisterName('');
                    setLogisterSchool('');
                    setUsers([]);
                    setIsViewLogisterState(false);
                  }}>닫기</p>
                  <p onClick={handleCheckLogister}>
                    가입여부 확인
                  </p>
                </div>
              </div>
            </>       
          }
            
          
        </div>

      </div>

      <Footer/>
    </div>
  );
}
