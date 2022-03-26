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
                <div className = "textInfo">
                            <h3 className="information"><span className="bigger">{staticData.ReviewCount}</span> reviews processed with an average score of <span className="bigger">{staticData.AvgScore.toFixed(2)}/5</span></h3>
                            <h3 className="information"> </h3>
                                
                            <h3 className="information"> On average, reviews contained <span className="bigger">{staticData.avgWordCount.toFixed(2)}</span> words</h3>
                            
                            <h3> <span className="bigger green">{staticData.PositiveReviewCount}</span> reviews were classified as positive, while <span className="bigger red">{staticData.NegativeReviewCount}</span> were classified as negative</h3>
                            <h5  className="information"> (Using NLTK's sentiment analysis model, vader)</h5>
                            <br></br>
                </div>
                <div className = "row">
                    
                    <div className = "column" >
                        
                    </div>
                    <div className = "column">
                        
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