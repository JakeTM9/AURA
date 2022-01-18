import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Home from "./Home";
import Create from "./Create";
  
const Analysis = () => {
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
                    <h1>AURA</h1>
                    <h2>Analysis</h2>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <div className="group">
                        <p>The current time is {currentTime}.</p>
                    </div>
                </header>
            </div>
        </div>
    );
};
  
export default Analysis;