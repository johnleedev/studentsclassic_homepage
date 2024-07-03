import './MenuModal.scss'
import { IoMdClose } from "react-icons/io";
import MainURL from "../../MainURL";

export default function MenuModal (props:any) {
   
  return  (
    <div className='menumodal'>
      
      <div className='close'
        onClick={()=>{props.setIsViewMenuModal(false)}}>
        <IoMdClose size={30}/>
      </div>

      <div className="inner">
        {
        props.whichMenuModal === 'Profile' 
        &&
        <div className="profile">
          <section>
            <h1>{props.profile_name} {props.profile_name_en}</h1>
          </section>
          <section>
            <img className='image'
                src={`${MainURL}/images/portfolio/anmaran/profile_${props.artistid}.jpg`}/>
          </section>
          <section>
            <h3>학력</h3>
            {
              props.profile_school.map((item:any, index:any)=>{
                return (
                  <p>{item}</p>
                )
              })  
            }
          </section>
          <section>
            <h3>작품활동</h3>
            {
              props.profile_career.map((item:any, index:any)=> {
                return (
                  <div key={index} className='career-box'>
                    <h4>{item.title}</h4>
                    {
                      item.content.map((subItem: any, subIndex: any)=>{
                        return (
                          <div key={subIndex} className='subbox'>
                            <h5>{subItem.date}</h5>
                            {
                              subItem.name.map((sub2Item: any, sub2Index: any) => {
                                return (
                                  <p key={sub2Index}>{sub2Item}</p>
                                )
                              })
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
              
            }
          </section>
          <section>
            <h3>역임</h3>
            <div className="rowbox">
              <p>{props.profile_duty}</p>
            </div>
          </section>
          <section>
            <h3>작품소장</h3>
            <div className="rowbox">
              <p>{props.profile_collection}</p>
            </div>
          </section>
        </div>
        }

        {
        props.whichMenuModal === 'Note' 
        &&
        <div className="note">
          <section>
            <img className='image'
                src={`${MainURL}/images/portfolio/anmaran/artistnote.png`}
            />
           </section>
          <section>
            {
              props.artistNote.map((item:any, index:any)=>{
                return (
                  <div className="notebox" key={index}>
                    <p>{item}</p>
                  </div>
                )
              })
            }
          </section>
        </div>
        }
        {
        props.whichMenuModal === 'Contact' 
        &&
        <div className="contact">
          <section>
            <h1>연락처</h1>
            <h3>{props.contact.phone === "" ? "없음" : props.contact.phone}</h3>
            <div style={{height:'50px'}}></div>
            <h1>E-Mail</h1>
            <h3>{props.contact.email === "" ? "없음" : props.contact.email}</h3>
          </section>
        </div>
        }
        
      </div>
       
    </div>
  );
}