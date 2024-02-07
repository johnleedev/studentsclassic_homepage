import './Admin.css'; 
import Header from '../component/Header';
import Footer from '../component/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';

export default function Main( props: any) {
  
  const navigate = useNavigate();
  
  return (
    <div className="AdminContainer">
      <Header/>
    
      <div className='AdminContent'>
          <div className='amdin_Main_Box1' onClick={()=>{
                navigate(`/admin/alert`)
          }}>
            알람
          </div>
          <div className='amdin_Main_Box1' onClick={()=>{
                navigate(`/admin/news`)
          }}>
            뉴스
          </div>
          <div className='amdin_Main_Box1' onClick={()=>{
                navigate(`/admin/concert`)
          }}>
            콘서트
          </div>
          <div className='amdin_Main_Box1' onClick={()=>{
                navigate(`/admin/concours`)
          }}>
            콩쿠르
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
