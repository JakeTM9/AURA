import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Home from "./Home";
import Create from "./Create";
  
const Analysis = ({reviewData}) => {
    return (
        <div>
            <div id="container">
                <header>
                    <h1>AURA Analysis</h1>
                    <div className="float-left">
                            <a href="/home">
                            <button className="bnCA ">Back to Home</button>
                            </a>
                    </div>
                    <div className="float-right">
                            <a href="/analysis">
                            <button className="bnCA ">Save Analysis</button>
                            </a>
                        </div>
                </header>
            </div>
        </div>
    );
};
  
export default Analysis;