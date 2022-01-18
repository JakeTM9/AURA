import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Home from "./Home";
import Analysis from "./Analysis";
  
const Create = () => {
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
      fetch('/time').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
      });
    }, []);
    return (
        <div>
            <div id="container">
                <header>
                    <h1>AURA Create</h1>
                </header>
                <section>
                    <br></br>
                    <h3>Uh oh!... looks like you have no saved analysis. Why don't you create one?</h3>
                </section>
            </div>
        </div>
    );
};
  
export default Create;