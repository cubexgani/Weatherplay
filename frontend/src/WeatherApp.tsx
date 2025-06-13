/*
Assemble weather and playlist components here
*/

import { useEffect, useState } from "react";
import getWeatherParams from "./components/get-weather";
import Weather from "./components/Weather";
import type { SongType } from "./components/PlayList";
import PlayList from "./components/PlayList";
import NightBg from './assets/darkbg.jpg'
import DayBg from './assets/daysky.jpg'

const appConfig = {
    padding: '70px',
    minHeight: '84vh',
    width: '89.7vw',
}

const dayConfig = {
    ...appConfig,
    // background: 'linear-gradient(180deg,rgba(137, 247, 254, 1) 0%, rgba(102, 166, 255, 1) 100%)',
    backgroundImage: `url(${DayBg})`,
    color: '#003153',
}

const nightConfig = {
    ...appConfig,
    // background: 'linear-gradient(0deg,rgba(15, 32, 39, 1) 0%, rgba(44, 83, 100, 1) 100%)',
    backgroundImage: `url(${NightBg})`,
    color: 'azure'
}



function WeatherApp() {
    let [isHidden, setHidden] = useState(true)
    let [temp, setTemp] = useState(-1);
    let [isDay, setDay] = useState(-1);
    let [rainfall, setRain] = useState(-1);
    let [prec, setPrec] = useState(-1);
    let [show, setShow] = useState(-1);
    let [playList, setPlayList] = useState<SongType[]>([])

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
            let response = await fetch(`http://localhost:8000/songs/${d}/${t}/${r}`);
            console.log(response)
            if (response.status == 200) {
                let nice = await response.text();
                let songs : SongType[] = JSON.parse(nice);
                console.log(songs);
                if (songs) setPlayList(songs);
            }
            else {
                console.log('Maybe your server isnt turned on??')
            }
        }
        getDeets();
    }, []);

    return (
        <div style={isDay ? dayConfig : nightConfig}>
            <Weather temp={temp} isDay={isDay} rain={rainfall} prec={prec} show={show} />
            <button onClick={() => {setHidden(!isHidden)}}>Click me for fun I guess</button>
            <div> Here are top 5 songs you can vibe to right now:</div>
            <PlayList songlist={playList} isDay={isDay} />
        </div>
    )
}

export default WeatherApp;