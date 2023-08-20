import React, { useEffect } from 'react'
import axios from "axios";
import MainURL from '../MainURL';
import { useNavigate } from 'react-router-dom';

export default function LoginKakao (props : any) {

  const navigate = useNavigate();
  const callbackURL = window.location.href;
  var authorize_code : any;
  const KAKAO_REST_API_KEY = 'ece291900807a6c37ef7506bac5c1c40';
  const KAKAO_REDIRECT_URI = `${MainURL}/loginkakao`;

  // 인가코드필터 - 인가코드를 "code="를 제외하고 나머지만 가져오는 함수
  function KakaoLoginWebView () {
    const exp = "code=";
    var condition = callbackURL.indexOf(exp);
    if (condition != -1) {
      authorize_code = callbackURL.substring(condition + exp.length);
      console.log('authorize_code : ', authorize_code);
      requestToken(authorize_code);
    };
  }

  // 인가코드를 통해, 토큰을 받아오는 함수
  const requestToken = async (authorize_code : string) => {
    var AccessToken = "";
    var token_url = "https://kauth.kakao.com/oauth/token";
    axios({
        method: "post",
        url: token_url,
        params: {
            grant_type: 'authorization_code',
            client_id: KAKAO_REST_API_KEY,
            redirect_uri: KAKAO_REDIRECT_URI,
            code: authorize_code,
        },
    }).then((res: any)=>{
        AccessToken = res.data.access_token;
        console.log('AccessToken : ', AccessToken);
        // 발급받은 토큰을 백엔드로 보냄
        axios
          .post(`${MainURL}/login/loginkakao`, {
            AccessToken: AccessToken,
          })
          .then((res: any)=>{
            if (res.data) {
              console.log('res.data', res.data)  
              navigate(`/logister`, { state : res.data })
            }
          }).catch((err : string)=>{
            console.log('토큰요청_err :', err)
          });
    }).catch((err : string)=>{
      console.log('requestToken_error : ', err);
    });
  };

  useEffect(()=>{
    KakaoLoginWebView();
  }, [])

  return (
    <div>카카오 로그인</div>
  )
}
