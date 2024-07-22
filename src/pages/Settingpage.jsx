import React, { useState ,useRef} from "react";
import tooth from "../assets/tooth.png";
import cancle from "../assets/cancle.png";
import { useNavigate } from "react-router-dom";
import school from "../assets/hwangsa.jpg";
import shawer from "../assets/raining.jpg";
import goout from "../assets/goout.png";
import sleep from "../assets/sleep.png";




const Settingpage = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState('');
  const [modal, setModal] = useState(false);
 // const url = `http://10.150.151.45:8080/chat?answer=${prompt}`;

  /*const submit = async () =>{
    try{
        const response = await axios.get(url,{});
        console.log(response.data.answer);
    }
    catch(error){
        console.log('에러');
    }
  }*/




  let temptext='';
  const putPrompts = () => {
    console.log(`${prompts}`);
    //submit(prompts);
    navigate(`/Recommendpage`, { state: { prompt: prompts } });
  };
  
  const tempPrompts = () => {
    console.log(`${temptext}`);
    //submit(temptext);
    navigate(`/Recommendpage`, { state: { prompt: temptext } });
  };
  
  const Temp = ({ Tempstate, promptText }) => {
    var pText;
    var pname;
    const handleClick = () => {
      temptext=pText;
      tempPrompts();
    };
    if(promptText==="1"){
      pname="비가 내릴 때";
      pText="비가 많이 오는 날 외출을 할거야";
    }
    else if(promptText==="2"){
      pname="잠을 자기 전";
      pText="이제 잠을 잘거야";
    }
    else if(promptText==="3"){
      pname="외출 하기 전";
      pText="햇볕이 많은 날에 지금 외출을 할거야";
    }
    else if(promptText==="4"){
      pname="황사 일 때";
      pText="황사가 많은데 지금 외출을 할거야";
    }
    
    return (
      <div className="cardbox" onClick={handleClick}>
        <img src={Tempstate} className="boximg"/>
        <p className="cardp">{pname}</p>
      </div>
    );
  };

  const reset = () => {
    setPrompts('');
  };

  const inputnull = () => {
    if (prompts.trim() === '') {
      setModal(true);
    }
    else{
        putPrompts();
    }
   
  };
  const modalclick = () => {
    setModal(false);
    inputRef.current.focus();
    
  }
  const searchModal = () => {
    return(
        <>
            <div className="modalback">
                <p>당신의 일정을 입력해주세요</p>
                <button className="modalbutton" onClick={modalclick}>확인</button>
            </div>
        </>
    )
  }
  return (
    <>
      <div className="back">
        {modal===true? searchModal() : null}
        <img className="tooth" src={tooth} alt="이미지" />
        <div className="inputs">
          <div className="inputtextbox">
            <input
              type="text"
              placeholder="무엇을 할 예정이십니까?"
              className="inputtext"
              value={prompts}
              onChange={(e) => setPrompts(e.target.value)}
              ref={inputRef}
            />
            <button onClick={reset}>
              <img src={cancle} alt="취소"/>
            </button>
          </div>
          <button className="inputtextsubmit" onClick={inputnull}>
            입력하기
          </button>
        </div>
        
        <div className="cards">
          <Temp Tempstate={shawer} promptText="1" />
          <Temp Tempstate={sleep} promptText="2" />
          <Temp Tempstate={goout} promptText="3" />
          <Temp Tempstate={school} promptText="4" />
        </div>
      </div>
    </>
  );
};

export default Settingpage;
