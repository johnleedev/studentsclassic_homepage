import { atom } from "recoil";


export const recoilLoginState = atom({
  key: "loginState",
  default: false,
});

export const recoilUserData = atom({
  key: "userData",
  default: {
    userAccount : '',
    userName : '',
    userSchool: '',
    userSchNum : '',
    userPart: '',
    grade: ''
  },
});


export const recoilKaKaoLoginData = atom({
  key: "kakaoLoginData",
  default: {
    APIKEY : 'ece291900807a6c37ef7506bac5c1c40',
    REDIRECT_URI_Auth : 'https://www.studentsclassic.com/loginsns'
    // REDIRECT_URI_Auth : 'http://localhost:3000/loginsns'
  },
});


export const recoilNaverLoginData = atom({
  key: "naverLoginData",
  default: {
    CLIENTID : 'NJivxK1ooCxnPodocRjp',
    SECRET : 'SkpvsxS_Ba',
    REDIRECT_URI_Auth : 'https://www.studentsclassic.com/loginsns'
    // REDIRECT_URI_Auth : 'http://localhost:3000/loginsns'
  },
});
