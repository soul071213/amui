import React from "react"
import { useNavigate } from "react-router-dom";

import dry from "../assets/dry.png"
import mucle from "../assets/mucle.png"
import queen from "../assets/queen.png"
import shampoo from "../assets/shampoo.png"

const StartPage = () =>{
    const navigate = useNavigate();

    const Gosetting= ()=>{
        navigate(`/Settingpage`)
    }
    return(
        <>
            <div className="back">
                <img className="dry" src={dry}/>
                <img className="mucle" src={mucle}/>
                <img className="queen" src={queen}/>
                <img className="shampoo" src={shampoo}/>
                <div className="p_b">
                    <div className="back_pdiv">
                        <p className="back_p">늘 당신곁에&nbsp;</p>
                        <p className="back_pim">어무이  </p>
                    </div>
                    <button className="first_button" onClick={Gosetting}>시작하기</button>
                </div>
            </div>
        </>
    )
}

export default StartPage