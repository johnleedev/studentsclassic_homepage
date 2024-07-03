import React, { useState } from 'react';
import './Study.scss';
import MainURL from '../../MainURL';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { format } from "date-fns";
import { useRecoilValue } from 'recoil';
import { recoilUserData } from '../../RecoilStore';
import { DropdownBox } from '../../components/DropdownBox';

export default function RequestPost () {

  let navigate = useNavigate();
  const userData = useRecoilValue(recoilUserData);

  const [requestSort, setRequestSort] = useState('아리아');
  const [requestNation, setRequestNation] = useState('이태리');
  const [requestSongName, setRequestSongName] = useState('');
  const [requestAuthor, setRequestAuthor] = useState('');
 
  // 언어 변경
  const changeLanguage = (text:string) => {
    setRequestNation(text);
  };

  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 19);
  // 등록 함수 ----------------------------------------------
  const register = async () => {
      const getParams = {
      sort : requestSort, 
      nation: requestNation,
      songName : requestSongName, 
      author : requestAuthor,
      date : date,
      response : '신청',
      userAccount : userData.userAccount,
      userName : userData.userName
    }

    axios 
      .post(`${MainURL}/study/request`, getParams)
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          navigate('/study/requestlist');
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  return (
    <div className='study'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">스터디</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/study');}}
              className="subpage__menu__item"
            >
              오페라
            </div>
            <div
              onClick={()=>{navigate('/study/song');}}
              className="subpage__menu__item"
            >
              가곡
            </div>
            <div
              onClick={()=>{navigate('/study/requestlist');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              곡등록요청
            </div>
          </div>    
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">
            <h3>곡 등록요청하기</h3>
            <div className='postBtnbox'
              style={{marginRight:'10px'}}
              onClick={()=>{navigate('/study/requestlist');}}
            >
              <p>목록</p>
            </div>
          </div>

          <div className="subpage__main__content">
            
            <div className="warningBox">
              <p>장난스러운 글이나, 불건전하거나, 불법적인 내용 작성시, 경고 없이 곧바로 글은 삭제됩니다. 또한 사용자 계정은 서비스 사용에 제한이 있을 수 있습니다.</p>
            </div>

            <div className="userBox">
              <FaPen color='#334968' />
              <p>{userData.userName} {userData.userSchool}{userData.userSchNum} {userData.userPart}</p>
            </div>

            <div className='requestSelectBoxRow'>
              <p style={{fontSize:'16px'}}>형식:</p>
              <div className='requestSelectBtn'
                style={{backgroundColor: requestSort === '아리아' ? '#333' : '#fff'}}
                onClick={()=>{ setRequestSort('아리아') }}
              >
                <p style={{color: requestSort === '아리아' ? '#fff': '#8C8C8C'}}>아리아</p>
              </div>
              <div className='requestSelectBtn'
                style={{backgroundColor: requestSort === '가곡' ? '#333' : '#fff'}}
                onClick={()=>{ setRequestSort('가곡') }}
              >
                <p style={{color: requestSort === '가곡' ? '#fff': '#8C8C8C'}}>가곡</p>
              </div>
            </div>

            <div style={{margin:'20px 0', display:'flex', alignItems:'center'}}>
              <p style={{fontSize:'16px', marginRight:'3px'}}>언어:</p>
              <DropdownBox
                widthmain='100px'
                height='35px'
                selectedValue={requestNation}
                options={[
                  {value: "이태리", label:'이태리'},
                  {value: "독일", label:'독일'},
                  {value: "프랑스", label:'프랑스'},
                  {value: "영미", label:'영미'},
                  {value: "러시아", label:'러시아'},
                  {value: "스페인", label:'스페인'},
                  {value: "체코", label:'체코'},
                  {value: "라틴", label:'라틴'},
                  {value: "기타", label:'기타'},
                ]}
                handleChange={(e:any)=>{changeLanguage(e.target.value)}}
              />
            </div>

            <div className="addPostBox">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
                <p>작곡가</p>
                <h5 style={{fontSize:'12px'}}>* 최대 200자</h5>
              </div>
              <input value={requestAuthor} className="inputdefault" type="text" 
                maxLength={200}
                onChange={(e) => {setRequestAuthor(e.target.value)}}/>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
                <p>곡명</p>
                <h5 style={{fontSize:'12px'}}>* 최대 200자</h5>
              </div>
              <input value={requestSongName} className="inputdefault" type="text" 
                maxLength={200}
                onChange={(e) => {setRequestSongName(e.target.value)}}/>
            </div>

            <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>

            <div className="buttonbox">
              <div className="button"
              onClick={register}
              >
                <p>완료</p>
              </div>
            </div>

           </div>

           

          
        </div>
      </div>

      <Footer />
    </div>
  )
}



