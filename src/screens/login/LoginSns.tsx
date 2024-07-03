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
import { useSetRecoilState } from "recoil";
import { recoilLoginState, recoilUserData } from "../../RecoilStore";


export default function LoginSns(props:any) {
  
  let navigate = useNavigate();
  const setIsLogin = useSetRecoilState(recoilLoginState);
  const setUserData = useSetRecoilState(recoilUserData);

  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  // 네이버 로그인
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_SECRET = process.env.REACT_APP_NAVER_SECRET;
  const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const NAVER_STATE = "sdfsdfsdf";

  useEffect(() =>{
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (code && !state) {
      // 카카오 로그인 처리
      axios.post("https://kauth.kakao.com/oauth/token", null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "authorization_code",
          client_id: KAKAO_API_KEY,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code,
        },
      })
      .then((res) => {
        axios
          .post(`${MainURL}/login/login`, {
            url: 'kakao',
            AccessToken: res.data.access_token,
          })
          .then((res: any) => {
            if (res.data.isUser === true) {
              setIsLogin(true);
              setUserData({
                userAccount : res.data.userAccount,
                userName : res.data.userName,
                userSchool: res.data.userSchool,
                userSchNum: res.data.userSchNum,
                userPart : res.data.userPart,
              })
              navigate('/');
            } else if (res.data.isUser === false) {
              navigate('/logisterDetail', { state: res.data });
            }
          }).catch((err: string) => {
            console.log('kakao 토큰 요청 에러:', err);
          });
      }).catch((err) => {
        console.error('kakao 로그인 에러', err);
      });
    } else if (code && state === NAVER_STATE) {
      const api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_SECRET}&code=${code}&state=${state}`;
      axios
        .get(api_url, {
          headers: {
            'X-Naver-Client-Id': NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': NAVER_SECRET
          }
        })
        .then((res) => {
          axios
            .post(`${MainURL}/login/login`, {
              url: 'naver',
              AccessToken: res.data.access_token,
            })
            .then((res: any) => {
              if (res.data.isUser === true) {
                setIsLogin(true);
                navigate('/');
              } else if (res.data.isUser === false) {
                navigate('/logisterDetail', { state: res.data });
              }
            }).catch((err: string) => {
              console.log('kakao 토큰 요청 에러:', err);
            });
        }).catch((err) => {
          console.error('naver 로그인 에러', err);
        });
    }
  }, [window.location.href]);

   
  return (
    <div></div>
  )
}
