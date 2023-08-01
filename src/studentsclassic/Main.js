import './Main.css';
import Question from './Question';
import LocationMap from './LocationMap';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

function Main() {
  
  return (
    <div className="Main">
      {/* menu */}
      <header className="header">
        <div className="menu" id="menu">
          <div className="menu_1">
            <div className="maintitle" onClick={()=>{
              window.scroll({top:0, left:0, behavior:'smooth'})
              }}>성악하는대학생들</div>
          </div>
          <div className="menu_2"></div>
          <div className="menu_3">
            <div className="menulist" onClick={()=>{}}>About Us</div>
            <div className="menulist" onClick={()=>{}}>문의</div>
            <div className="menulist" onClick={()=>{}}>오시는길</div>
          </div>
        </div>
      </header>
      
      {/* 메인화면 */}
      <section className="MainNotice">
        <div className="inner">
          <div className="notice_name">
            <div className="box1"><FontAwesomeIcon icon={faMusic}/></div>
            <div className="box2">About Us</div>
          </div>
          <div className="sub_notice">
            University Students of Classic Vocal
          </div>
          <div className="sub_notice2">
            본 사이트는 '음악대학'에 재학중인 '성악'전공 학생들의 소통과 교류를 위해 만든 곳이며,
            <br></br>현재 음대 재학생들을 위한 공간을 찾기 힘들어, 이 공간을 만들게 되었습니다.
            <br></br>본 사이트의 내용과 운영방침은, 학생들의 필요에 따라 맞춰갈 예정입니다.
          </div>
        </div>        
      </section>

      {/* 문의방법  */}
      <section className="Qustion" id='Qustion'>
        <div className="inner">
          <div className="notice_name">
            <div className="box1"><FontAwesomeIcon icon={faMusic}/></div>
            <div className="box2">문의방법</div>
          </div>
        <Question></Question>
        </div>        
      </section>

      {/* 오시는길  */}
      <section className="LocationMap" id='LocationMap'>
        <div className="inner">
          <div className="notice_name">
          <div className="box1"><FontAwesomeIcon icon={faMusic}/></div>
            <div className="box2">오시는길</div>
          </div>

        <LocationMap></LocationMap>
        </div>        
      </section>

      {/* footer */}
      <section className="footer">
        <div className="inner">
          <Footer></Footer>
        </div>
      </section>


    </div>
  );
}

export default Main;
