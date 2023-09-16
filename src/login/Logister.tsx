import './Logister.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainURL from '../MainURL';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';

function Logister(props: any) {
  
  const location = useLocation();
  const navigate = useNavigate();

  const [refreshToken, setRefreshToken] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const [userSchNum, setUserSchNum] = useState('');
  const [userPart, setUserPart] = useState('');

  const [userAccountMessage, setUserAccountMessage] = useState('');
  const [isUserAccount, setIsUserAccount] = useState(false);
  const [userNameMessage, setUserNameMessage] = useState('');
  const [isUserName, setIsUserName] = useState(false);

  const schools = ["가천대학교", "경북대학교", "경희대학교", "계명대학교", "국민대학교", 
    "군산대학교", "단국대학교", "대구가톨릭대", "목원대학교", "서울대학교", "서울사이버대", 
    " 성신여대", "수원대학교", "숙명여대", "연세대학교", "영남대학교", "이화여대", "전주대학교", 
    "제주대학교", "중앙대학교", "추계예술대", "한세대학교", "한양대학교", "한예종"]

  const sch_num = ["25학번", "24학번", "23학번", "22학번", "21학번", "20학번", "19학번", "18학번", "17학번", "16학번", "15학번", "14학번", "13학번", 
          "12학번", "11학번", "10학번", "09학번", "08학번", "07학번", "06학번", "05학번", "04학번", "03학번", "02학번", "01학번", "00학번", "99학번 이상"]

  const part = ["Soprano", "Mezze", "Tenor", "Baritone", "Bass"]


  useEffect(() => {
    navi_dataSet();
  }, []);

  const navi_dataSet = () => {
    if (location.state === null || location.state === undefined) {
      return;
    } else {
      setRefreshToken(location.state.refreshToken);
      setUserAccount(location.state.userAccount);
      setUserName(location.state.userName);
    }
  };

  const onChangeUserAccount = (e : any) => {
    const userNameRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const text = e.target.value;
    setUserAccount(text);
    if (!userNameRegex.test(text)) {
      setUserAccountMessage('email 형식이 올바르지 않습니다.');
      setIsUserAccount(false);
    } else {
      setUserAccountMessage('올바른 형식의 메일입니다.');
      setIsUserAccount(true);
    }
  };

  const onChangeUserName = (e : any) => {
    const userNameRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const text = e.target.value;
    setUserName(text);
    if (!userNameRegex.test(text)) {
      setUserNameMessage('한글로 입력해주세요.');
      setIsUserName(false);
    } else if (text.length < 2 || text.length > 5) {
      setUserNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsUserName(false);
    } else {
      setUserNameMessage('올바른 형식의 이름입니다.');
      setIsUserName(true);
    }
  };

  const handleSignup = () => {
    if (userName !== '' && userAccount !== '' && userSchool !== '' && userSchNum !== '' && userPart !== '') {
      axios
        .post(`${MainURL}/login/logisterdo`, {
          userAccount: userAccount,
          userName: userName,
          userSchool: userSchool,
          userSchNum: userSchNum,
          userPart: userPart,
        })
        .then((res) => {
          if (res.data === userName) {
            alert('회원가입이 완료되었습니다!');
            navigate(`/`)
          } else {
            alert('다시 시도해 주세요.');
          }
        })
        .catch(() => {
          console.log('실패함');
        });
    } else {
      alert('빈칸을 입력해주세요');
    }
  };

  return (
    <div className="logisterContainer">

      <Header/>
      <div  className="logisterContent">

        <div className="titleContainer">
          <h2 className="title">회원가입</h2>
        </div>

        <div className="inputContainer">
          <div className="inputLabel">계정(이메일)*</div>
          <input
            type="email"
            className={`inputField ${userAccount ? 'success' : 'error'}`}
            placeholder="e-mail"
            value={userAccount}
            onChange={onChangeUserAccount}
          />
          <div className={`message ${isUserAccount ? 'success' : 'error'}`}>{userAccountMessage}</div>
        </div>

        <div className="inputContainer">
          <div className="inputLabel">이름*</div>
          <input
            type="text"
            className={`inputField ${userName ? 'success' : 'error'}`}
            placeholder="이름"
            value={userName}
            onChange={onChangeUserName}
          />
          <div className={`message ${isUserName ? 'success' : 'error'}`}>{userNameMessage}</div>
        </div>

        <div className="inputContainer">
          <div className="inputLabel">학교*</div>
          <select className={`inputField ${userSchool ? 'success' : 'error'}`}
            onChange={(e)=>{
                  let copy = e.target.value; 
                  setUserSchool(copy);
                }}>
            <option>선택</option>
            {  schools.map((content, index)=>{return (<option key={index}>{content}</option>)})}
          </select>
        </div>

        <div className="inputContainer">
          <div className="inputLabel">학번*</div>
          <select className={`inputField ${userSchNum ? 'success' : 'error'}`}
            onChange={(e)=>{
                  let copy = e.target.value; 
                  setUserSchNum(copy);
                }}>
            <option>선택</option>
            {  sch_num.map((content, index)=>{return (<option key={index}>{content}</option>)})}
          </select>
        </div>

        <div className="inputContainer">
          <div className="inputLabel">파트*</div>
          <select className={`inputField ${userSchool ? 'success' : 'error'}`}
            onChange={(e)=>{
                  let copy = e.target.value; 
                  setUserPart(copy);
                }}>
            <option>선택</option>
            {  part.map((content, index)=>{return (<option key={index}>{content}</option>)})}
          </select>
        </div>

        <button className="submitButton" onClick={handleSignup}>가입하기</button>
        
      </div>

      <section className="footer">
        <div className="inner">
          <Footer/>
        </div>
      </section>

    </div>
  );
}

export default Logister;
