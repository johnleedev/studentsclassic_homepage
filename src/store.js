import { configureStore, createSlice } from '@reduxjs/toolkit'

let 부서info = createSlice({
  name : '부서info',
  initialState : [
  
  ]
}) 


export default configureStore({
  reducer: {
    부서info : 부서info.reducer,
  }
}) 