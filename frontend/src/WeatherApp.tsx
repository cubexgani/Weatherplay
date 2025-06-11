/*
Assemble weather and playlist components here
*/

import { useEffect, useState } from "react";
import getWeatherParams from "./get-weather";
import Weather from "./Weather";
import type { SongType } from "./PlayList";
import PlayList from "./PlayList";


function WeatherApp() {
    let [temp, setTemp] = useState(-1);
    let [isDay, setDay] = useState(-1);
    let [rainfall, setRain] = useState(-1);
    let [playList, setPlayList] = useState<SongType[]>([])
    useEffect(() => {
        async function getDeets() {
            let deets = await getWeatherParams();
            let [d, t, r] = [deets.current.isDay, Math.round(deets.current.temperature2m), deets.current.rain];
            setDay(d);
            setTemp(t);
            setRain(r);
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
    }, [])
    return (
        <>
            <Weather temp={temp} isDay={isDay} rain={rainfall} />
            <div> Here are top 5 songs you can vibe to right now:</div>
            <PlayList songlist={playList} />
        </>
    )
}

export default WeatherApp;