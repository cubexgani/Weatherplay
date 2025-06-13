import { useEffect, useState } from "react";

type WeatherProps = {temp: number, isDay: number, rain: number, prec: number, show: number}

function Clock() {
    let [time, setTime] = useState('00:00:00');
    useEffect(
        () => {
            
            const t = setInterval(() => {
                let dt = new Date(Date.now());
                let str = dt.toTimeString().split(' ');
                setTime(str[0]);

            }, 1_000);
            return () => clearInterval(t);
            
        }, []);
    
    return (
            <div >
                <h3>Hello chat it's {time} right now</h3>
            </div>
    )
}

function Weather({temp, isDay, rain, prec, show}: WeatherProps) {
    let weather = Math.round(temp);
    let roast = isDay ? 
    "The sun is shining, the birds are chirping, and you, my friend, are unemployed!" : 
    "The night sky outside looks beautiful! But not from your mother's basement!";
    return (
        <div className="weather clock">
            <Clock />
            <h1>It's a whopping {weather}°C today</h1>
            <h2>{roast}</h2>
            <h3>Rain: {rain}mm, Precipitation: {prec}mm, Showers: {show}mm</h3>
        </div>
    )
}

export default Weather;