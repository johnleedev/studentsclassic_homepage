import React, { useEffect } from 'react';
import Footer from '../../components/Footer';
import './Main.scss'
import axios from 'axios';
import MainURL from '../../MainURL';
import { format } from "date-fns";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRecoilValue } from 'recoil';
import { recoilUserData } from '../../RecoilStore';


export default function Main(props:any) {

	const userData = useRecoilValue(recoilUserData);

  // 접속시 접속수 증가시키기
  const appUseCount = () => {
    const currentDate = new Date();
		const date = format(currentDate, 'yyyy-MM-dd');
    axios
      .post(`${MainURL}/appusecount`, {
        date : date
      })
      .then((res) => {return})
      .catch((error) => {
        console.log(error);
      });
  }
     
  useEffect(()=>{
    appUseCount();
  }, []); 


	return (
		<div className='main'>
			<div className="inner">
				<div className="banner">
					<div className="banner-container">
						<p className="banner-slogan">
							<span className="slogan-item">성악을 사랑하는 사람들의</span>
							<span className="slogan-item">커뮤니티 플랫폼</span>
						</p>
						<p className="banner-sub_text">"성악하는사람들"은</p>
						<p className="banner-sub_text">모든 성악하는 사람들을 응원합니다.</p>
					</div>
				</div>	
			</div>
            
			<Footer />

		</div>
	);
}
