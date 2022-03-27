import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Home from "./Home";
import Create from "./Create";
import Image from "../components/Image"
import TopicChart from "../charts/TopicChart";
import * as d3 from 'd3';
import {BrowserRouter as Router,useNavigate} from "react-router-dom";
  
const SavedAnalysis = ({savedData}) => {
    useEffect(() => {
        console.log(savedData);
    }, [savedData]);
    
    return (
        <div>yo</div>
    );
};
  
export default SavedAnalysis;