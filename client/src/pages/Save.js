import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Create from "./Create";
import Analysis from "./Analysis";

const Save = () => {
    return (
        <div>
            <div id="container">
                <header>
                    <div>
                        <h1>AURA Save</h1>
                        <div className="float-right">
                            <a href="/create">
                            <button className="bnCA ">Create Analysis</button>
                            </a>
                        </div>
                    </div>
                </header>
                <section>
                    <br></br>
                    <h3>Save h3h3</h3>
                </section>
            </div>
        </div>
        
    );
};
  
export default Save;