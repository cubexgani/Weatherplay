
type WeatherProps = {temp: number, isDay: number, rain: number}

function Weather({temp, isDay, rain}: WeatherProps) {
    
    let dt = Date.now();
    let pepe = new Date(dt)
    let str = pepe.toTimeString().split(' ')
    let weather = Math.round(temp);
    return (
        <div className="weather">
            <h3>Hello chat it's {str[0]} right now</h3>
            <h1>It's a whopping {weather} degrees celsius today</h1>
            <h2>The sun is shining, the birds are chirping, and you, my friend, are unemployed!</h2>
            <h3>So now is it day? {isDay}</h3>
            <h3>What about rain? {rain}</h3>
        </div>
    )
}

export default Weather;