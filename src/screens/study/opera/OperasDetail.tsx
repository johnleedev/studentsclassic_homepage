import '../Study.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";


export default function OperasDetail() {
  
  let navigate = useNavigate();
  const location = useLocation();
  const sort = location.state.sort;
  const propsData = location.state.data;
  

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
            
              <h3>{propsData.opera_title}</h3>

            </div>
        </div>

        <div className="subpage__main">

          <div className="subpage__main__content">
            
            <div className="detailBox">

              <div className="info">
                <p>작곡가 : {propsData.composer}</p>
                <p>오페라제목 : {propsData.opera_title}</p>
                {
                  sort === 'opera' &&
                  <>
                  <p>작사가 : {propsData.librettist}</p>
                  <p>초연 : {propsData.premiere}</p>
                  <p>언어 : {propsData.language}</p>
                  </>
                }
              </div>

              <div className="lyrics">
                { sort === 'opera' && propsData.summary}
                { sort === 'synopsis' && propsData.synopsis}
                { sort === 'libretto' && propsData.libretto}
              </div>
              
              <p className='trans'>{propsData.trans}</p>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

