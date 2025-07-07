import { useEffect, useState } from "react";

type WeatherProps = {temp: number, rain: number, prec: number, show: number, roast: string}

function Clock() {
    let [time, setTime] = useState('00:00:00');
    useEffect(
        () => {
            
            const t = setInterval(() => {
                let dt = new Date();
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

function Weather({temp, rain, prec, show, roast}: WeatherProps) {
    if (temp == Number.MIN_SAFE_INTEGER) {
        return (
            <div className="weather">
                <h1>Fetching some weather data...</h1>
            </div>
        )
    }
    let weather = Math.round(temp);
    return (
        <div className="weather">
            <Clock />
            <h1>It's a whopping {weather}°C today</h1>
            <h2>{roast}</h2>
            <h3>Rain: {rain}mm, Precipitation: {prec}mm, Showers: {show}mm</h3>
        </div>
    )
}

export default Weather;