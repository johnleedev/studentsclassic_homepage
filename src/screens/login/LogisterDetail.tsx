import React, { useEffect, useState } from "react";
import axios from "axios";
import './Login.scss'
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import MainURL from "../../MainURL";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";


export default function LogisterDetail(props:any) {
  
  let navigate = useNavigate();
  const location = useLocation();
  const propsData = location.state;

  const [currentTab, setCurrentTab] = useState(1);

  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [checkUsingPolicy, setCheckUsingPolicy] = useState<boolean>(false);
  const [checkPersonalInfo, setCheckPersonalInfo] = useState<boolean>(false);
  const [checkContentsRestrict, setCheckContentsRestrict] = useState<boolean>(false);
  const [checkInfoToOthers, setCheckInfoToOthers] = useState<boolean>(false);
  const [checkServiceNotifi, setCheckServiceNotifi] = useState<boolean>(false);

  const handleCheckAll = async () => {
    if (checkAll === true) {
      setCheckAll(false);
      setCheckServiceNotifi(false);
      setCheckInfoToOthers(false);
      setCheckContentsRestrict(false);
      setCheckPersonalInfo(false);
      setCheckUsingPolicy(false);
    } else {
      setCheckAll(true);
      setCheckServiceNotifi(true);
      setCheckInfoToOthers(true);
      setCheckContentsRestrict(true);
      setCheckPersonalInfo(true);
      setCheckUsingPolicy(true);
    }
   };

  const [selectSchool, setSelectSchool] = useState('');
  const [selectSchoolList, setSelectSchoolList] = useState<{value:string; label:string}[]>([]);
  const highschools = [
    { value: '선택', label: '선택' },
    { value: '강원예고', label: '강원예고' },
    { value: '경기예고', label: '경기예고' },
    { value: '경남예고', label: '경남예고' },
    { value: '경북예고', label: '경북예고' },
    { value: '계원예고', label: '계원예고' },
    { value: '고양예고', label: '고양예고' },
    { value: '광주예고', label: '광주예고' },
    { value: '김천예고', label: '김천예고' },
    { value: '대전예고', label: '대전예고' },
    { value: '덕원예고', label: '덕원예고' },
    { value: '부산예고', label: '부산예고' },
    { value: '브니엘예고', label: '브니엘예고' },
    { value: '서울예고', label: '서울예고' },
    { value: '선화예고', label: '선화예고' },
    { value: '세종예고', label: '세종예고' },
    { value: '안양예고', label: '안양예고' },
    { value: '울산예고', label: '울산예고' },
    { value: '인천예고', label: '인천예고' },
    { value: '전남예고', label: '전남예고' },
    { value: '전주예고', label: '전주예고' },
    { value: '충남예고', label: '충남예고' },
    { value: '충북예고', label: '충북예고' },
    { value: '포항예고', label: '포항예고' }
  ];
  const univercitys = [
    { value: '선택', label: '선택' },
    { value: '가천대', label: '가천대' },
    { value: '경북대', label: '경북대' },
    { value: '경희대', label: '경희대' },
    { value: '계명대', label: '계명대' },
    { value: '국민대', label: '국민대' },
    { value: '군산대', label: '군산대' },
    { value: '단국대', label: '단국대' },
    { value: '대구가톨릭대', label: '대구가톨릭대' },
    { value: '목원대', label: '목원대' },
    { value: '서울대', label: '서울대' },
    { value: '서울사이버대', label: '서울사이버대' },
    { value: '성신여대', label: '성신여대' },
    { value: '수원대', label: '수원대' },
    { value: '숙명여대', label: '숙명여대' },
    { value: '연세대', label: '연세대' },
    { value: '영남대', label: '영남대' },
    { value: '이화여대', label: '이화여대' },
    { value: '장신대', label: '장신대' },
    { value: '전북대', label: '전북대' },
    { value: '전주대', label: '전주대' },
    { value: '제주대', label: '제주대' },
    { value: '중앙대', label: '중앙대' },
    { value: '추계예대', label: '추계예대' },
    { value: '충남대', label: '충남대' },
    { value: '한세대', label: '한세대' },
    { value: '한양대', label: '한양대' },
    { value: '한예종', label: '한예종' }
  ];

  const publicSchool = [
    { value: '선택', label: '선택' },
    { value: '일반고', label: '일반고' },
    { value: '일반대', label: '일반대' }
  ];

  const sch_num = [
    { value: '선택', label: '선택' },
    { value: '25', label: '25' },
    { value: '24', label: '24' },
    { value: '23', label: '23' },
    { value: '22', label: '22' },
    { value: '21', label: '21' },
    { value: '20', label: '20' },
    { value: '19', label: '19' },
    { value: '18', label: '18' },
    { value: '17', label: '17' },
    { value: '16', label: '16' },
    { value: '15', label: '15' },
    { value: '14', label: '14' },
    { value: '13', label: '13' },
    { value: '12', label: '12' },
    { value: '11', label: '11' },
    { value: '10', label: '10' },
    { value: '09', label: '09' },
    { value: '08', label: '08' },
    { value: '07', label: '07' },
    { value: '06', label: '06' },
    { value: '05', label: '05' },
    { value: '04', label: '04' },
    { value: '03', label: '03' },
    { value: '02', label: '02' },
    { value: '01', label: '01' },
    { value: '00', label: '00' },
    { value: '99+', label: '99+' },
    { value: '청소년', label: '청소년' }
  ];

  const part = [
    { value: '선택', label: '선택' },
    { value: 'Sop.', label: 'Sop.' },
    { value: 'Mez.', label: 'Mez.' },
    { value: 'Ten.', label: 'Ten.' },
    { value: 'Bar.', label: 'Bar.' },
    { value: 'Bass.', label: 'Bass.' },
    { value: '비전공', label: '비전공' }
  ];


  const [logisterAccount, setlogisterAccount] = useState(propsData.email);
  const [logisterName, setLogisterName] = useState(propsData.name);
  const [logisterSchool, setLogisterSchool] = useState('');
  const [logisterSchNum, setLogisterSchNum] = useState('');
  const [logisterPart, setLogisterPart] = useState('');
  
  const handleLogister = async () => {
    const userData = {
      checkUsingPolicy : checkUsingPolicy,
      checkPersonalInfo: checkPersonalInfo,
      checkContentsRestrict: checkContentsRestrict,
      checkInfoToOthers: checkInfoToOthers,
      checkServiceNotifi: checkServiceNotifi,
      email : logisterAccount,
      name : logisterName,
      userSchool : logisterSchool,
      userSchNum : logisterSchNum,
      userPart : logisterPart,
      userURL : propsData.userURL
    }

    await axios
     .post(`${MainURL}/login/logisterdo`, {userData})
     .then((res)=>{
       if (res.data) {
         alert('가입이 완료되었습니다. 로그인 해주세요.');
         navigate('/login');
       }
     })
     .catch((err)=>{
       alert('다시 시도해주세요.')
     })
   };

   
  return (
    <div className="login">
      
      <div className="inner">

      {
        currentTab === 1 &&
        <div className="container">
          <div className="title">
            <h1>회원가입</h1>
            <p>서비스 약관에 동의를 해주세요.</p>
          </div>

          <div className="stepnotice">
            <div className="currentbar">
              <p>SNS가입</p>
              <p style={{margin:'0 10px', paddingTop:'5px'}}><FaAngleDoubleRight /></p>
              <p className="current">동의</p>
              <p style={{margin:'0 10px', paddingTop:'5px'}}><FaAngleDoubleRight /></p>
              <p>정보입력</p>
            </div>
            <div className="rowbar"></div>
          </div>

          <div className="agree_check">
            <ul className="agree_check_tit">
              <li>
                <span className="checks check_all"
                  onClick={handleCheckAll}
                >
                  <FaCircleCheck size={20} color={checkAll ? "#33383f" : "EAEAEA"}/>
                  <label htmlFor="reg_allcheck">모두 동의 합니다.</label>
                </span>
              </li>
            </ul>
            <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>

            <ul className="agree_check_tit">
              <li>
                <span className="checks"
                  onClick={()=>{
                    setCheckUsingPolicy(!checkUsingPolicy);
                  }}
                >
                  <FaCircleCheck size={20} color={checkUsingPolicy ? "#33383f" : "EAEAEA"}/>
                  <label htmlFor="reg_use">[필수] 서비스 이용약관 동의</label>
                </span>
                <a href="https://www.studentsclassic.com/usingpolicy.html" target="_blank" className="agree_link">이용약관 보기</a>
              </li>
              <li>
                <span className="checks"
                  onClick={()=>{
                    setCheckPersonalInfo(!checkPersonalInfo);
                  }}
                >
                  <FaCircleCheck  size={20} color={checkPersonalInfo ? "#33383f" : "EAEAEA"}/>
                  <label htmlFor="reg_personal">[필수] 개인정보 수집/이용 동의</label>
                </span>
                <a href="https://www.studentsclassic.com/personalinfo.html" target="_blank" className="agree_link">개인정보 수집/이용 보기</a>
              </li>
              <li>
                <span className="checks"
                  onClick={()=>{
                    setCheckContentsRestrict(!checkContentsRestrict);
                  }}
                >
                  <FaCircleCheck  size={20} color={checkContentsRestrict ? "#33383f" : "EAEAEA"}/>
                  <label htmlFor="reg_provision">[필수] 유해 컨텐츠에 대한 제재 동의</label>
                </span>
              </li>
              <li>
                <span className="checks"
                  onClick={()=>{
                    setCheckInfoToOthers(!checkInfoToOthers);
                  }}
                >
                  <FaCircleCheck  size={20} color={checkInfoToOthers ? "#33383f" : "EAEAEA"}/>
                  <label htmlFor="reg_provision">[필수] 제3자 정보 제공 동의</label>
                </span>
              </li>
              <li>
                <span className="checks"
                  onClick={()=>{
                    setCheckServiceNotifi(!checkServiceNotifi);
                  }}
                >
                  <FaCircleCheck  size={20} color={checkServiceNotifi ? "#33383f" : "EAEAEA"}/>
                  <label htmlFor="reg_benefit">[선택] 혜택성 정보수신 동의</label>
                </span>
              </li>
            </ul>
          </div>

          <div className="buttonbox">
            <div className="button"
              style={{backgroundColor: (checkInfoToOthers && checkPersonalInfo && checkContentsRestrict && checkUsingPolicy) ? '#33383f' : '#bfbfbf'}}
              onClick={()=>{
                if (checkInfoToOthers && checkPersonalInfo && checkContentsRestrict && checkUsingPolicy) {
                  setCurrentTab(2);
                } else {
                  alert('필수 항목을 모두 체크해주세요.')
                }
              }}
            >
              <p>다음</p>
            </div>
          </div>
        </div>
      }

      {
        currentTab === 2 &&
        <div className="container">
          
          <div className="title">
            <h1>회원가입</h1>
            <p>다음 정보를 입력해주세요.</p>
          </div>

          <div className="stepnotice">
            <div className="currentbar">
              <p>SNS가입</p>
              <p style={{margin:'0 10px', paddingTop:'5px'}}><FaAngleDoubleRight /></p>
              <p>동의</p>
              <p style={{margin:'0 10px', paddingTop:'5px'}}><FaAngleDoubleRight /></p>
              <p className="current">정보입력</p>
            </div>
            <div className="rowbar"></div>
          </div>

          <h2>필수항목</h2>

          <div className="inputbox">
            <p>이메일주소 <span>*</span></p>
            <input value={logisterAccount} className={logisterAccount === '' ? "inputdefault" : "inputdefault select" } type="text" 
              onChange={(e) => {
                setlogisterAccount(e.target.value)}
              }/>
          </div>
          <div className="inputbox">
            <p>이름 <span>*</span></p>
            <input value={logisterName} className={logisterName === '' ? "inputdefault" : "inputdefault select" } type="text" 
              onChange={(e) => {setLogisterName(e.target.value)}}/>
          </div>
        
          <div className="inputbox">
            <p>학교<span>*</span></p>
            <div className="checkInputCover">
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={selectSchool === 'univercity'}
                  onChange={()=>{setSelectSchool('univercity'); setSelectSchoolList(univercitys)}}
                />
                <h5>음악대학</h5>
              </div>
              <div className='checkInput' style={{marginLeft:'10px'}}>
                <input className="input" type="checkbox"
                  checked={selectSchool === 'highSchool'}
                  onChange={()=>{setSelectSchool('highSchool'); setSelectSchoolList(highschools)}}
                />
                <h5>예술고</h5>
              </div>
              <div className='checkInput' style={{marginLeft:'10px'}}>
                <input className="input" type="checkbox"
                  checked={selectSchool === 'general'}
                  onChange={()=>{setSelectSchool('general'); setSelectSchoolList(publicSchool)}}
                />
                <h5>일반</h5>
              </div>
            </div>
            {
              selectSchool !== '' && selectSchoolList.length > 0 &&
              <div className="dropdownBox-cover">
                <select 
                  value={logisterSchool} 
                  onChange={(e)=>{setLogisterSchool(e.target.value)}}
                  className="dropdownBox"
                >
                  {
                    selectSchoolList.map((option:any, index:any) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  }
                </select>
              </div>
            }
          </div>

          <div className="inputbox">
            <p>학번<span>*</span></p>
            <div className="dropdownBox-cover">
              <select 
                value={logisterSchNum} 
                onChange={(e)=>{setLogisterSchNum(e.target.value);}}
                className="dropdownBox"
              >
                {
                  sch_num.map((option:any, index:any) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="inputbox">
            <p>파트<span>*</span></p>
            <div className="dropdownBox-cover">
              <select 
                value={logisterPart} 
                onChange={(e)=>{setLogisterPart(e.target.value);}}
                className="dropdownBox"
              >
                {
                  part.map((option:any, index:any) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div style={{width:'100%', height:'2px', backgroundColor:'#EAEAEA', margin:'10px 0'}}></div>

          { logisterSchool !== '' && logisterSchNum !== '' && logisterPart !== '' &&
            <div className="inputbox">
              <p>학교: {logisterSchool}</p>
              <p>학번: {logisterSchNum}</p>
              <p>파트: {logisterPart}</p>
            </div>
          }
        
          <div className="buttonbox">
            <div className="button"
              style={{backgroundColor: (selectSchool !== '' && logisterSchool !== '' && logisterSchNum !== '' && logisterPart !== '') ? '#33383f' : '#bfbfbf'}}
              onClick={()=>{
                if (selectSchool !== '' && logisterSchool !== '' && logisterSchNum !== '' && logisterPart !== '') {
                  handleLogister();
                } else {
                  alert('필수항목을 선택해주세요.')
                }
              }}
            >
              <p>회원가입</p>
            </div>
          </div>

          <div className="bottombox">
            <div className="cover">
              <p onClick={()=>{setCurrentTab(1)}}>이전</p>
            </div>
          </div>
          
        </div>
      }  

      </div>

      <Footer/>
    </div>
  );
}
