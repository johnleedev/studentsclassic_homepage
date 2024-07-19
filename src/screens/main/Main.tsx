import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import './Main.scss'
import axios from 'axios';
import MainURL from '../../MainURL';
import { format } from "date-fns";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRecoilValue } from 'recoil';
import { recoilUserData } from '../../RecoilStore';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiCornerDownRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

export default function Main(props:any) {

	let navigate = useNavigate();
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
  

  interface ListProps {
    name: string,
		nameEn: string,
    total : number,
		link: string
  }

  const [list, setList] = useState<ListProps[]>([]);
	const [isSubList, setIsSubList] = useState(Array(list.length).fill(false));
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/home/getstudytotal`)
    if (res.data) {
      setIsResdataFalse(false);
      let copy: any = {...res.data};
      const datacopy = [
				{name: '오페라아리아', nameEn:'Aria', total : copy.total_aria, link:'/study', 
					subList:[
						{name: '이태리', nameEn:'Italian', total : copy.total_aria_italian},
						{name: '독일', nameEn:'German', total : copy.total_aria_german},
						{name: '프랑스', nameEn:'French', total : copy.total_aria_french},
						{name: '영미', nameEn:'English', total : copy.total_aria_english},
						{name: '러시아', nameEn:'Russian', total : copy.total_aria_russian},
					]
				},
				{name: '오페라듀엣', nameEn:'Duet', total : copy.total_duet, link:'/study/duets', 
					subList:[
						{name: '이태리', nameEn:'Italian', total : copy.total_duet_italian},
						{name: '독일', nameEn:'German', total : copy.total_duet_german},
						{name: '프랑스', nameEn:'French', total : copy.total_duet_french},
						{name: '영미', nameEn:'English', total : copy.total_duet_english},
						{name: '러시아', nameEn:'Russian', total : copy.total_duet_russian}
					]
				},
				{name: '오페라3중창~', nameEn:'Other', total : copy.total_other, link:'/study/others',
					subList:[
						{name: '이태리', nameEn:'Italian', total : copy.total_other_italian},
						{name: '독일', nameEn:'German', total : copy.total_other_german},
						{name: '프랑스', nameEn:'French', total : copy.total_other_french},
						{name: '영미', nameEn:'English', total : copy.total_other_english},
						{name: '러시아', nameEn:'Russian', total : copy.total_other_russian}
					]
				},
				{name: '오페라', nameEn:'Opera', total : copy.total_opera, link:'/study/operas',
					subList:[
						{name: '오페라개요', nameEn:'OperaNotice', total : copy.total_opera},
						{name: '시놉시스', nameEn:'Synopsis', total : copy.total_synopsis},
						{name: '오페라대본', nameEn:'Libretto', total : copy.total_libretto},
						{name: '오페라역할', nameEn:'OperaRole', total : copy.total_operarole},
					]
				},
				{name: '가곡', nameEn:'Song', total : copy.total_songs, link:'/study/song',
					subList:[
						{name: '이태리가곡', nameEn:'Italian', total : copy.total_songs_italian, link:'/study/song'},
						{name: '독일가곡', nameEn:'German', total : copy.total_songs_german, link:'/study/song/german'},
						{name: '프랑스가곡', nameEn:'French', total : copy.total_songs_french, link:'/study/song/french'},
						{name: '영미가곡', nameEn:'English', total : copy.total_songs_english, link:'/study/song/english'},
						{name: '러시아가곡', nameEn:'Russian', total : copy.total_songs_russian, link:'/study/song/russian'},
						{name: '한국가곡', nameEn:'Korean', total : copy.total_songs_korean, link:'/study/song/korea'}
					]
				},
				{name: '작곡가', nameEn:'Composer', total : copy.total_composer, link:'/study/composers'}
			]
	  setList(datacopy)
	} else {
		setIsResdataFalse(true);
	}
  };

  useEffect(() => {
    fetchPosts();
  }, []);  

	const handleIsSubList = (index:number, boolean: boolean ) => {
    const copy = [...isSubList];
    copy[index] = boolean;
    setIsSubList(copy);
  }


	return (
		<div className='main'>

			<div className="main__banner1">
				<div className="inner">
					<div className="main__banner-container">
						<p className="main__banner-slogan">
							<span className="slogan-item">성악을 사랑하는 사람들의</span>
							<span className="slogan-item">커뮤니티 플랫폼</span>
						</p>
						<p className="main__banner-sub_text">"성악하는사람들"은</p>
						<p className="main__banner-sub_text">모든 성악하는 사람들을 응원합니다.</p>
					</div>
				</div>	

  		</div>

			<div className="main__banner2">
				<div className="inner">
					<div className="main__study__notice__cover">
						<div className="main__study__title">
							<p>스터디 자료 현황</p>
						</div>
						<div className="main__study__row">
							{
								list.map((item:any, index:any)=>{
									return (
										<div key={index}>
											<div className="main__study__box"
												onClick={()=>{
													handleIsSubList(index, !isSubList[index])
												}}	
											>
												<div className="main__study__box__left">
													<h1>{item.name}</h1>
													<h2>{item.nameEn}</h2>
												</div>
												<div className="main__study__box__right">
													<h3>{item.total}</h3>
													{
														item.nameEn === 'Composer'
														?
														<div></div>
														:
														<>
														{
															isSubList[index] 
															? <FaAngleUp size={20}/>
															: <FaAngleDown size={20}/>
														}
														</>
													}
												</div>
											</div>
											{
												isSubList[index] &&
												<div className="main__study__subrow"
													onClick={()=>{
														handleIsSubList(index, !isSubList[index])
													}}	
												>
													{ item.subList &&
														item.subList.map((subItem:any, subIndex:any)=>{
															return (
																<div key={subIndex} className='main__study__subbox'>
																	<div className="main__study__subbox__left">
																		<h1>{subItem.name}</h1>
																		<h2>{subItem.nameEn}</h2>
																	</div>
																	<div className="main__study__subbox__right">
																		<h3>{subItem.total}</h3>
																	</div>
																</div>
															)
														})
													}
												</div>
											}
										</div>
									)
								})
							}
						</div>

					</div>
				</div>
			</div>	

           
			<Footer />

		</div>
	);
}
