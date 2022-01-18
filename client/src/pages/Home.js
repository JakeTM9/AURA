import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Create from "./Create";
import Analysis from "./Analysis";

const Home = () => {
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
                    <div>
                        <h1>AURA Home</h1>
                        <div className="float-right">
                            <a href="/create">
                            <button className="bnCA ">Create Analysis</button>
                            </a>
                        </div>
                    </div>
                </header>
                <section>
                    <br></br>
                    <h3>Uh oh!... looks like you have no saved analysis. Why don't you create one?</h3>
                </section>
            </div>
        </div>
    );
};
  
export default Home;