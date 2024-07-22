import React, { useState, useEffect } from "react";
import sun from "../assets/sun.png";
import rain from "../assets/rain.png";
import hwang from "../assets/hwang.png";
import axios from "axios";
import { useLocation } from "react-router-dom";
import cloud from "../assets/cloud.png";
import arrow from "../assets/arrow.png";
import umbrella from "../assets/umbrella.png";
import sunglass from "../assets/sunglass.png";
import pureskin from "../assets/pureskin.png";
import mask from "../assets/mask.png";
import eyesmask from "../assets/eyesmask.png";
import { useNavigate } from "react-router-dom";
const Recommendpage = () => {
    const location = useLocation();
    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}`;
    const { prompt } = location.state || { prompt: '' };
    const navigate = useNavigate();
    const url = `http://192.168.223.213:8080/chat?answer=${prompt}`;
    const url2 = `http://192.168.223.213:8080/weather`;

    const [temp, setTemp] = useState();
    const [weather, setWeather] = useState();
    
    const [sunglasses, setsunglass] = useState(false);
    const [umbrellas, setumbrella] = useState(false);
    const [suncream, setsuncream] = useState(false);
    const [masks, setmask] = useState(false);
    const [eyemasks, seteyemask] = useState(false);

    const [imgp, setimgp] = useState();
    const [myitem, setmyitem] = useState([]);

    const promptget1 = async () => {
        try {
            const response = await axios.get(url2);
            setTemp(response.data.temp.toFixed(0));
            setWeather(response.data.weather);
        } catch (err) {
            console.log('에러: ', err);
        }
    };

    const promptget2 = async () => {
        try {
            const response = await axios.get(url);
            setsunglass(response.data.sunglasses);
            setmask(response.data.mask);
            setsuncream(response.data.suncream);
            setumbrella(response.data.umbrella);
            seteyemask(response.data.eyemask);
            console.log(response.data);
        } catch (err) {
            console.log('에러: ', err);
        }
    };

    useEffect(() => {
        promptget1();
        promptget2();
    }, []);

    useEffect(() => {
        const items = [];
        if (sunglasses) {
            items.push({ name: "썬글라스", image: sunglass });
        }
        if (umbrellas) {
            items.push({ name: "우산", image: umbrella });
        }
        if (suncream) {
            items.push({ name: "썬크림", image: pureskin });
        }
        if (masks) {
            items.push({ name: "마스크", image: mask });
        }
        if (eyemasks) {
            items.push({ name: "안대", image: eyesmask });
        }
        setmyitem(items);
    }, [sunglasses, umbrellas, suncream, masks, eyemasks]);

    useEffect(() => {
        console.log("myitem updated:", myitem);
    }, [myitem]);

    useEffect(() => {
        if (weather) {
            if (prompt.includes("구름")) {
                setimgp(cloud);
            } else if (prompt.includes("햇")) {
                setimgp(sun);
            } else if (prompt.includes("황사")) {
                setimgp(hwang);
            } else if (prompt.includes("비")) {
                setimgp(rain);
            }
            else{
                setimgp(cloud); 
            }
        }
    }, [weather]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const handleButtonClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % myitem.length);
    };
    
    const gotofirst = () => {
        navigate(`/`);
      };
    return (
        
        <>
            
            <div className="back">
                <div className="outp">
                    <p>오늘</p>
                    <div>
                        <p className="outpim">너의 하루</p>
                        <p>를</p>
                    </div>
                    <p>챙겨줄 물건은?</p>
                </div>
            </div>
            <div className="reboxs">
                <div className="reboxscolumn">
                    <div className="rebox">
                        <p>{temp}°c</p>
                    </div>
                    <p>기온</p>
                </div>
                <div className="reboxscolumn">
                    <div className="rebox">
                        <div className="reboximg">
                            <img src={imgp} onClick={gotofirst} />
                        </div>
                    </div>
                    <p>날씨</p>
                </div>
                <div className="reboxscolumn">
                    <div className="rebox">
                        <p>{formattedDate}</p>
                    </div>
                    <p>날짜</p>
                </div>
            </div>
            <div className="ac">
                <div className="app-container">
                    <button className="arrow_button" onClick={handleButtonClick}>
                        <img className="arrow_buttons" src={arrow} alt="arrow button" />
                    </button>
                    <div className="itemsbox">
                    {myitem.map((item, index) => (
                        <div
                            className={`itembox ${index === currentIndex ? 'active' : ''} ${index === (currentIndex + 1) % myitem.length ? 'next' : ''} ${index === (currentIndex - 1 + myitem.length) % myitem.length ? 'prev' : ''}`}
                            key={index}
                        >
                            
                           <div className="itemsimgp">
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </>
    );
}

export default Recommendpage;
