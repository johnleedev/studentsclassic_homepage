import React, { useEffect } from 'react'
import axios from "axios";
import MainURL from '../MainURL';
import { useNavigate } from 'react-router-dom';

export default function LoginNaver(props : any) {

  const navigate = useNavigate();
  const callbackURL = window.location.href

  // 네이버 로그인 콜백 URL을 감지하고 결과를 처리하는 함수
  const handleGetAccessToken = () => {
    // 접근 토큰 값 출력
    const access_token = getParamFromUrl(callbackURL, 'access_token');
    console.log(access_token);
    axios
      .post(`${MainURL}/login/loginnaver`, {
        AccessToken: access_token
      })
      .then((res: any)=>{
        if (res.data.isUser === true) {
          console.log('res.data', res.data)  
          navigate(`/logister`, { state : res.data })
        } else if (res.data.isUser === false) {
          console.log('false')
        }
      }).catch((err : string)=>{
        console.log('토큰요청_err :', err)
      });
    
  };

  const getParamFromUrl = (url : any, param : any) => {
    const params = url.split('#')[1];
    const paramArr = params.split('&');
    for (const p of paramArr) {
      const [key, value] = p.split('=');
      if (key === param) return value;
    }
    return null;
  };

  useEffect(()=>{
    handleGetAccessToken();
  }, [])

  return (
    <div></div>
  )
}
