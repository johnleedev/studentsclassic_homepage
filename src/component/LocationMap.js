import React from 'react';
import './LocationMap.css';

function LocationMap(props) {
  return (
    <div className='locationmap'>
        
        <div className='locationmap_box1'>
          <div className='locationmap_notice'>반야월역 1번 출구에서 5분 거리입니다.</div>
        </div>
        <div className='locationmap_box2'>
          <div className='locationmap_map_wrap'>
            <div className='locationmap_map_content content_left'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3233.577375167226!2d128.45796378142188!3d35.859365249997595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565efdf14008621%3A0xb7fd7e403320280a!2z64yA6rWs6rSR7Jet7IucIOuLrOyEseq1sCDri6TsgqzsnY0g7KO96rOh66asIDg3Ng!5e0!3m2!1sko!2skr!4v1700378384756!5m2!1sko!2skr"
               className='locationmap_map_content_image' width="580" height="400" 
               ></iframe>
            </div>
            <div className='locationmap_map_content content_right'>
              <div className='locationmap_map_button_wrap'>
                <a href='https://kko.to/-CufTo4_yn' target="_blank">
                  <div className='locationmap_map_button btn1'>
                    <img src='img/kakaomap.png'></img>
                    <span>카카오맵</span>
                  </div>
                </a>
                <a href='https://naver.me/5fPFbCGY' target="_blank">
                  <div className='locationmap_map_button btn2'>
                    <img src='img/navermap.png'></img>
                    <span>네이버지도</span>
                  </div>
                </a>
              </div>
              <div  className='locationmap_map_notice_wrap'>
                <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>성악하는대학생들 사무실</div>
                  <div className='locationmap_map_notice_text'>대구 달성군 다사읍 죽곡리876</div>
                </div>
                <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>E-Mail</div>
                  <div className='locationmap_map_notice_text'>thebetterpeople@naver.com</div>
                </div>
                <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>카카오톡 아이디</div>
                  <div className='locationmap_map_notice_text'>thebetterpeople</div>
                </div>
                <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>문의가능시간</div>
                  <div className='locationmap_map_notice_text'>: 카톡 - 상시</div>
                </div>
              </div>
            </div>

            
          </div>
        </div>

    </div>
  );
}

export default LocationMap;