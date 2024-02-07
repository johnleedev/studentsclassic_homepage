import './Admin.css'; 
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';
import axios from 'axios';

export default function News (props: any) {
  
  const navigate = useNavigate();
  let [refresh, setRefresh] = useState<boolean>(false);

    
  // 알림보내기
  let [newsTitle, setNewsTitle] = useState('');
  let [newsDate, setNewsDate] = useState('');
  let [newsAuthor, setNewsAuthor] = useState('');
  let [newsLink, setNewsLink] = useState('');
  let [newsImageUrl, setNewsImageUrl] = useState('');
  let [newsMessage, setNewsMessage] = useState('');
  
  const handleNews = () => {
    axios
    .post(`${MainURL}/home/inputnews`, {
      newsTitle : newsTitle,
      newsDate : newsDate,
      newsAuthor : newsAuthor,
      newsLink : newsLink,
      newsImageUrl : newsImageUrl,
      newsMessage : newsMessage
    })
    .then((res) => { 
      if (res.data) {
        setRefresh(!refresh);
        alert(`입력되었습니다.`);
      }
      setNewsTitle('');
      setNewsDate('');
      setNewsAuthor('');
      setNewsLink('');
      setNewsImageUrl('');
      setNewsMessage('');
    })
    .catch((err) => {
      console.log('News_err', err);
    });
  }

 
  
  return (
    <div className="AdminContainer">
      <Header/>
    
      <div className='AdminContent'>
        
        <div className='amdin_Main_Box1' onClick={()=>{
              navigate(`/admin/main`)
        }}>
          뒤로가기
        </div>        

        <div className='admin_input_wrapper'>
          <div className='admin_box1'>
            <div className='admin_title'>제목</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={newsTitle}
                type='text' onChange={(e)=>{setNewsTitle(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>날짜</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={newsDate}
                type='text' onChange={(e)=>{setNewsDate(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>저자</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={newsAuthor}
                type='text' onChange={(e)=>{setNewsAuthor(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>원본 링크</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={newsLink}
                type='text' onChange={(e)=>{setNewsLink(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>이미지 주소</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={newsImageUrl}
                type='text' onChange={(e)=>{setNewsImageUrl(e.target.value)}}></input>
            </div> 
          </div>

          
          <div className='admin_box2'>
            <div className='admin_title addheight2'>본문</div>
            <div className='admin_content addheight2'>
              <textarea
                className='admin_content_input addheight2'
                aria-setsize={14}
                value={newsMessage}
                style={{ fontSize: '12px' }} 
                onChange={(e)=>{setNewsMessage(e.target.value)}}>
              </textarea>
            </div> 
          </div>

          <button className='login_button' 
            onClick={handleNews}>뉴스 데이터 보내기</button>

        </div>

        
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
