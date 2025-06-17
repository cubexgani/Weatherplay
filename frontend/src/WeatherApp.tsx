/*
Assemble weather and playlist components here
*/

import { useEffect, useState } from "react";
import getWeatherParams from "./components/get-weather";
import Weather from "./components/Weather";
import type { SongType } from "./components/PlayList";
import PlayList from "./components/PlayList";
import NightBg from './assets/nightsky.jpg'
import DayBg from './assets/daysky.jpg'

type ResponseType = {songdeets: SongType[], roast: string}

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



function WeatherApp() {
    let [isHidden, setHidden] = useState(true)
    let [temp, setTemp] = useState(-1);
    let [isDay, setDay] = useState(-1);
    let [rainfall, setRain] = useState(-1);
    let [prec, setPrec] = useState(-1);
    let [show, setShow] = useState(-1);
    let [playList, setPlayList] = useState<SongType[]>([])
    let [roast, setRoast] = useState("");
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
            let response = await fetch(`http://localhost:8000/songs/${t}/${p}`);
            console.log(response)
            if (response.status == 200) {
                let res : ResponseType = await response.json();
                let songs : SongType[] = res.songdeets;
                let aiRoast : string = res.roast;
                console.log("songs\n", songs);
                if (songs) setPlayList(songs);
                if (aiRoast) setRoast(aiRoast);
            }
            else {
                console.log('Maybe your server isnt turned on??')
            }
        }
        getDeets();
    }, []);

    return (
        <div style={isDay ? dayConfig : nightConfig}>
            <Weather temp={temp} rain={rainfall} prec={prec} show={show} roast={roast} />
            <button onClick={() => {setHidden(!isHidden)}}>Click me for fun I guess</button>
            <div> Here are top 5 songs you can vibe to right now:</div>
            <PlayList songlist={playList} isDay={isDay} />
        </div>
    )
}

export default WeatherApp;