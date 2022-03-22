import React, { useState, useEffect, useRef } from 'react';
import '../css/style.css';
import Home from "./Home";
import Analysis from "./Analysis";
import axios from 'axios';
import {BrowserRouter as Router,useNavigate} from "react-router-dom";
  
const Create = ({updateReviewData, updateTopicModelDataPositive, updateTopicModelDataNegative, updateStaticData}) => {
    const [google_play_id, set_google_play_id] = useState('');
    const [number_reviews, set_number_reviews] = useState('');
    const [file_name, set_file_name] = useState('');
    const [reviewData, setReviewData] = useState('');
    const [topicModelDataPositive, setTopicModelDataPositive] = useState('');
    const [topicModelDataNegative, setTopicModelDataNegative] = useState('');
    const [staticData, setStaticData] = useState('');
    const [createDisabled, setCreateDisabled] = useState(false);

    const change_google_play_id = (event) => {
        set_google_play_id(event.target.value);
      };
      
    const change_number_reviews = (event) => {
        set_number_reviews(event.target.value);
    };
    const change_file_name = (event) => {
        set_file_name(event.target.value);
    };
    

    const transferValue = (event) => {
        event.preventDefault();
        const data = {
           google_play_id,
           number_reviews,
           file_name
        };
        setCreateDisabled(true);
        getReviewData(data);
        clearState();
    };

    const clearState = () => {
        set_google_play_id('');
        set_number_reviews('');
        set_file_name('');
    };

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
    
    const Navigate = useNavigate();
    const goToAnalysis = event => Navigate('/analysis', {replace:true});

    useEffect(() => {
        if(reviewData !== ""){
            updateReviewData(reviewData);
            getTopicModelDataPositive();
           
        }
      }, [reviewData]);
    
    useEffect(() => {
        if(topicModelDataPositive !== ""){
            updateTopicModelDataPositive(topicModelDataPositive);
            getTopicModelDataNegative();
            
        }
    }, [topicModelDataPositive]);

    useEffect(() => {
        if(topicModelDataNegative !== ""){
            updateTopicModelDataNegative(topicModelDataNegative);
            getStaticData();
        }
    }, [topicModelDataNegative]);

    useEffect(() => {
        if(staticData !== ""){
            updateStaticData(staticData);
            goToAnalysis();
        }
    }, [staticData]);

    return (
        <div>
            <div id="container">
                <header>
                    <h1>AURA Create</h1>
                    <div className="float-left">
                            <a href="/home">
                            <button className="bnCA ">Back to Home</button>
                            </a>
                    </div>
                </header>
                <section>
                    <br></br>
                    <h2>Google Play ID:</h2>
                    <input type="text" value={google_play_id} onChange={change_google_play_id} id="google_play_id" name="google_play_id"/>
                    <h2>Number of Reviews to Scrape:</h2>
                    <input type="text" value={number_reviews} onChange={change_number_reviews} id="number_reviews" name="number_reviews"/>
                    <h2 className="hidden">Name (for file):</h2>
                    <input type="text" className="hidden" value={file_name} onChange={change_file_name} id="file_name" name="file_name"/>
                    <div>
                    <br></br>
                        <button className={`bnCA ${createDisabled ? `disabled` : ``}`} onClick={transferValue}>Create Analysis</button>
                    </div>
                    <br></br>
                    <h3 className={`${createDisabled ? `` : `hidden`}`}>Please wait a moment while we generate your Analysis...</h3>
                    
                </section>
            </div>
        </div>
    );
};
  
export default Create;