import React, { useEffect, useState } from 'react';
import company from "../.../images/notice/company.jpg"
import './Detail.scss'
import { IoMdClose } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import MainURL from "../../MainURL";


interface ProfileProps {
  pamphletID : number,
  playerName : string,
  part : string,
  imageName : string,
  career : string,
  isStyleWrite: string
}

export default function Detail (props:any) {

 
  return  (
    <div className='detail'>
      
      <div className='close'
        onClick={()=>{props.setIsViewDetailModal(false)}}>
        <IoMdClose size={30}/>
      </div>

      <div className="inner">

        <div className="name">
          <p>{props.imgName}</p>
        </div>  
        <img className='image'
            src={`${MainURL}/images/portfolio/anmaran/${props.imgUrl}`}
        />
        
      </div>
       
    </div>
  );
}