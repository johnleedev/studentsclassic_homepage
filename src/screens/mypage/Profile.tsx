import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Mypage.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { RiComputerFill } from "react-icons/ri";
import DaumPostcode from 'react-daum-postcode';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { format } from "date-fns";
import { CiCircleMinus } from "react-icons/ci";


export default function Profile() {

  let navigate = useNavigate();
  const userName = sessionStorage.getItem('userName');
  const userId = sessionStorage.getItem('userId');
  const stOrFa = sessionStorage.getItem('stOrFa');
  const [refresh, setRefresh] = useState<boolean>(false);

  interface ProfileProps {
    userId: string;
    userName: string;
    userPhone: string;
    stOrFa: string;
    userYearStage : string;
    userCoName: string;
    userCoSort : string;
    userCoAddress: string;
    userCoAddressRest: string;
    userCoPhone: string;
    userCoEmail : string;
    userCoHomePage: string;
    userCoNotice: string;
    userCoImage : string;
  }

  const [currentTab, setCurrentTab] = useState(1);
  const [userProfile, setUserProfile] = useState<ProfileProps>();
  const [logisterPhone, setLogisterPhone] = useState('');
  const [logisterCoName, setLogisterCoName] = useState('');
  const [logisterCoSort, setLogisterCoSort] = useState('');
  const [logisterCoAddress, setLogisterCoAddress] = useState('');
  const [logisterCoAddressRest, setLogisterCoAddressRest] = useState('');
  const [logisterCoPhone, setLogisterCoPhone] = useState('');
  const [logisterCoEmail, setLogisterCoEmail] = useState('');
  const [logisterCoHomePage, setLogisterCoHomePage] = useState('');
  const [logisterCoNotice, setLogisterCoNotice] = useState('');
  const [logisterCoImage, setLogisterCoImage] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/mypage/getprofile/${userId}/${userName}`)
    if (res) {
      setUserProfile(res.data[0]);
      setLogisterPhone(res.data[0].userPhone);
      setLogisterCoName(res.data[0].userCoName);
      setLogisterCoSort(res.data[0].userCoSort);
      setLogisterCoAddress(res.data[0].userCoAddress);
      setLogisterCoAddressRest(res.data[0].userCoAddressRest);
      setLogisterCoPhone(res.data[0].userCoPhone);
      setLogisterCoEmail(res.data[0].userCoEmail);
      setLogisterCoHomePage(res.data[0].userCoHomePage);
      setLogisterCoNotice(res.data[0].userCoNotice);
      setLogisterCoImage(res.data[0].userCoImage);
    }
  };

  useEffect(() => {
		fetchPosts();
	}, [refresh]);  


  // 주소 입력 함수
  const [isViewAddressTab, setIsViewAddressTab] = useState<boolean>(false);
  const onCompletePost = (data:any) => {
    const copy = data.address;
    setLogisterCoAddress(copy);
  };

  // 수정 함수
  const handleRevise = async () => {
    await axios
     .post(`${MainURL}/mypage/reviseprofile`, {
        userId : userId,
        userName : userName,
        phone : logisterPhone,
        coName : logisterCoName,
        coSort : logisterCoSort,
        coAddress : logisterCoAddress,
        coAddressRest : logisterCoAddressRest,
        coPhone : logisterCoPhone,
        coEmail : logisterCoEmail,
        coHomePage : logisterCoHomePage,
        coNotice : logisterCoNotice
     })
     .then((res)=>{
       if (res.data) {
          setRefresh(!refresh);
          alert('수정되었습니다.');
          setCurrentTab(1);
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
   };  

  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd-HH-mm-ss');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000
      };
      const resizedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          setImageLoading(true);
          const resizingBlob = await imageCompression(file, options);
          setImageLoading(false);
          return resizingBlob;
        })
      );
      const regexCopy = /[^a-zA-Z0-9!@#$%^&*()\-_=+\[\]{}|;:'",.<>]/g;
      const regex = acceptedFiles[0].name.replace(regexCopy, '');

      const copy = await new File(resizedFiles, `${date}_${userId}_${regex}`, { type: acceptedFiles[0].type });
      console.log(copy);
      setImageFiles([copy]);
      setInputImage(copy.name);
    } catch (error) {
      console.error('이미지 리사이징 중 오류 발생:', error);
    }
  }, [setImageFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop }); 

  // 사진 등록 함수 ----------------------------------------------
  const registerImage = async (file:any) => {
    const formData = new FormData();
    formData.append("img", imageFiles[0]);
    const getParams = {
      userId : userId,
      userName : userName,
      userCoImage : inputImage,
    }
    axios 
      .post(`${MainURL}/mypage/changeprofileimage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          setLogisterCoImage(imageFiles[0].name);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  // 사진 삭제 알림
  const deleteImageAlert = async () => {
    const result = window.confirm('기존의 사진은 삭제되고, 새로 첨부하셔야 합니다. 그래도 변경하시겠습니까?');
    if (result) {
      deleteImage()
    } else {
      return
    }
  };

  // 사진 삭제 함수 ----------------------------------------------
  const deleteImage = async () => {
    axios 
      .post(`${MainURL}/mypage/deleteprofileimage`, {
        userId : userId,
        userName : userName,
        userCoImage : logisterCoImage
      })
      .then((res) => {
        if (res.data) {
          alert('삭제되었습니다. 사진을 새로 첨부해주세요.');
          setImageFiles([]);
          setLogisterCoImage('');
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };
  
  return (
    <div className='mypage'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">마이페이지</div>
          <div className="subpage__menu__list">
            <div
              onClick={()=>{navigate('/mypage');}}
              className="subpage__menu__item subpage__menu__item--on"
            >
              프로필
            </div>
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">프로필</div>

          {
            currentTab === 1 &&
            <div className="reviseBtn"
              onClick={()=>{setCurrentTab(2);}}
            >
              <p>프로필 수정하기</p>
            </div>
          }          
          {
            currentTab === 1
            ?
            <div className="subpage__main__content">
              <div className="main__content">

                <div className="textrow">
                  <h3>이름</h3>
                  <p>{userProfile?.userName}</p>
                </div>
                <div className="textrow">
                  <h3>개인연락처</h3>
                  <p>{userProfile?.userPhone}</p>
                </div>
                <div className="textrow">
                  <h3>기수</h3>
                  <p>{userProfile?.userYearStage}</p>
                </div>

                <div className='divider'></div>

                {
                  ((logisterCoImage === '' || logisterCoImage === null) && imageFiles.length > 0) &&
                  <div className="reviseBtn"
                    style={{border: `2px solid ${imageFiles.length > 0 ? '#1DDB16' : "#fff"}`}}
                    onClick={registerImage}
                  >
                    <p>사진 등록 완료</p>
                  </div>
                }
                {
                  (logisterCoImage !== '' && logisterCoImage !== null) &&
                  <div className="reviseBtn"
                    onClick={deleteImageAlert}
                  >
                    <p>사진 변경하기</p>
                  </div>
                }
                <div className="toparea">
                  <div className="titlecover">
                    <div className="imagebox">
                      {
                        logisterCoImage === '' || logisterCoImage === null
                        ?
                        <>
                        {
                          imageFiles.length > 0 ? (
                          <img
                            src={URL.createObjectURL(imageFiles[0])}
                            style={{ width: '100%', height: 'auto'}}
                          />
                          ) : (
                            <>
                            {
                              imageLoading ?
                              <div style={{width:'100%', height:'100%', position:'absolute'}}>
                                <Loading/>
                              </div>
                              :
                              <div {...getRootProps()} className="imageDropzoneStyle" >
                                <input {...getInputProps()} />
                                <div className='imageplus'>+</div>
                              </div>
                            } 
                            </>
                          )
                        }
                        </>
                        :
                        <img src={`${MainURL}/images/usercoimage/${logisterCoImage}`} alt='postermain'/>
                      }
                      
                    </div>
                    <div className="titlebox">
                      <h3>{userProfile?.userCoName}</h3>
                      <p>대표: {userProfile?.userName} ({userProfile?.userYearStage})</p>
                    </div>
                  </div>
                  <div className="sortcover">
                    <p>{userProfile?.userCoSort}</p>
                  </div>
                </div>
                
                <div className="middlearea">
                  <div className="textbox">
                    <FaPhoneAlt size={16}/>
                    <p>{userProfile?.userCoPhone}</p>
                  </div>
                  <div className="textbox">
                    <IoMail size={16}/>
                    <p>{userProfile?.userCoEmail}</p>
                  </div>
                  <div className="textbox">
                    <RiComputerFill size={16}/>
                    <p>{userProfile?.userCoHomePage}</p>
                  </div>
                </div>

                <div className='divider'></div>

                <div className="textrow">
                  <h3>업체명</h3>
                  <p>{userProfile?.userCoName}</p>
                </div>
                <div className="textrow">
                  <h3>업태/종목</h3>
                  <p>{userProfile?.userCoSort}</p>
                </div>
                <div className="textrow">
                  <h3>업체주소</h3>
                  <p>{userProfile?.userCoAddress} {userProfile?.userCoAddressRest}</p>
                </div>
                <div className="textrow">
                  <h3>업체연락처</h3>
                  <p>{userProfile?.userCoPhone}</p>
                </div>
                <div className="textrow">
                  <h3>업체이메일</h3>
                  <p>{userProfile?.userCoEmail}</p>
                </div>
                <div className="textrow">
                  <h3>업체홈페이지</h3>
                  <p>{userProfile?.userCoHomePage}</p>
                </div>
                <div className="textrow">
                  <h3>업체소개</h3>
                  <p>{userProfile?.userCoNotice === 'null' ? '' : userProfile?.userCoNotice}</p>
                </div>

                
                <div className="reviseBtn"
                  onClick={()=>{setCurrentTab(2);}}
                >
                  <p>프로필 수정하기</p>
                </div>

               
                
              </div>
            </div>
            :

            // 프로필수정 -------------------------------------------------------------------------------------------------------------------------
            <div className="subpage__main__content">
              <div className="main__content">
                <div className="inputbox">
                  <p>연락처</p>
                  <input value={logisterPhone} className="inputdefault" type="text" 
                    onChange={(e) => {setLogisterPhone(e.target.value)}}/>
                </div>
                <div className="inputbox">
                  <p>업체명</p>
                  <input value={logisterCoName} className="inputdefault" type="text" 
                    onChange={(e) => {setLogisterCoName(e.target.value)}}/>
                </div>
                <div className="inputbox">
                  <p>업태/종목</p>
                  <input value={logisterCoSort} className="inputdefault" type="text" 
                    onChange={(e) => {setLogisterCoSort(e.target.value)}}/>
                </div>
                <div className="inputbox">
                  <div className="inputbox-btncover">
                    <p>업체주소</p>
                    <div className="addBtn"
                      onClick={()=>{setIsViewAddressTab(true)}}
                    >주소찾기</div>
                  </div>
                  { isViewAddressTab &&
                    <DaumPostcode
                      style={{
                        width: '400px',
                        height: '400px',
                      }}
                      onComplete={onCompletePost}
                    ></DaumPostcode>
                  }
                  
                  <input value={logisterCoAddress} className="inputdefault" type="text" 
                      onChange={(e) => {setLogisterCoAddress(e.target.value)}}
                    />
                  <input value={logisterCoAddressRest} className="inputdefault" type="text" placeholder="나머지주소"
                    onChange={(e) => {setLogisterCoAddressRest(e.target.value)}}
                  />
                </div>
                <div className="inputbox">
                  <p>업체번호</p>
                  <input value={logisterCoPhone} className="inputdefault" type="text" 
                    onChange={(e) => {setLogisterCoPhone(e.target.value)}}/>
                </div>
                <div className="inputbox">
                  <p>업체이메일</p>
                  <input value={logisterCoEmail} className="inputdefault" type="text" 
                    onChange={(e) => {setLogisterCoEmail(e.target.value)}}/>
                </div>
                <div className="inputbox">
                  <p>업체홈페이지</p>
                  <input value={logisterCoHomePage} className="inputdefault" type="text" 
                    onChange={(e) => {setLogisterCoHomePage(e.target.value)}}/>
                </div>
                <div className="inputbox" style={{}}>
                  <p>업체소개</p>
                  <textarea 
                    className="textarea"
                    value={logisterCoNotice}
                    onChange={(e)=>{setLogisterCoNotice(e.target.value)}}
                  />
                </div>
                <div className="reviseBtn" 
                  onClick={handleRevise}
                >
                  <p>수정완료</p>
                </div>
              </div>
            </div>
          }
        </div> 
      </div>


      <Footer />
    </div>
  )
}
