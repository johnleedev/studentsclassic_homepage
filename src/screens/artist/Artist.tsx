import React, { useEffect, useState } from 'react';
import company from "../.../images/notice/company.jpg"
import './Artist.scss'
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import MainURL from "../../MainURL";

export default function Artist (props:any) {

  let navigate = useNavigate();

  interface ArtistsList {
    artistName : string;
    artistName_en : string;
    artistID : string;
    profileImg : string;
  }

  let [artistsList, setArtistsList] = useState<ArtistsList[]>([]);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/artists/getartists/${'art'}`)
    if (res) {
      let copy: any = [...res.data];
      copy.reverse();
      setArtistsList(copy);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <div className='artist'>

      <div className="inner">

        <div className="filter">
          <div className="menu">
            <p>ALL</p>
          </div>
          <div className="menu">
            <p>ART</p>
          </div>
          <div className="menu">
            <p>MUSIC</p>
          </div>
          <div className="menu">
            <p>DANCE</p>
          </div>
        </div>
        
        <div className='list-wrapper'>

          {
            artistsList.map((item:any, index:any)=>{
              return (
                <div className="artistbox"
                  onClick={()=>{navigate(`/portfolio/${item.artistID}`)}}
                >
                  <h3>{item.artistName_en}</h3>
                  <img className='image'
                    src={`${MainURL}/images/artistprofile/${item.profileImg}`}/>
                </div>
              )
            })
          }

          <div className="artistbox"
            onClick={()=>{navigate('/portfolio');}}
          >
            <h3>Hong gildong</h3>
            <div className='image' style={{backgroundColor:'#EAEAEA', width:'320px', height:'345px'}}>
            </div>
          </div>

          <div className="artistbox"
            onClick={()=>{navigate('/portfolio');}}
          >
            <h3>Hong gildong</h3>
            <div className='image' style={{backgroundColor:'#EAEAEA', width:'320px', height:'345px'}}>
            </div>
          </div>

          <div className="artistbox"
            onClick={()=>{navigate('/portfolio');}}
          >
            <h3>Hong gildong</h3>
            <div className='image' style={{backgroundColor:'#EAEAEA', width:'320px', height:'345px'}}>
            </div>
          </div>

          <div className="artistbox"
            onClick={()=>{navigate('/portfolio');}}
          >
            <h3>Hong gildong</h3>
            <div className='image' style={{backgroundColor:'#EAEAEA', width:'320px', height:'345px'}}>
            </div>
          </div>

          
        </div>
       
      </div>
       
      <Footer/>
    </div>
  );
}