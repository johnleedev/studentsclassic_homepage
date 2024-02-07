import React from 'react';
import './Question.css';

function Question(props) {
  return (
    <div className='qustion'>

      <div className='qustion_box1'>
        <div className='qustion_notice'>저희에 관해 궁금하신 점을 자유롭게 물어보세요.</div>
        <div className='qustion_notice'>아래에 3가지 방법을 소개합니다.</div>
      </div>
      <div className='qustion_box2'>
        <div className='qustion_contact_wrap'>
          <div className='qustion_contact'>
            {/* <a href='https://open.kakao.com/o/sO7wUHZe' target='_blank'> */}
              <div className='qustion_contact_image'>
                <img src='img/how-to-contact-2.png'></img>
              </div>
            {/* </a> */}
            <div className='qustion_contact_name'>카카오톡</div>
            <div className='qustion_contact_bar'></div>
            <div className='qustion_contact_notice'>
              위의 아이콘을 클릭하시면 <span className='qustion_span'>카카오톡 오픈 채팅방</span>에 입장해서 문의가 가능해요. 원하신다면 익명으로 입장하실 수도 있어요.
            </div>
          </div>
          <div className='qustion_contact'>
            <a href='https://www.instagram.com/studentsclassic_vocal/' target='_blank'>
              <div className='qustion_contact_image'>
                <img src='img/how-to-contact-3.png'></img>
              </div>
            </a>
            <div className='qustion_contact_name'>인스타 DM</div>
            <div className='qustion_contact_bar'></div>
            <div className='qustion_contact_notice'>
              위의 아이콘을 클릭하시거나 인스타그램에 <span className='qustion_span'>@studentsclassic_vocal</span>를 검색하여 들어오시면 DM을 통해 문의가 가능해요.
            </div>
          </div>
          <div className='qustion_contact'>
            {/* <a href='https://talk.naver.com/W4O3OL' target='_blank'> */}
              <div className='qustion_contact_image'>
                <img src='img/how-to-contact-4.png'></img>
              </div>
            {/* </a> */}
            <div className='qustion_contact_name'>네이버 톡톡</div>
            <div className='qustion_contact_bar'></div>
            <div className='qustion_contact_notice'>
              <span>네이버 톡톡</span>을 통해서도 문의가 가능해요. 이는 네이버에서 "성악하는대학생들"을 검색한 후에도 이용하실 수 있어요.
            </div>
          </div>
          
        </div>
      </div>

  
    </div>
  );
}

export default Question;