import React, { useEffect, useRef, useState } from 'react';
import company from "../.../images/notice/company.jpg"
import './Portfolio.scss'
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios'
import MainURL from "../../MainURL";
import { RiMenu2Fill } from "react-icons/ri";
import { FiBook } from "react-icons/fi";
import Detail from './Detail';
import MenuModal from './MenuModal';
import Book from './Book';
import Loading from '../../components/Loading';

export default function Portfolio (props:any) {

  const sort = 'art';
  const { artistid } = useParams();
  
  const [selectView, setSelectView] = useState(1);

  // 모달 -----------------------------------------------------------------------------------
  const [isViewDetailModal, setIsViewDetailModal] = useState<boolean>(false);
  const [isViewMenuModal, setIsViewMenuModal] = useState<boolean>(false);
  const [whichMenuModal, setWhichMenuModal] = useState('');
  const divAreaRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (divAreaRef.current) {
      const copy = divAreaRef.current.offsetHeight
      setHeight(copy);
    }
  }, [isViewDetailModal]);


  // 포트폴리오 가져오기 --------------------------------------------------------------------------------

  interface PortfolioProps {
    id : number;
    art_name : string;
    art_img : string;
  }
  interface CareerProps {
    title : string;
    content : [
      date : number,
      name : string
    ];
  }
  interface ContactProps {
    phone : string;
    email : string;
  }

  const [artistName, setArtistName] = useState('');
  const [artistName_en, setArtistName_en] = useState('');
  const [portfolio, setPortfolio] = useState<PortfolioProps[]>([]);
  const [profile_school, setProfile_school] = useState<string[]>([]);
  const [profile_career, setProfile_career] = useState<CareerProps[]>([]);
  const [profile_duty, setProfile_duty] = useState('');
  const [profile_collection, setProfile_collection] = useState('');
  const [artistNote, setArtistNote] = useState([]);
  const [contact, setContact] = useState<ContactProps[]>([]);
  const [isDataFetch, setIsDataFetch] = useState<boolean>(false);

  const fetchPosts = async () => {
    const portfoliores = await axios.get(`${MainURL}/portfolio/getportfolio/${sort}/${artistid}`)
    if (portfoliores) {
      let copy: any = [...portfoliores.data];
      setPortfolio(copy);
    }
    const infores = await axios.get(`${MainURL}/artists/getartistinfo/${sort}/${artistid}`)
    if (infores) {
      let copy: any = [...infores.data];
      setArtistName(copy[0].artistName);
      setArtistName_en(copy[0].artistName_en);
      setProfile_school(JSON.parse(copy[0].school));
      setProfile_career(JSON.parse(copy[0].career));
      setProfile_duty(copy[0].duty);
      setProfile_collection(copy[0].collection);
      setArtistNote(JSON.parse(copy[0].note));
      setContact(JSON.parse(copy[0].contact));
    }
    setIsDataFetch(true);
  };

  useEffect(() => {
    fetchPosts();
  }, []);  



  const [artistID, setArtistID] = useState(''); 
  const [imgName, setImgName] = useState('');  
  const [imgUrl, setImgUrl] = useState('');
  
  return !isDataFetch ? <Loading/> :
   (
    <div className='portfolio'>

      <div className="inner">

        <div className="notice">
          <div className="name">
            <p>{artistName_en}</p>
          </div>
          <div className="select-btn">
            {
              selectView === 1 &&
              <div className="btnbox"
                onClick={()=>{
                  setSelectView(2);
                }}
              >
                <RiMenu2Fill />
                <p>리스트로 보기</p>
              </div>
            }
            {
              selectView === 2 &&
              <div className="btnbox"
                onClick={()=>{
                  setSelectView(1);
                }}
              >
                <FiBook />
                <p>전자책으로 보기</p>
              </div>
            }
          </div>
        </div>

        {
          selectView === 2 &&
          <div className='menu'>
            <p  onClick={()=>{setIsViewMenuModal(true); setWhichMenuModal('Profile');}}>Profile</p>
            <div className='divider'></div>
            <p  onClick={()=>{setIsViewMenuModal(true); setWhichMenuModal('Note');}}>Note</p>
            <div className='divider'></div>
            <p  onClick={()=>{setIsViewMenuModal(true); setWhichMenuModal('Contact');}}>Contact</p>
          </div>
        } 

        {
          selectView === 1 &&
          <Book 
            portfolio={portfolio}
            artistid={artistid}
            profile_name={artistName}
            profile_name_en={artistName_en}
            artistNote={artistNote}
            profile_school={profile_school}
            profile_career={profile_career}
            profile_duty={profile_duty}
            profile_collection={profile_collection}
            contact={contact[0]}
          />
        }
        {
          selectView === 2 &&
          <div className="image-row">
            {
              portfolio.map((item:any, index:any)=>{
                return (
                  <img className='image' key={index}
                    src={`${MainURL}/images/portfolio/anmaran/${item.art_img}`}
                    onClick={()=>{
                      window.scrollTo(0, 0);
                      setIsViewDetailModal(true);
                      setArtistID(item.artistID);
                      setImgName(item.art_name);
                      setImgUrl(item.art_img);
                    }}    
                  />
                )
              })
            }
          </div>
        }
        
      </div>

      <div style={{height:'100px'}}></div>

      {/* detail 모달창 */}
      {
        isViewDetailModal &&
        <div className='Modal-Detail'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
            <Detail setIsViewDetailModal={setIsViewDetailModal} imgName={imgName} imgUrl={imgUrl}/>
          </div>
        </div>
      }

      {/* Menu 모달창 */}
      {
        isViewMenuModal &&
        <div className='Modal-Detail'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
            <MenuModal 
              setIsViewMenuModal={setIsViewMenuModal} whichMenuModal={whichMenuModal}
              artistid={artistid}
              profile_school={profile_school}
              profile_name={artistName}
              profile_name_en={artistName_en}
              profile_career={profile_career}
              profile_duty={profile_duty}
              profile_collection={profile_collection}
              artistNote={artistNote}
              contact={contact[0]}
            />
          </div>
        </div>
      }

       
       
      <Footer/>
    </div>
  );
}