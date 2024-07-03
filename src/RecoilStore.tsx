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
    userPart: ''
  },
});



