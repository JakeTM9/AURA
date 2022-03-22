import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Home from "./Home";
import Create from "./Create";
import TopicChart from "../charts/TopicChart";
import * as d3 from 'd3';
import {BrowserRouter as Router,useNavigate} from "react-router-dom";
  
const Analysis = ({reviewData, topicModelDataPositive, topicModelDataNegative, staticData}) => {
    useEffect(() => {
        if(staticData !== ""){
            console.log(staticData); //ToDO
        }
    }, [staticData]);

    const [selectValuePos, setSelectValuePos] = useState(0);
    const [selectValueNeg, setSelectValueNeg] = useState(0);
    
    const Navigate = useNavigate();
    const goToSave = event => Navigate('/save', {replace:true});
    const saveAnalysis = (event) => {
        event.preventDefault();
        goToSave();
    }

    function handleChangePos(e) {
        e.preventDefault();
        console.log(e.target.value);
        setSelectValuePos(e.target.value);
    }
    function handleChangeNeg(e) {
        e.preventDefault();
        console.log(e.target.value);
        setSelectValueNeg(e.target.value);
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
                <div className = "row">
                    <h1>General Information</h1>
                    <div className = "column" >
                            <h3>Review Count:</h3>
                        <h3 className="information">{staticData.ReviewCount}</h3>
                            <h3>Average Score: </h3>
                        <h3 className="information">{staticData.AvgScore}</h3>
                            <h3>Average Word Count: </h3>
                        <h3 className="information">{staticData.avgWordCount}</h3>
                            <h3>Average Character Count: </h3>
                        <h3 className="information">{staticData.avgLengthChar}</h3>
                            <h3>Most Liked Review: </h3>
                        <h3 className="information">{staticData.topReview}</h3>
                    </div>
                    <div className = "column">
                        <h2>Top 50 Words: </h2>
                    </div>
                    
                </div>

                <div className = "row">
                    <h1>Topic Analysis</h1>
                </div>
                <div className = "row">
                    <div className="column">
                        <h3>Please Select a Topic:</h3>
                        <select value={selectValuePos} id="topicPos" onChange = {(e) => handleChangePos(e)}>
                            <option value= "0">{topicModelDataPositive[0][0]}</option>
                            <option value= "1">{topicModelDataPositive[1][0]}</option>
                            <option value= "2">{topicModelDataPositive[2][0]}</option>
                            <option value= "3">{topicModelDataPositive[3][0]}</option>
                            <option value= "4">{topicModelDataPositive[4][0]}</option>
                        </select>
                        <TopicChart selectValue={+selectValuePos} topicModelData={topicModelDataPositive} id={"0"}> </TopicChart>
                        <br></br>
                        
                    </div>
                    
                    <div className="column">
                        <h3>Please Select a Topic:</h3>
                        <select value={selectValueNeg} id="topicNeg" onChange = {(e) => handleChangeNeg(e)}>
                            <option value= "0">{topicModelDataNegative[0][0]}</option>
                            <option value= "1">{topicModelDataNegative[1][0]}</option>
                            <option value= "2">{topicModelDataNegative[2][0]}</option>
                            <option value= "3">{topicModelDataNegative[3][0]}</option>
                            <option value= "4">{topicModelDataNegative[4][0]}</option>
                        </select>
                        <TopicChart selectValue={+selectValueNeg} topicModelData={topicModelDataNegative} id={"1"}> </TopicChart>
                        <br></br>
                        
                    </div>
                </div>
                <br></br>
                
            </div>
        </div>
    );
};
  
export default Analysis;