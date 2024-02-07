import React from 'react';
import "./Footer.css";

function Footer(props) {
  return (
    <div className='footer'>
      <div className='footer_box'>
        <div className='footer_box_box1'>
          <div className='footer_notice'>
            <div className='footer_notice_name'>상호명</div>  
            <div className='footer_notice_content'>더좋은사람들 (대표자: 이요한)</div>  
          </div>
          <div className='footer_notice'>
            <div className='footer_notice_name'>사업자번호</div>  
            <div className='footer_notice_content'>736-29-01512</div>  
          </div>
          {/* <div className='footer_notice'>
            <div className='footer_notice_name'>대표연락처</div>  
            <div className='footer_notice_content'>010-4925-8855</div>  
          </div> */}
          <div className='footer_notice'>
            <div className='footer_notice_name'>업체주소</div>  
            <div className='footer_notice_content'>대구 달성군 다사읍 죽곡리 876</div>  
          </div>
        </div>
        <div className='footer_box_box2'>
          <div className='footer_notice_right'>
            <div className='footer_notice_instarname'>
              <a href='https://www.instagram.com/studentsclassic_vocal/' target='_blank'>
              <img src='img/instarblack.png'></img>
              </a>
            </div>  
            <div className='footer_notice_instarcontent'>
              <div className='footer_notice_instarcontent_text'>성악하는대학생들</div>  
              <div className='footer_notice_instarcontent_text'>전용 인스타그램 계정</div>  
              <div className='footer_notice_instarcontent_text'>(@studentsclassic_vocal)</div>  
            </div>  
          </div>
          <div className='footer_notice_right'>
            <div className='footer_notice_reseved'>
            © 2023. studentsclassic. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;