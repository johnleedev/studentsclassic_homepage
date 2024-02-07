import './Admin.css'; 
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';
import axios from 'axios';

export default function Alert (props: any) {
  
  const navigate = useNavigate();
  let [refresh, setRefresh] = useState<boolean>(false);

  // 알림리스트
  interface notifiList {
    id : number,
    notifiTitle : string,
    notifiMessage : string,
    date : string
  }

  let [notifiList, setNotifiList] = useState<notifiList[]>([]);
  const fetchDatas = () => {
    axios.get(`${MainURL}/notification/notifigetlist`).then((res) => {
      const copy = res.data;
      copy.reverse();
      setNotifiList(copy);
    })
  }

  useEffect(()=>{
    fetchDatas();
  }, [refresh])

    
  // 알림보내기
  let [sendNotifiTitle, setsendNotifiTitle] = useState('');
  let [sendNotifiMessage, setsendNotifiMessage] = useState('');

  const alertNotification = () =>{
    if (window.confirm("정말로 보내시겠습니까??")) {
      handleNotification();
    } else {
      alert("취소되었습니다.");
  }
  }
  
  const handleNotification = () => {
    axios
    .post(`${MainURL}/notification/allsendnotifi`, {
      notifiTitle : sendNotifiTitle,
      notifiMessage : sendNotifiMessage
    })
    .then((res) => { 
      setRefresh(!refresh);
      alert(`전송되었습니다. Title: ${res.data.notifiTitle}, Body: ${res.data.notifiMessage}`);
    })
    .catch((err) => {
      console.log('Notification_err', err);
    });
  }

  // State 변수 추가
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // 한 페이지당 표시될 알림 수
  const totalPages = Math.ceil(notifiList.length / itemsPerPage);

  // 알림 리스트를 현재 페이지에 해당하는 부분만 필터링
  const displayedNotifiList = notifiList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 함수
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  
  
  return (
    <div className="AdminContainer">
      <Header/>
    
        <div className='AdminContent'>

          <div className='amdin_Main_Box1' onClick={()=>{
                navigate(`/admin/main`)
          }}>
            뒤로가기
          </div> 

          <div className='amdin_alert_list_wrapper'>

            <div className='amdin_alert_list_title'>알림 리스트</div>
            <div style={{display: 'flex', backgroundColor: '#fff', padding:10}}>
              <div className='amdin_alert_list_box1'>번호</div>
              <div className='amdin_alert_list_box2'>제목</div>
              <div className='amdin_alert_list_box3'>본문</div>
              <div className='amdin_alert_list_box4'>날짜</div>
            </div>

            {
               displayedNotifiList.map((item:any, index:any)=>{
                return(
                  <div>
                    <div style={{width: '100%', height: '1px', backgroundColor: '#BDBDBD'}}></div>
                    <div style={{display: 'flex', backgroundColor: '#fff',  padding: '10px'}}>
                      <div className='amdin_alert_list_box1'>{item.id}</div>
                      <div className='amdin_alert_list_box2'>{item.notifiTitle}</div>
                      <div className='amdin_alert_list_box3'>{item.notifiMessage}</div>
                      <div className='amdin_alert_list_box4'>{item.date}</div>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => changePage(page)}
                style={{ margin: '5px', padding: '5px', cursor: 'pointer', borderRadius: '5px', }}
              >
                {page}
              </button>
            ))}
          </div>

          <div className='admin_input_wrapper'>
            <div className='admin_box1'>
              <div className='admin_title'>Title</div>
              <div className='admin_content'>
                <input className='admin_content_input'
                  type='text' onChange={(e)=>{setsendNotifiTitle(e.target.value)}}></input>
              </div> 
            </div>

            <div className='admin_box2'>
              <div className='admin_title addheight1'>Body</div>
              <div className='admin_content addheight1'>
                <input
                type='text'
                className='admin_content_input addheight1'
                onChange={(e)=>{setsendNotifiMessage(e.target.value)}}>
                </input>
              </div> 
            </div>

          </div>

          <button className='login_button' 
              onClick={alertNotification}>알림보내기</button>

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
