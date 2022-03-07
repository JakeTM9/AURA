import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Home from "./Home";
import Create from "./Create";
import TopicChart from "../charts/TopicChart";
import * as d3 from 'd3';
import {BrowserRouter as Router,useNavigate} from "react-router-dom";
  
const Analysis = ({reviewData, topicModelData}) => {
    const [topicModelDataDisplay, setTopicModelDataDisplay] = useState('');
    useEffect(() => {
        if(topicModelData !== ""){
            setTopicModelDataDisplay(topicModelData)
        }
      }, [topicModelData]);

    const Navigate = useNavigate();
    const goToSave = event => Navigate('/save', {replace:true});
    const saveAnalysis = (event) => {
        event.preventDefault();
        goToSave();
    }
    
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
                            <a href="/save">
                            <button className="bnCA " onClick ={saveAnalysis}>Save Analysis</button>
                            </a>
                        </div>
                </header>
                <br></br>
                
                <div class = "row">
                    <div class="column">
                        <TopicChart
                        words={topicModelData[0].filter(function(el){
                            if(isNaN(el)){
                                return el;
                            }})}
                        counts={topicModelData[0].filter(function(el){
                            if(!isNaN(el)){
                                return el.toFixed(2);
                            }})}
                        id={"0"}
                            >
                        </TopicChart>
                        <br></br>
                        <TopicChart
                            words={topicModelData[1].filter(function(el){
                                if(isNaN(el)){
                                    return el;
                                }})}
                            counts={topicModelData[1].filter(function(el){
                                if(!isNaN(el)){
                                    return el.toFixed(2);
                                }})}
                            id={"1"}
                                >
                        </TopicChart>
                    </div>
                    <div class="column">
                        <TopicChart
                            words={topicModelData[2].filter(function(el){
                                if(isNaN(el)){
                                    return el;
                                }})}
                            counts={topicModelData[2].filter(function(el){
                                if(!isNaN(el)){
                                    return el.toFixed(2);
                                }})}
                            id={"2"}
                                >
                        </TopicChart>
                        <br></br>
                        <TopicChart
                            words={topicModelData[3].filter(function(el){
                                if(isNaN(el)){
                                    return el;
                                }})}
                            counts={topicModelData[3].filter(function(el){
                                if(!isNaN(el)){
                                    return el.toFixed(2);
                                }})}
                            id={"3"}
                                >
                        </TopicChart>
                    </div>
                </div>
                <br></br>
                <TopicChart
                    words={topicModelData[4].filter(function(el){
                        if(isNaN(el)){
                            return el;
                        }})}
                    counts={topicModelData[4].filter(function(el){
                        if(!isNaN(el)){
                            return el.toFixed(2);
                        }})}
                    id={"4"}
                        >
                </TopicChart>
            </div>
        </div>
    );
};
  
export default Analysis;