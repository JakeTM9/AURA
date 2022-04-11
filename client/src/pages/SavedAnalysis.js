import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Home from "./Home";
import Analysis from "./Analysis";
import Create from "./Create";
import Image from "../components/Image"
import TopicChart from "../charts/TopicChart";
import * as d3 from 'd3';
import axios from 'axios';
import {BrowserRouter as Router,useNavigate} from "react-router-dom";
  
const SavedAnalysis = ({savedData}) => {
    const [reviewData, setReviewData] = useState('');
    const [topicModelDataPositive, setTopicModelDataPositive] = useState('');
    const [topicModelDataNegative, setTopicModelDataNegative] = useState('');
    const [staticData, setStaticData] = useState('');
    const [saveData, setSaveData] = useState('');
    const [selectValuePos, setSelectValuePos] = useState(0);
    const [selectValuePosImage, setSelectValuePosImage] = useState(0);
    const [selectValueNeg, setSelectValueNeg] = useState(0);
    const [selectValueNegImage, setSelectValueNegImage] = useState(0);
    const [isDoneRerun, setIsDoneRerun] = useState(false);
    const Navigate = useNavigate();
    const goToSave = event => Navigate('/save', {replace:true});
    const [appIcon, setAppIcon] = useState("");
    const saveAnalysis = (event) => {
        event.preventDefault();
        goToSave();
    }

    useEffect(() => {
        axios.get("/api/getAppIcon/" + savedData.id)
        .then(res => setAppIcon(res.data))
    }, []);

    useEffect(() => {
        const data = {
            google_play_id: savedData.id,
            number_reviews: savedData.numReviews,
            file_name: ''
        }
        getReviewData(data);
    }, [savedData]);

    async function getReviewData(data) {
        let res = await axios.get("/api/getReviewData", {
            params: data
        })
        .then((res) => setReviewData(res.data))
        .catch((error) => {
            console.log(error);
        });
    }

    async function getTopicModelDataPositive() {
        let res = await axios.get("/api/getTopicModelDataPositive")
        .then((res) => setTopicModelDataPositive(res.data))
        .catch((error) => {
            console.log(error);
        });
    }

    async function getTopicModelDataNegative() {
        let res = await axios.get("/api/getTopicModelDataNegative")
        .then((res) => setTopicModelDataNegative(res.data))
        .catch((error) => {
            console.log(error);
        });
    }

    async function getStaticData() {
        let res = await axios.get("/api/getStaticData")
        .then((res) => setStaticData(res.data))
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if(reviewData !== ""){
            
            getTopicModelDataPositive();
        }
      }, [reviewData]);
    
    useEffect(() => {
        if(topicModelDataPositive !== ""){
            
            getTopicModelDataNegative();  
        }
    }, [topicModelDataPositive]);

    useEffect(() => {
        if(topicModelDataNegative !== ""){
            
            getStaticData();
        }
    }, [topicModelDataNegative]);

    useEffect(() => {
        if(staticData !== ""){
            console.log(reviewData);
            console.log(staticData);
            staticData.AvgScore = staticData.AvgScore.toFixed(1)
            staticData.avgWordCount = staticData.avgWordCount.toFixed(0)
            //here
            setIsDoneRerun(true);
        }
    }, [staticData]);

    function handleChangePos(e) {
        e.preventDefault();
        console.log(e.target.value);
        setSelectValuePos(e.target.value);
    }
    function handleChangePosImage(e) {
        e.preventDefault();
        console.log(e.target.value);
        setSelectValuePosImage(e.target.value);
    }
    function handleChangeNeg(e) {
        e.preventDefault();
        console.log(e.target.value);
        setSelectValueNeg(e.target.value);
    }
    function handleChangeNegImage(e) {
        e.preventDefault();
        console.log(e.target.value);
        setSelectValueNegImage(e.target.value);
    }
    
    return (
        <div>
            <div id="container">
                <header>
                    <h1><img className='identifier' src={appIcon}/>AURA Analysis<img className='identifier' src={appIcon}/></h1>
                    <div className="float-left">
                            <a href="/home">
                            <button className="bnCA ">Back to Home</button>
                            </a>
                    </div>
                    {/* 
                    <div className="float-right">
                            <a href="/save">
                            <button className="bnCA " onClick ={saveAnalysis}>Save Analysis</button>
                            </a>
                    </div>
                    */}
                </header>
                <br></br>
                <div className = {isDoneRerun? '' : 'hide'}>
                    <div className = "textInfo">
                                <h3 className="information"><span className="bigger">{staticData.ReviewCount}</span> reviews processed with an average score of <span className="bigger">{staticData.AvgScore}/5</span></h3>
                                <h3 className="information"> </h3>
                                    
                                <h3 className="information"> On average, reviews contained <span className="bigger">{staticData.avgWordCount}</span> words</h3>
                                
                                <h3> <span className="bigger green">{staticData.PositiveReviewCount}</span> reviews were classified as positive, while <span className="bigger red">{staticData.NegativeReviewCount}</span> were classified as negative</h3>
                                <h5  className="information"> (Using NLTK's sentiment analysis model, vader)</h5>
                                <br></br>
                    </div>
                    
                    <br></br>
                    {/*Wordclouds*/}
                    <div className = "row">
                        <div className="column">
                            <Image name={"wordcloudpositive_" + selectValuePosImage + ".png"}></Image>
                            <br></br>
                            <select value={selectValuePosImage} id="topicPosImage" onChange = {(e) => handleChangePosImage(e)}>
                                    <option value= "0">Positive Topic #1</option>
                                    <option value= "1">Positive Topic #2</option>
                                    <option value= "2">Positive Topic #3</option>
                                    <option value= "3">Positive Topic #4</option>
                                    <option value= "4">Positive Topic #5</option>
                                    <option value= "5">Positive Topic #6</option>
                            </select>
                        </div>
                        <div className="column">
                            <Image name={"wordcloudnegative_" + selectValueNegImage + ".png"}></Image>
                            <br></br>
                            <select value={selectValueNegImage} id="topicPosImage" onChange = {(e) => handleChangeNegImage(e)}>
                                    <option value= "0">Negative Topic #1</option>
                                    <option value= "1">Negative Topic #2</option>
                                    <option value= "2">Negative Topic #3</option>
                                    <option value= "3">Negative Topic #4</option>
                                    <option value= "4">Negative Topic #5</option>
                                    <option value= "5">Negative Topic #6</option>
                            </select>
                        </div>
                    </div>

                    {/*<div className = "row hide">
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
                    </div> */}
                    <br></br>
                </div>
                <div className = {!isDoneRerun ? '' : 'hide'}>
                    Please wait a moment for your analysis to re-run.....
                </div>
            </div>
        </div>
    );
};
  
export default SavedAnalysis;