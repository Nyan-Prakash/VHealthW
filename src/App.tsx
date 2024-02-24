import React, { useState } from 'react';
import logo from './logo.svg';
import tree from './tree.png';
import bush from './bush.png';
import cloud from './cloud.png';
import axios from "axios";


import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";


import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import './App.css';
import CoolInput from './CoolInput';
import CartoonButton from './CartoonButton';
import { click } from '@testing-library/user-event/dist/click';


function App() {


  const [locationName, setLocName] = useState(null);
  const [lat, setLat] = useState(null);
  const [age, setAge] = useState(null);
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);

  const [long, setLong] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setairQuality] = useState(null);
  const [pollenData, setPollen] = useState(null);

  const [test, setTest] = useState(null);
  const [clicked, setClicked] = useState(false);

  const [medical, setMedical] = useState(null);

  setKey("AIzaSyDPxFvD39w1dsueXMrpviPZGK1pS6DoyXY");
  setLanguage("en");
  setRegion("es");
  const nothing = (event) => {
  }

  const handleSetLat = (event) => {
    console.log("yre");

    setLat(event.target.value);
  }
  const handleSetLong = (event) => {
    console.log("yre");

    setLong(event.target.value);
  }
  const handleClick = async () => {
    try {
      console.log("yre");
      const response = await axios.post('http://localhost:5000/weather', { 'Latitude': lat, 'Longitude': long});
      setWeatherData(response.data);
      setClicked(true);


      const responseP = await axios.post('http://localhost:5000/pollen', { 'Latitude': lat, 'Longitude': long});
      setPollen(responseP.data)
/*
      const responseA = await axios.post('http://localhost:5000/airquality', { 'Latitude': lat, 'Longitude': long});
      setairQuality(responseA.data);

      */
      console.log("R")

    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  const handleSetName = (event) => {
      setName(event.target.value);
  }
  const handleMedical = (event) => {
    setMedical(event.target.value);
}
  const handleSetAge = (event) => {
      setAge(event.target.value);
  }
  const handleSetGender = (event) => {
    setGender(event.target.value);
}
  const handleSetLocation = (event) => {
    setLocName(event.target.value);
    
    fromAddress(event.target.value)
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        setLat(lat);
        setLong(lng);
        setTest(event.target.value);
      })
      .catch(console.error);
      
    }


  return (
    <div className="App">
      <div>
      <Parallax pages={10} style={{backgroundColor:"#87CEEB"}}>
      <ParallaxLayer speed={0.2} sticky={{ start: 0, end: 0.5 }}>

          <h1 className='title'> HealthWay </h1>
          
        </ParallaxLayer>
        <ParallaxLayer speed={1}>
        <img src={cloud} alt="Tree" style={{ width: '300px', height: 'auto', position:'absolute', top: "0px", left:"800px" }}></img>
        <img src={cloud} alt="Tree" style={{ width: '300px', height: 'auto', position:'absolute', top: "200px", left:"0" }}></img>
        <img src={cloud} alt="Tree" style={{ width: '300px', height: 'auto', position:'absolute', top: "800px", left:"50px" }}></img>
        <img src={cloud} alt="Tree" style={{ width: '300px', height: 'auto', position:'absolute', top: "600px", right:"400px" }}></img>

        <img src={cloud} alt="Tree" style={{ width: '300px', height: 'auto', position:'absolute', top: "300px", right:"50px" }}></img>
      
        </ParallaxLayer>
        <ParallaxLayer speed={0.2} factor={2} >
          <img src={tree} alt="Tree" style={{ width: '650px', height: 'auto', position:'relative', top: "65px" }}></img>

        </ParallaxLayer>
       

        {/* Layer meant to start at the top of the 5th page, so offset is 4 */}
        <ParallaxLayer style={{backgroundColor:"#2E8B57"}} offset={1} >
        <img src={bush} alt="Tree" style={{ width: '300px', height: 'auto', position:'relative', top: "-100px" }}></img>
        <h1 style={{fontSize:"60px", color:"#AFE1AF"}}> Want to learn about Pollen data near you?</h1>
        </ParallaxLayer>
        <ParallaxLayer offset={2} style={{backgroundColor:"	#b69f66"}}>
        <h2>Your Health Data</h2>
        <CoolInput onChange={handleSetName} placeholder="Name" value={name} ></CoolInput>
        <br></br>
        <CoolInput onChange={handleSetAge} placeholder="Age" value={age}></CoolInput>
        <br></br>
        <CoolInput onChange={handleMedical} placeholder="Medical Condition" value={medical}></CoolInput>
        <br></br>
        <CoolInput onChange={handleSetGender} placeholder="Gender" value={gender} ></CoolInput>


        <br></br>

        <h2>Location:</h2>
        <CoolInput onChange={handleSetLocation} placeholder="Location" value={locationName} ></CoolInput>
        <br></br>

        <br></br>
        <CartoonButton children={"Calculate"} onClick={handleClick} color='green'></CartoonButton>


        {clicked && (
          <div>
            <ParallaxLayer offset={2} speed={0.5}>
          <h1 style={{color:"white"}}>Welcome {name},</h1>
          <h3 style={{color:"white"}}>This is your Personal Environment Advising Report</h3>
        </ParallaxLayer>
        <br></br>
        <br></br>
        <ParallaxLayer offset={3} speed={0.5}>
        <h1 style={{color:"white"}}>Tempature in your area is {weatherData.temp_f} F</h1>
        {weatherData && weatherData.temp_f !== null && weatherData.temp_f < 30 && (
                    <h3 style={{color:"blue", opacity:"0.7"}}>That's pretty cold</h3>
        )}
        {weatherData && weatherData.temp_f !== null && weatherData.temp_f < 60 && (
                    <h3 style={{color:"white", opacity:"0.7"}}>You are chilling</h3>
        )}
        {weatherData && weatherData.temp_f !== null && weatherData.temp_f > 70 && (
                    <h3 style={{color:"red", opacity:"0.7"}}>It's pretty hot</h3>
        )}     
      </ParallaxLayer>

      <br></br>
        <ParallaxLayer offset={4} speed={0.5}>
        <h1 style={{color:"white"}}>Humidity in your area is {weatherData.humidity} %</h1>
        {weatherData && weatherData.humidity !== null && weatherData.humidity < 20 && (
                    <h3 style={{color:"blue", opacity:"0.7"}}>You are in low humidity</h3>
        )}
        {weatherData && weatherData.humidity !== null && weatherData.humidity < 50 && (
                    <h3 style={{color:"white", opacity:"0.7"}}>There is average humidity</h3>
        )}
        {weatherData && weatherData.humidity !== null && weatherData.humidity > 50 && (
                    <h3 style={{color:"red", opacity:"0.7"}}>It's pretty muggy outside huh!</h3>
        )} 
        </ParallaxLayer>

        <ParallaxLayer offset={5} speed={0.5}>
        <h1 style={{color:"white"}}>UV in your area is {weatherData.uv} %</h1>
        {weatherData && weatherData.uv !== null && weatherData.uv < 2 && (
                    <h3 style={{color:"blue", opacity:"0.7"}}>The UV in your area is good. Go Outside!</h3>
        )}
        {weatherData && weatherData.uv !== null && weatherData.uv < 7 && weatherData.uv > 2 && (
                    <h3 style={{color:"white", opacity:"0.7"}}>There is average UV</h3>
        )}
        {weatherData && weatherData.uv !== null && weatherData.uv > 8 && (
                    <h3 style={{color:"red", opacity:"0.7"}}>Avoid being outside for extended peroids of time</h3>
        )} 
        {medical == "Skin Cancer" && (
                    <h3 style={{color:"lightred", opacity:"0.7"}}>Due to your history of Skin Cancer. You wear sunscreen and put on a hat</h3>
        )} 
        </ParallaxLayer>

        
        <ParallaxLayer offset={6} speed={0.5}>
        <h1 style={{color:"white"}}>RainFall is in your area {weatherData.precip_in} %</h1>
        {weatherData && weatherData.precip_in !== null && weatherData.precip_in < 0.1 && (
                    <h3 style={{color:"blue", opacity:"0.7"}}>There is little to no rain</h3>
        )}
        {weatherData && weatherData.precip_in !== null && weatherData.precip_in < 0.1 && weatherData.precip_in > 0.3 && (
                    <h3 style={{color:"white", opacity:"0.7"}}>This is moderate rainfall. I wouldn't plan to be outside long</h3>
        )}
        {weatherData && weatherData.precip_in !== null && weatherData.precip_in > 0.3 && (
                    <h3 style={{color:"red", opacity:"0.7"}}>Avoid being outside for extended peroids of time</h3>
        )} 
        {medical == "Skin Cancer" && (
                    <h3 style={{color:"lightred", opacity:"0.7"}}>Definitely bring an umbrella. Maybe even a poncho?</h3>
        )} 
        </ParallaxLayer>
        


        <ParallaxLayer offset={7} speed={0.5}>
        <h1 style={{color:"white"}}>Pollen Information in your area:</h1>
        {pollenData && pollenData.query?.grassRisk !== null && pollenData.query?.grassRisk == "low" && (
                    <h3 style={{color:"green", opacity:"0.7"}}>Grass Risk: {pollenData.query?.grassRisk}</h3>
        )}
        {pollenData && pollenData.query?.grassRisk !== null && pollenData.query?.grassRisk == "Medium" && (
                    <h3 style={{color:"orange", opacity:"0.7"}}>Grass Risk: {pollenData.query?.grassrisk}</h3>
        )}
        {pollenData && pollenData.query?.grassRisk !== null && pollenData.query?.grassRisk == "High" && (
                    <h3 style={{color:"red", opacity:"0.7"}}>Grass Risk: {pollenData.query?.grassRisk}</h3>
        )}

        {pollenData && pollenData.query?.treeRisk !== null && pollenData.query?.treeRsk == "low" && (
                    <h3 style={{color:"green", opacity:"0.7"}}>Tree Risk: {pollenData.query?.treerisk}</h3>
        )}
        {pollenData && pollenData.query?.treeRisk !== null && pollenData.query?.treeRisk == "medium" && (
                    <h3 style={{color:"orange", opacity:"0.7"}}>Tree Risk: {pollenData.query?.treerisk}</h3>
        )}
        {pollenData && pollenData.query?.treeRisk !== null && pollenData.query?.treeRisk == "migh" && (
                    <h3 style={{color:"red", opacity:"0.7"}}>Tree Risk: {pollenData.query?.treeRisk}</h3>
        )}


        {pollenData && pollenData.query?.weedRisk !== null && pollenData.query?.weedRisk == "low" && (
                    <h3 style={{color:"green", opacity:"0.7"}}>Weed Risk: {pollenData.query?.weedRisk}</h3>
        )}
        {pollenData && pollenData.query?.weedRisk !== null && pollenData.query?.weedRisk == "medium" && (
                    <div><h3>Weed Risk: </h3> 
                    <h3 style={{color:"orange", opacity:"0.7"}}>{pollenData.query?.weedRisk}</h3></div>
                    
        )}
        {pollenData && pollenData.query?.weedRisk !== null && pollenData.query?.weedRisk == "migh" && (
                    <h3 style={{color:"red", opacity:"0.7"}}>Weed Risk: {pollenData.query?.weedRisk}</h3>
        )}
      
        </ParallaxLayer>
        


        </div>
          
        
      )}
        </ParallaxLayer>

     

      <h3 style={{color:"white", opacity:"0.5"}}>By Shaunak, Brennan, Nyan, and Pranav</h3>
      </Parallax>
      </div>
      
    </div>
  );
}



export default App;
