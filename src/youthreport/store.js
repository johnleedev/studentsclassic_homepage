import { configureStore, createSlice } from '@reduxjs/toolkit'

let 부서info = createSlice({
  name : '부서info',
  initialState : [
    {id: 1, dep: '영유아2부'},
    {id: 2, dep: '영유아3부'},
    {id: 3, dep: '유치2부'}, 
    {id: 4, dep: '유치3부'},
    {id: 5, dep: '유년2부'},
    {id: 6, dep: '유년3부'},
    {id: 7, dep: '초등2부'},
    {id: 8, dep: '초등3부'},
    {id: 9, dep: '중등부'}, 
    {id: 10, dep: '고등부'}
  ]
}) 

let 빈박스11개 = createSlice({
  name : '빈박스11개',
  initialState : [
    {
      1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:'', 11:''
    }
  ]
}) 

let 빈박스50개 = createSlice({
  name : '빈박스50개',
  initialState : [
    {
      1:'', 2:'', 3:'', 4:'', 5:'', 6:'', 7:'', 8:'', 9:'', 10:'', 11:'', 12:'', 13:'', 14:'', 15:'', 16:'',
      17:'', 18:'', 19:'', 20:'', 21:'', 22:'', 23:'', 24:'', 25:'', 26:'', 27:'', 28:'', 29:'', 30:'', 31:'', 32:'',
      33:'', 34:'', 35:'', 36:'', 37:'', 38:'', 39:'', 40:'', 41:'', 42:'', 43:'', 44:'', 45:'', 46:'', 47:'', 48:'',
      49:'', 50:''
    }
  ]
}) 

export default configureStore({
  reducer: {
    부서info : 부서info.reducer,
    빈박스11개 : 빈박스11개.reducer,
    빈박스50개 : 빈박스50개.reducer
  }
}) 