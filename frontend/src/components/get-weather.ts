import { fetchWeatherApi } from 'openmeteo';

async function getWeatherParams() {
    const params = {
        "latitude": 22.5626,
        "longitude": 88.363,
        "current": ["temperature_2m", "is_day", "precipitation", "rain", "showers"],
        "timezone": "Asia/Tokyo",
        "forecast_days": 1
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    
    const current = response.current()!;
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            isDay: current.variables(1)!.value(),
            precipitation: current.variables(2)!.value(),
            rain: current.variables(3)!.value(),
            showers: current.variables(4)!.value(),
        },
    };
    return weatherData;
    
}

export default getWeatherParams;