import '../Study.scss';
import Footer from '../../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

export default function AriasDetail() {
  
  let navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state.data;
  
  const reform = propsData.lyrics.split('\n');

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

            <h3>{propsData.song_title}</h3>

          </div>
        </div>

        <div className="subpage__main">
          
         
          <div className="subpage__main__content">
            <div className="detailBox">

              <div className="info">
                <p>오페라 : {propsData.opera_title}</p>
                <p>작곡가 : {propsData.composer}</p>
                <p>제목 : {propsData.song_title}</p>
                <p>역할 : {propsData.role}</p>
                <p>파트 : {propsData.voice}</p>
              </div>

              <div className="lyrics">
              {
                reform?.map((item:any, index:any)=>{

                  const copy = item.replaceAll('\n', ' \n').replaceAll(',', ' ,').replaceAll('!', ' !').replaceAll("'", "' ")
                                .replaceAll('.', ' .').replaceAll('´', '´ ').replaceAll('’', '’ ').replaceAll('?', ' ?');
                  const result = copy.split(' ');

                  return (
                    <div key={index} className='lyricsRow'>
                      {
                        result.map((word:any, wordIndex:any)=>{
                          
                          const reform = (text : any) => {
                            const indexOfTarget = text.indexOf("'");
                            const resultString = word.slice(0, indexOfTarget) + '' + word.slice(indexOfTarget);
                            return resultString;
                          }
                          const wordcopy = word.includes("'") ? reform(word) : word
                          
                          return (
                            word === "," || word === "." || word ===  "!" || word === "´" || word === "?" || word ===  ":" || word === ";"
                            ?
                            <div key={wordIndex}>{word} </div>
                            :
                            <div key={wordIndex}
                              onClick={()=>{
                                navigate('/study/worddetail', {state : {setword : wordcopy, nation : propsData.language} });
                              }}
                            > 
                              <p style={{textDecorationLine:'underline', textDecorationColor:'#8B8B8B'}}>{word}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
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

