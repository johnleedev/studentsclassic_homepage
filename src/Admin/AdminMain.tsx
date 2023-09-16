import './Admin.css'; 
import React, { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import MainURL from '../MainURL';
import axios from 'axios';

export default function AdminMain( props: any) {
  
  const navigate = useNavigate();

  let [notifiTitle, setNotifiTitle] = useState('');
  let [notifiMessage, setNotifiMessage] = useState('');
  
  const handleNotification = () => {
    axios
    .post(`${MainURL}/notification/allsend`, {
      notifiTitle : notifiTitle,
      notifiMessage : notifiMessage
    })
    .then((res) => { 
      alert(`Title: ${res.data.notifiTitle}, Body: ${res.data.notifiMessage}`);
    })
    .catch((err) => {
      console.log('Notification_err', err);
    });
  }

  
  return (
    <div className="AdminContainer">
      <Header/>
    
        <div className='AdminContent'>

          <div className='admin_input_wrapper' style={{height: 300}}>
            <div className='admin_box1'>
              <div className='admin_content'>Title</div>
              <div className='admin_content' style={{height: 200}}>
                <input className='admin_content_input' style={{height: 180}}
                  type='text' onChange={(e)=>{setNotifiTitle(e.target.value)}}></input>
              </div>
            </div>

            <div className='admin_box2'>
              <div className='admin_content'>Body</div>
              <div className='admin_content' style={{height: 200}}>
                <input className='admin_content_input' style={{height: 180}}
                  type='text' onChange={(e)=>{setNotifiMessage(e.target.value)}}></input>
              </div>
            </div>

          </div>

          <button className='login_button' 
              onClick={handleNotification}>알림보내기</button>

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
