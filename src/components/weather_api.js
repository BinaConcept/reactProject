
import axios from 'axios';


// const temperatureK = response.data.main.temp;
// const temperatureC = temperatureK - 273.15;

export const WeatherApi = async ()=> {
    try {
      const data =  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Geel&appid=58a1b4f2abe656d149703f45211cd8fe`)
      return data     
    } catch (error) {
      throw error;
    }
  }

