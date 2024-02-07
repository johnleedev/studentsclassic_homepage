import './Admin.css'; 
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';
import axios from 'axios';

export default function Concours (props: any) {
  
  const navigate = useNavigate();
  let [refresh, setRefresh] = useState<boolean>(false);

    
  // 알림보내기
  let [concoursTitle, setConcoursTitle] = useState('');
  let [concoursDateFrom, setConcoursDateFrom] = useState('');
  let [concoursDateUntil, setConcoursDateUntil] = useState('');
  let [acceptDateFrom, setAcceptDateFrom] = useState('');
  let [acceptDateUntil, setAcceptDateUntil] = useState('');
  let [location, setLocation] = useState('');
  let [concoursPlace, setConcoursPlace] = useState('');
  let [concoursSuperviser, setConcoursSuperviser] = useState('');
  let [concoursInquiry, setConcoursInquiry] = useState('');
  let [concoursWebPage, setConcoursWebPage] = useState('');
  let [concoursImage1, setConcoursImage1] = useState('');
  let [concoursImage2, setConcoursImage2] = useState('');
  let [concoursImage3, setConcoursImage3] = useState('');
  let [concoursImage4, setConcoursImage4] = useState('');
  let [concoursImage5, setConcoursImage5] = useState('');
  
  
  const handleNews = () => {
    axios
    .post(`${MainURL}/concours/postadmin`, {
      title : concoursTitle,
      concoursPeriodFrom: concoursDateFrom,
      concoursPeriodUntil: concoursDateUntil,
      acceptPeriodFrom : acceptDateFrom,
      acceptPeriodUntil : acceptDateUntil,
      location : location,
      concoursPlace : concoursPlace,
      superViser : concoursSuperviser,
      inquiry : concoursInquiry,
      webPage : concoursWebPage,
      concoursImage1: concoursImage1,
      concoursImage2: concoursImage2,
      concoursImage3: concoursImage3,
      concoursImage4: concoursImage4,
      concoursImage5: concoursImage5,
    })
    .then((res) => { 
      if (res.data) {
        setRefresh(!refresh);
        alert(`입력되었습니다.`);
      }
      setConcoursTitle('');
      setConcoursDateFrom('');
      setConcoursDateUntil('');
      setAcceptDateFrom('');
      setAcceptDateUntil('');
      setLocation('');
      setConcoursPlace('');
      setConcoursSuperviser('');
      setConcoursInquiry('');
      setConcoursWebPage('');
      setConcoursImage1('');
      setConcoursImage2('');
      setConcoursImage3('');
      setConcoursImage4('');
      setConcoursImage5('');
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
                value={concoursTitle}
                type='text' onChange={(e)=>{setConcoursTitle(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>대회기간 부터</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursDateFrom}
                type='text' onChange={(e)=>{setConcoursDateFrom(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>대회기간 까지</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursDateUntil}
                type='text' onChange={(e)=>{setConcoursDateUntil(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>접수기간 부터</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={acceptDateFrom}
                type='text' onChange={(e)=>{setAcceptDateFrom(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>접수기간 까지</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={acceptDateUntil}
                type='text' onChange={(e)=>{setAcceptDateUntil(e.target.value)}}></input>
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
            <div className='admin_title'>콩쿨 장소</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursPlace}
                type='text' onChange={(e)=>{setConcoursPlace(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>주관</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursSuperviser}
                type='text' onChange={(e)=>{setConcoursSuperviser(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>문의전화</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursInquiry}
                type='text' onChange={(e)=>{setConcoursInquiry(e.target.value)}}></input>
            </div> 
          </div>

          <div className='admin_box1'>
            <div className='admin_title'>웹페이지</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursWebPage}
                type='text' onChange={(e)=>{setConcoursWebPage(e.target.value)}}></input>
            </div> 
          </div>          

          <div className='admin_box1'>
            <div className='admin_title'>이미지1</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursImage1}
                type='text' onChange={(e)=>{setConcoursImage1(e.target.value)}}></input>
            </div> 
          </div>   
          <div className='admin_box1'>
            <div className='admin_title'>이미지2</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursImage2}
                type='text' onChange={(e)=>{setConcoursImage2(e.target.value)}}></input>
            </div> 
          </div>   
          <div className='admin_box1'>
            <div className='admin_title'>이미지3</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursImage3}
                type='text' onChange={(e)=>{setConcoursImage3(e.target.value)}}></input>
            </div> 
          </div>   
          <div className='admin_box1'>
            <div className='admin_title'>이미지4</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursImage4}
                type='text' onChange={(e)=>{setConcoursImage4(e.target.value)}}></input>
            </div> 
          </div>   
          <div className='admin_box1'>
            <div className='admin_title'>이미지5</div>
            <div className='admin_content'>
              <input className='admin_content_input'
                value={concoursImage5}
                type='text' onChange={(e)=>{setConcoursImage5(e.target.value)}}></input>
            </div> 
          </div>   


          <button className='login_button' 
            onClick={handleNews}>콩쿨 데이터 보내기</button>

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
