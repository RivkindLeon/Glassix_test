import './App.css';
import React, {useState} from "react";
import {MY_GOOGLE_MAP_API_KEY, MY_IPDATA_API_KEY} from "./utils/constants";

function App() {

    const [latitude,setLatitude] = useState(null)
    const [longitude,setLongitude] = useState(null)
    const [userCountry,setUserCountry] = useState(null)
    const [userCity,setUserCity] = useState(null)
    const [userFlag,setUserFlag] = useState(null)

    const getLocation =()=>{
        reloadMap()
        fetch(`https://api.ipdata.co/?api-key=${MY_IPDATA_API_KEY}`)
            .then(response => response.json())
            .then(data =>{
                setLongitude(data.longitude);
                setLatitude(data.latitude);
                setUserCountry(data.country_name);
                setUserCity(data.city);
                setUserFlag(data.flag)
            })
    }
    const reloadMap = ()=>{
        setLongitude(null);
        setLatitude(null);
        setUserCountry(null);
        setUserCity(null);
        setUserFlag(null)
    }
  return (
    <div className='container'>
        <div className='text-center'>
            <h2>Glassix Test Project</h2>
            <h5>Your Address:
                {userCountry?<span>{userCountry} </span>:null}
                {userCity?<span>, {userCity}</span>:null}
                {userFlag? <img src={`${userFlag}`} alt="flag"/>:null}
            </h5>
            <button onClick={getLocation} className='btn btn-success '>{!latitude&&!longitude ?"Get My location":"Update my location"}</button>
            {longitude&&latitude ?
                <iframe
                    className='map d-block'
                    src={`https://www.google.com/maps/embed/v1/view?zoom=10&center=${latitude},${longitude}&key=${MY_GOOGLE_MAP_API_KEY}`}
                    >
                </iframe>:null}
        </div>

    </div>
  );
}

export default App;
