import React, { useCallback, useEffect, useState } from 'react';
import './Community.scss';
import MainURL from '../../MainURL';
import axios from 'axios';
import Footer from '../../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { CiCircleMinus } from "react-icons/ci";
import { format } from "date-fns";
import { useRecoilValue } from 'recoil';
import { recoilUserData } from '../../RecoilStore';

export default function Post () {

  let navigate = useNavigate();
  const location = useLocation();
  const propsSort = location.state.sort;
  const propsMenuNum = location.state.menuNum;
  const userData = useRecoilValue(recoilUserData);

  const [currentMenu, setCurrentMenu] = useState(propsMenuNum);
  interface SelectMenuProps {
    menuNum : number;
    title: string;
    url : string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ menuNum, title, url}) => {
    return (
      <div onClick={()=>{
        setCurrentMenu(menuNum);
        navigate(`/community${url}`)
      }}
        className={currentMenu === menuNum ? "subpage__menu__item subpage__menu__item--on" : "subpage__menu__item"}>
        {title}
      </div>
    )    
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [inputImages, setInputImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 19);
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
          return resizingBlob;
        })
      );
      const fileCopies = resizedFiles.map((resizedFile, index) => {
        return new File([resizedFile], resizedFile.name, {
          type: acceptedFiles[index].type,
        });
      });
      setImageFiles(fileCopies);


      const imageNames = resizedFiles.map((file) => file.name || '');
      setInputImages(imageNames);
      setImageLoading(false);
    } catch (error) {
      console.error('이미지 리사이징 중 오류 발생:', error);
    }
  }, [setImageFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop }); 
 
  // 첨부 이미지 삭제 ----------------------------------------------
  const deleteInputImage = async (Idx:number) => {
    const copy =  [...imageFiles]
    const newItems = copy.filter((item, i) => i !== Idx);
    setImageFiles(newItems);
  };

  // 글쓰기 등록 함수 ----------------------------------------------
  const registerPost = async () => {
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append('img', file);
    });

    const getParams = {
      title : title,
      content: content,
      date : date,
      sort : propsSort,
      userAccount : userData.userAccount,
      userName : userData.userName,
      userSchool : userData.userSchool,
      userSchNum : userData.userSchNum,
      userPart : userData.userPart,
      postImage : JSON.stringify(inputImages)
    }
    axios 
      .post(`${MainURL}/board/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          navigate(-1);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  

  return (
    <div className='community'>

      <div className="inner">

        {/* 왼쪽 메뉴바 */}
        <div className="subpage__menu">
          <div className="subpage__menu__title">커뮤니티</div>
          <div className="subpage__menu__list">
            <SelectMenu title='공지사항' menuNum={1} url={'/'}/>
            <SelectMenu title='콩쿨정보' menuNum={2} url={'/concours'}/>
            <SelectMenu title='구인정보' menuNum={3} url={'/recruit'}/>
            <SelectMenu title='자유게시판' menuNum={4} url={'/free'}/>
            <SelectMenu title='등업신청' menuNum={5} url={'/graderequest'}/>
          </div>
        </div>

        <div className="subpage__main">
          <div className="subpage__main__title">
            {propsSort === 'notice' && <h3>공지사항</h3>}
            {propsSort === 'concours' && <h3>콩쿨정보</h3>}
            {propsSort === 'recruit' && <h3>구인정보</h3>}
            {propsSort === 'free' && <h3>자유게시판</h3>}
            {propsSort === 'graderequest' && <h3>등업신청</h3>}
            <div className='postBtnbox'
              style={{marginRight:'10px'}}
              onClick={()=>{navigate(-1);}}
            >
              <p>목록</p>
            </div>
          </div>
          
          <div className="subpage__main__content">

            <div className="warningBox">
              <p>장난스러운 글이나, 불건전하거나, 불법적인 내용 작성시, 경고 없이 곧바로 글은 삭제됩니다. 또한 사용자 계정은 서비스 사용에 제한이 있을 수 있습니다.</p>
            </div>

            <div className="userBox">
              <FaPen color='#334968' />
              <p>{userData.userName} {userData.userSchool}{userData.userSchNum} {userData.userPart}</p>
            </div>
            <div className="addPostBox">
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
                <p>제목</p>
                <h5 style={{fontSize:'12px'}}>* 최대 200자</h5>
              </div>
              <input value={title} className="inputdefault" type="text" 
                maxLength={200}
                onChange={(e) => {setTitle(e.target.value)}}/>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
                <p>본문</p>
                <h5 style={{fontSize:'12px'}}>* 최대 2000자</h5>
              </div>
              <textarea 
                className="textarea textareapost"
                value={content}
                maxLength={2000}
                onChange={(e)=>{setContent(e.target.value)}}
              />
              {
                propsSort !== 'graderequest' &&
                <p>사진 첨부</p>
              }
            </div>

            {
              propsSort !== 'graderequest' &&
              <div className="imageInputBox">
              {
                imageLoading ?
                <div style={{width:'100%', height:'100%', position:'absolute'}}>
                  <Loading/>
                </div>
                :
                <div className='imageDropzoneCover'>
                  <div {...getRootProps()} className="imageDropzoneStyle" >
                    <input {...getInputProps()} />
                    {
                      imageFiles.length > 0 
                      ? <div className='imageplus'>+ 다시첨부하기</div>
                      : <div className='imageplus'>+ 사진첨부하기</div>
                    }
                  </div>
                </div>
              }
              {
                imageFiles.length > 0 &&
                imageFiles.map((item:any, index:any)=>{
                  return (
                    <div key={index} className='imagebox'>
                      <img 
                        src={URL.createObjectURL(item)}
                      />
                      <p>{item.name}</p>
                      <div onClick={()=>{deleteInputImage(index);}}>
                        <CiCircleMinus color='#FF0000' size={20}/>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            }
            

            <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>

            <div className="buttonbox">
              <div className="button"
              onClick={registerPost}
              >
                <p>작성 완료</p>
              </div>
            </div>

           </div>

           

          
        </div>
      </div>

      <Footer />
    </div>
  )
}



