import React, {useState,useEffect} from 'react'
import '../style/components-style/weather.css'

function Weather() {
  const [weatherDetails, setWeatherDetails] = useState({
    city: '',
    date: '',
    temp: '',
    desc: '',
    icon: ''
  })
  useEffect( () =>{fetchWeatherData()},[])

  async function fetchWeatherData() {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=hangzhou&appid=5a6daf6c8416635efbaf97563af8eba1`
    ).then((res) => res.json());

    if (data.cod == 200) {
      setWeatherDetails({
        city: data.city.name,
        date: data.list[0].dt_txt,
        temp: data.list[0].main.temp,
        desc: data.list[0].weather[0].description,
        icon: data.list[0].weather[0].icon
      });
    } else if (data.cod == 404) {
      alert("Failed to fetch weather data");
    }
  }

  function convertDate(date){
    const day = new Date(date) 
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeekIndex = day.getDay()
    const dayOfWeek = daysOfWeek[dayOfWeekIndex]
    return dayOfWeek
  }

  return (
    <div className='weather'>
      <img className='icon' src={`./weather-icons/${weatherDetails.icon}.svg`}></img>
      <div className='details'>
        <span className='day'>{convertDate(weatherDetails.date)}</span>
        <span className='city'>{weatherDetails.city}</span>
        <span className='tem'>Temperature: {Math.round(weatherDetails.temp - 273.15)}℃</span>
        <span className='desc'>{weatherDetails.desc}</span>
      </div>
    </div>
  )
}

export default Weather