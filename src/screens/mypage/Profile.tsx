import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Mypage.scss';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { format } from "date-fns";
import { useRecoilValue } from 'recoil';
import { recoilLoginState, recoilUserData } from '../../RecoilStore';


export default function Profile() {

  let navigate = useNavigate();
  const isLogin = useRecoilValue(recoilLoginState);
  const userData = useRecoilValue(recoilUserData);

  const [currentTab, setCurrentTab] = useState(1);
  const [refresh, setRefresh] = useState<boolean>(false);

  interface ProfileProps {
    grade : string;
    userAccount: string;
    userName: string;
    userSchool: string;
    userSchNum: string;
    userPart: string;
    userImage : string;
  }
  
  const [userProfile, setUserProfile] = useState<ProfileProps>();
  const [userAccount, setUserAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [userSchool, setUserSchool] = useState('');
  const [userSchNum, setUserSchNum] = useState('');
  const [userPart, setUserPart] = useState('');
  const [userImage, setUserImage] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/mypage/getprofile/${userData.userAccount}`)
    if (res.data) {
      setUserProfile(res.data[0]);
      setUserAccount(res.data[0].userAccount);
      setUserName(res.data[0].userName);
      setUserSchool(res.data[0].userSchool);
      setUserSchNum(res.data[0].userSchNum);
      setUserPart(res.data[0].userPart);
      setUserImage(res.data[0].userImage);
    }
  };

  useEffect(() => {
		fetchPosts();
	}, [refresh]);  



  // 수정 함수
  const handleRevise = async () => {
    await axios
     .post(`${MainURL}/mypage/changeprofile`, {
        userAccount : userAccount,
        userName : userName,
        userSchool : userSchool,
        userSchNum : userSchNum,
        userPart : userPart,
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

      const copy = await new File(resizedFiles, `${date}_${userAccount}_${regex}`, { type: acceptedFiles[0].type });
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
      userAccount : userAccount,
      userImage : inputImage,
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
          setUserImage(imageFiles[0].name);
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
        userAccount : userAccount,
        userImage : userImage
      })
      .then((res) => {
        if (res.data) {
          alert('삭제되었습니다. 사진을 새로 첨부해주세요.');
          setImageFiles([]);
          setUserImage('');
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
                
                <div className="imagearea">
                  <div className="imagebox">
                    {
                      (userImage !== '' && userImage !== null)
                      ?
                      <img src={`${MainURL}/images/userImage/${userImage}`} alt='postermain'/>
                      :
                      <p style={{fontSize:14}}>등록된 사진이 없습니다.</p>
                    }
                  </div>
                </div>

                <div className="textarea">
                  <div className="textrow">
                    <h3>회원등급</h3>
                    <p>{userProfile?.grade === 'new' ? '일반회원' : '정회원'}</p>
                  </div>
                  <div className="textrow">
                    <h3>계정</h3>
                    <p>{userProfile?.userAccount}</p>
                  </div>
                  <div className="textrow">
                    <h3>이름</h3>
                    <p>{userProfile?.userName}</p>
                  </div>
                  <div className="textrow">
                    <h3>학교</h3>
                    <p>{userProfile?.userSchool}</p>
                  </div>
                  <div className="textrow">
                    <h3>학번</h3>
                    <p>{userProfile?.userSchNum}</p>
                  </div>
                  <div className="textrow">
                    <h3>파트</h3>
                    <p>{userProfile?.userPart}</p>
                  </div>
                </div>

              </div>

              <div className='divider'></div>

              <div className="reviseBtn"
                onClick={()=>{setCurrentTab(2);}}
              >
                <p>프로필 수정하기</p>
              </div>
            </div>
            :
            // 프로필수정 -------------------------------------------------------------------------------------------------------------------------
            <div className="subpage__main__content">
              
              <div className="main__content">
                
                <div className="imagearea">
                  <div className="imagebox">
                    {
                      userImage === '' || userImage === null
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
                      <img src={`${MainURL}/images/userImage/${userImage}`} alt='postermain'/>
                    }
                  </div>
                </div>
                <div className="textarea">
                  <div className="textrow">
                    <h3>이름</h3>
                    <input value={userName} className="profileinputdefault" type="text" 
                      onChange={(e) => {setUserName(e.target.value)}}/>
                  </div>
                  <div className="textrow">
                    <h3>학교</h3>
                    <input value={userSchool} className="profileinputdefault" type="text" 
                      onChange={(e) => {setUserSchool(e.target.value)}}/>
                  </div>
                  <div className="textrow">
                    <h3>학번</h3>
                    <input value={userSchNum} className="profileinputdefault" type="text" 
                      onChange={(e) => {setUserSchNum(e.target.value)}}/>
                  </div>
                  <div className="textrow">
                    <h3>파트</h3>
                    <input value={userPart} className="profileinputdefault" type="text" 
                      onChange={(e) => {setUserPart(e.target.value)}}/>
                  </div>
                </div>
              </div>
              {
                ((userImage === '' || userImage === null) && imageFiles.length > 0) &&
                <div className="reviseBtn"
                  style={{border: `2px solid ${imageFiles.length > 0 ? '#1DDB16' : "#fff"}`}}
                  onClick={registerImage}
                >
                  <p>사진 등록 완료</p>
                </div>
              }
              {
                (userImage !== '' && userImage !== null) &&
                <div className="reviseBtn"
                  onClick={deleteImageAlert}
                >
                  <p>사진 변경하기</p>
                </div>
              }

              <div className='divider'></div>

              <div className="reviseBtn" 
                  onClick={()=>{
                    setCurrentTab(1);
                  }}
                >
                  <p>이전</p>
                </div>
                <div className="reviseBtn" 
                  onClick={handleRevise}
                >
                  <p>수정완료</p>
                </div>
            </div>
          }
        </div> 
      </div>


      <Footer />
    </div>
  )
}
