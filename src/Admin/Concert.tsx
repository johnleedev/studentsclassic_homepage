import './Admin.css'; 
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';
import axios from 'axios';

export default function Concert (props: any) {
  
  const navigate = useNavigate();
  let [refresh, setRefresh] = useState<boolean>(false);

    
  // 알림보내기
  let [concertTitle, setConcertTitle] = useState('');
  let [concertDate, setConcertDate] = useState('');
  let [concertTime, setConcertTime] = useState('');
  let [location, setLocation] = useState('');
  let [concertPlace, setConcertPlace] = useState('');
  let [concertPrice, setConcertPrice] = useState('');
  let [concertSuperviser, setConcertSuperviser] = useState('');
  let [concertInquiry, setConcertInquiry] = useState('');
  let [concertWebPage, setConcertWebPage] = useState('');
  let [concertImage1, setConcertImage1] = useState('');
  let [concertImage2, setConcertImage2] = useState('');
  let [concertImage3, setConcertImage3] = useState('');
  let [concertImage4, setConcertImage4] = useState('');
  let [concertImage5, setConcertImage5] = useState('');
  
  
  const handleNews = () => {
    axios
    .post(`${MainURL}/concert/postadmin`, {
      title : concertTitle,
      concertDate: concertDate,
      concertTime : concertTime,
      location : location,
      concertPlace : concertPlace,
      concertPrice : concertPrice,
      superViser : concertSuperviser,
      inquiry : concertInquiry,
      webPage : concertWebPage,
      concertImage1: concertImage1,
      concertImage2: concertImage2,
      concertImage3: concertImage3,
      concertImage4: concertImage4,
      concertImage5: concertImage5,
    })
    .then((res) => { 
      if (res.data) {
        setRefresh(!refresh);
        alert(`입력되었습니다.`);
      }
      setConcertTitle('');
      setConcertDate('');
      setConcertTime('');
      setLocation('');
      setConcertPlace('');
      setConcertPrice('');
      setConcertSuperviser('');
      setConcertInquiry('');
      setConcertWebPage('');
      setConcertImage1('');
      setConcertImage2('');
      setConcertImage3('');
      setConcertImage4('');
      setConcertImage5('');
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
            <div className='admin_title'>연주회 이름</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertTitle}
                type='text' onChange={(e)=>{setConcertTitle(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>날짜</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertDate}
                type='text' onChange={(e)=>{setConcertDate(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>시간</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertTime}
                type='text' onChange={(e)=>{setConcertTime(e.target.value)}}></input>
            </div> 
          </div>

          <div>서울, 인천, 대전, 세종, 광주, 대구, 부산, 경기, 충청, 강원, 전라, 경상</div>
          <div className='admin_box1'>
            <div className='admin_title'>지역</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={location}
                type='text' onChange={(e)=>{setLocation(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>연주회 장소</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertPlace}
                type='text' onChange={(e)=>{setConcertPlace(e.target.value)}}></input>
            </div> 
          </div>

          <div>유료, 무료</div>
          <div className='admin_box1'>
            <div className='admin_title'>관람료</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertPrice}
                type='text' onChange={(e)=>{setConcertPrice(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>주관</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertSuperviser}
                type='text' onChange={(e)=>{setConcertSuperviser(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>문의전화</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertInquiry}
                type='text' onChange={(e)=>{setConcertInquiry(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>웹페이지</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertWebPage}
                type='text' onChange={(e)=>{setConcertWebPage(e.target.value)}}></input>
            </div> 
          </div>          

          <div className='admin_box1'>
            <div className='admin_title'>이미지1</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertImage1}
                type='text' onChange={(e)=>{setConcertImage1(e.target.value)}}></input>
            </div> 
          </div>   
          <div className='admin_box1'>
            <div className='admin_title'>이미지2</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertImage2}
                type='text' onChange={(e)=>{setConcertImage2(e.target.value)}}></input>
            </div> 
          </div>   
          <div className='admin_box1'>
            <div className='admin_title'>이미지3</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertImage3}
                type='text' onChange={(e)=>{setConcertImage3(e.target.value)}}></input>
            </div> 
          </div>   
          <div className='admin_box1'>
            <div className='admin_title'>이미지4</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertImage4}
                type='text' onChange={(e)=>{setConcertImage4(e.target.value)}}></input>
            </div> 
          </div>   
          <div className='admin_box1'>
            <div className='admin_title'>이미지5</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concertImage5}
                type='text' onChange={(e)=>{setConcertImage5(e.target.value)}}></input>
            </div> 
          </div>   


          <button className='login_button' 
            onClick={handleNews}>콘서트 데이터 보내기</button>

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
