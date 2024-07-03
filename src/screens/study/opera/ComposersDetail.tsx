import '../Study.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

export default function ComposersDetail() {
  
  let navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state;
  const operaList = JSON.parse(propsData.opera_list);

  return (
    <div className='study'>

      <div className="inner">

        <div className="subpage__menu">

          <div className="detail__Menu">

            <div className="back-btn-row">
              <div className="back-btn"
                onClick={()=>{
                  navigate(-1);
                }}
              ><FaArrowLeft size={14}/></div>
            </div>

            <h3>{propsData.composer}</h3>

          </div>
        </div>

        <div className="subpage__main">

          <div className="subpage__main__content">
            <div className="detailBox">

              <div className="info">
                <p>국적 : {propsData.country_of_birth}</p>
                <p>출생 : {propsData.year_of_birth}</p>
                <p>죽음 : {propsData.year_of_death}</p>
              </div>

              <div className="lyrics">
                {propsData.summary}
              </div>
              
              <p>{propsData.trans}</p>

              <div className="lyrics">
                <p style={{margin:'10px 0', fontWeight:'bold'}}>오페라 리스트</p>
                {
                  operaList.map((item:any, index:any)=>{
                    return (
                      <div key={index}>{index}. {item}</div>
                    )
                  })
                }
              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

