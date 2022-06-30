import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import './App.css'
import List from './Components/List';
import { v4 as uuid } from 'uuid';
import { BsFillCursorFill } from "react-icons/bs";
import { Helmet } from "react-helmet";
function App() {
  const getStore = () =>{
    const list=localStorage.getItem('item')
    if (list){
      return JSON.parse(localStorage.getItem('item'))
    }
    else{
      return []
    }
  }
  const blueColor = '#B3E8FF';
  const [city,setcity]=useState(" ")
  const [weatherData,setWeatherData]=useState(getStore())
  const data = useRef([]);
  const addlocation = () => {
    console.log(document.querySelector('.locationInput').value)
    setcity(document.querySelector('.locationInput').value)
  }
  useEffect(()=>{
    const url=`https://api.weatherapi.com/v1/current.json?key=7dc8d37257db43c28ae131944222906&q=${city}`
    axios.get(url)
    .then(Data=>{
             data.current=Data;
    }).catch( error => {
            console.log(error.message)  
    })
  },[city])
  const update = ()=>{

  setWeatherData([...weatherData,{
    id:uuid(),
    city:data.current.data.location.name,
    temperature:data.current.data.current.feelslike_c
  }]) 
  setcity('')
}
useEffect(()=>{
    localStorage.setItem('item',JSON.stringify(weatherData))
},[weatherData])

const del= id =>{
const newData =  weatherData.filter(item => {
      return item.id !== id
  });
 console.log(newData)
 setWeatherData(newData)
}
const handleKeypress = e => {
  //it triggers by pressing the enter key
if (e.key === "Enter") {
  update()
}
};
  return (
    <div className="Main">
        <Helmet bodyAttributes={{ style: "background-color :" + blueColor  }} />
       <div className="App">
        <h1 className='header'>WEATHER APP</h1>
        </div>   
        <div className='inputField'>
          <input type="text"  
          placeholder='enter a location' 
          className="locationInput" 
          onChange={addlocation}
          value={city}
          onKeyPress={handleKeypress}
          />
          <button className="btn" onClick={update }><BsFillCursorFill size={30}/></button>
        </div>
        <div>
          <ul>
            {
              weatherData.map( data =>{
                  return <List data={data} del={del}/>
              })
            }
          </ul>
        </div>
    </div>
  );
}

export default App;
