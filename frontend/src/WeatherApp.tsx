/*
Assemble weather and playlist components here
*/

import { useEffect, useState } from "react";
import getWeatherParams from "./components/get-weather";
import Weather from "./components/Weather";
import NightBg from './assets/nightsky.jpg'
import DayBg from './assets/daysky.jpg'
import PlayEffect from "./components/PlayList";

const appConfig = {
    padding: '70px',
    minHeight: '84vh',
    width: '89.7vw',
}

const dayConfig = {
    ...appConfig,
    backgroundImage: `url(${DayBg})`,
    color: '#003153',
}

const nightConfig = {
    ...appConfig,
    backgroundImage: `url(${NightBg})`,
    color: 'azure'
}

const Languages = ['English', 'Hindi', 'Bengali', 'Japanese', 'Spanish'];

function WeatherApp() {
    let [isHidden, setHidden] = useState(true)
    let [temp, setTemp] = useState(-1);
    let [isDay, setDay] = useState(-1);
    let [rainfall, setRain] = useState(-1);
    let [prec, setPrec] = useState(-1);
    let [show, setShow] = useState(-1);
    let [roast, setRoast] = useState("");

    let [lang, setLang] = useState(Languages[0]);
    let options = Languages.map(language => <option value={language}>{language}</option>)

    useEffect(() => {
        async function getDeets() {
            let deets = await getWeatherParams();
            let [d, t, r, p, s] = [deets.current.isDay, Math.round(deets.current.temperature2m), 
                Number(deets.current.rain.toFixed(2)), 
                Number(deets.current.precipitation.toFixed(2)), 
                Number(deets.current.showers.toFixed(2))];
            setDay(d);
            setTemp(t);
            setRain(r);
            setPrec(p);
            setShow(s);
            let res = await fetch(`http://localhost:8000/roast?temp=${t}&rain=${p}`);
            if (res.status == 404) console.log("Some error happened. Did you provide accurate query params?");
            else if (res.status == 500) console.log("Either the server is not turned on, or you cooked the Gemini API");
            else {
                let roastjson : {roast: string} = await res.json();
                let aiRoast = roastjson.roast;
                setRoast(aiRoast);
            }
        }
        getDeets();
    }, []);
    // Fun fact: ESLint wants me to remove this dependency array, but the website breaks if I don't provide
    // an empty dependency array.

    return (
        <div style={isDay ? dayConfig : nightConfig}>
            <Weather temp={temp} rain={rainfall} prec={prec} show={show} roast={roast} />
            <div>Language of your choice: </div>
            <select onChange={e => setLang(e.target.value)} >
                {options}
            </select>
            <button onClick={() => {setHidden(false)}}>Generate vibes</button>
            {lang && !isHidden && <PlayEffect temp={temp} rain={prec} isDay={isDay} lang={lang} />}
        </div>
    )
}

export default WeatherApp;