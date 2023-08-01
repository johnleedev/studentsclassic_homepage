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
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d808.2906192044386!2d128.70941162924873!3d35.869534998759434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660ba411d98f89%3A0x357276025a056693!2z64yA6rWs6rSR7Jet7IucIOuPmeq1rCDslYjsi6wzLjTrj5kgOTAtNQ!5e0!3m2!1sko!2skr!4v1674021822483!5m2!1sko!2skr"
               className='locationmap_map_content_image' width="580" height="400" 
               ></iframe>
            </div>
            <div className='locationmap_map_content content_right'>
              <div className='locationmap_map_button_wrap'>
                <a href='http://kko.to/grd7mhG67J' target="_blank">
                  <div className='locationmap_map_button btn1'>
                    <img src='img/kakaomap.png'></img>
                    <span>카카오맵</span>
                  </div>
                </a>
                <a href='https://naver.me/x6U333IS' target="_blank">
                  <div className='locationmap_map_button btn2'>
                    <img src='img/navermap.png'></img>
                    <span>네이버지도</span>
                  </div>
                </a>
              </div>
              <div  className='locationmap_map_notice_wrap'>
                <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>음악하는대학생들 사무실</div>
                  <div className='locationmap_map_notice_text'>대구 동구 서호동 90-5</div>
                </div>
                {/* <div className='locationmap_map_notice'>
                  <div className='locationmap_map_notice_name'>연락처</div>
                  <div className='locationmap_map_notice_text'>010-4925-8855</div>
                </div> */}
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