import { WeatherApi } from '../components/weather_api'
import React, {useState, useEffect} from 'react';

function Info() {
    const [weatherdata, setWeatherData] = useState(null);


    const getData=async()=>{
      try{
      const response = await WeatherApi();
      setWeatherData(parseFloat(response.data.main.temp - 273.15).toFixed(1));
        }catch(error){
          console.log(error.message)
        }
    
    }
    useEffect(() => {
      getData();
    }, []); 

  return (
      <>
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3">Bulent Arslan</h1>
          <p>Deze applicatie dient voor nieuws berichten te laden vanuit externe bron. We kunnen ook deze news indien nodig aanpassen of nieuwe erbij maken. We gebruiken <b>Redux</b> om data over te dragen tussen komponenten. De data word ook in locale database opgeslagen</p>
          
        </div>
      </div>

      <div className="container">
        {/* <!-- Example row of columns --> */}
        <div className="row">
          <div className="col-md-4">
            <h2>Weerstation</h2>
            <p><p className="text-center" style={{borderRadius:10,border:1,width:150,padding:1,border:"2px solid black" }}>Geel {weatherdata} °C</p>
       </p>
            
          </div>
          <div className="col-md-4">
            <h2>Werk</h2>
            <p>Als wernemer oefen ik mijn job als PLC development bij een firma dit is gespecialiseerd in automatisatie.</p>
            
          </div>
          <div className="col-md-4">
            <h2>Gezin</h2>
            <p>Ik ben een vander van drie kinderen twee meijjes en een jongen. Programmeren is voor mij een passie. Ik ook zoals jij later les geven voor die gene die graag wilt programmeren</p>
            
          </div>
        </div>

        <hr/>

      </div> 

      
      </>
    
  )
}

export default Info
