import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Create from "./Create";
import Analysis from "./Analysis";
import axios from 'axios';
import {BrowserRouter as Router,useNavigate} from "react-router-dom";

const Save = ({reviewData, topicModelData}) => {
    const [title, set_title] = useState('');
    const [saveDisabled, setSaveDisabled] = useState(false);
    const change_title = (event) => {
        set_title(event.target.value);
    };
    const transferValue = (event) => {
        event.preventDefault();
        const data = {
            title,
            topicModelData
        }
        setSaveDisabled(true);
        saveAnalysisData(data);
        clearState();
    };

    const clearState = () => {
        set_title('');
    };

    const Navigate = useNavigate();
    const goToHome = event => Navigate('/home', {replace:true});
    const goToAnalysis = event => Navigate('/analysis', {replace:true});

    async function saveAnalysisData(data) {
        let res = await axios.get("/api/saveAnalysisData", {
            params: data
        })
        .then((res) => goToHome())
        .catch((error) => {
            console.log(error);
        });
    }
    
    return (
        <div>
            <div id="container">
                <header>
                    <div>
                        <h1>AURA Save</h1>
                        <div className="float-left">
                            <button className="bnCA " onClick={goToAnalysis}>Back to Analysis</button>
                        </div>
                    </div>
                </header>
                <section>
                    <br></br>
                    <h2>Title:</h2>
                    <input type="text" value={title} onChange={change_title} id="title" name="title"/>
                    <div>
                    <br></br>
                        <button className={`bnCA ${saveDisabled ? `disabled` : ``}`} onClick={transferValue}>Save Analysis</button>
                    </div>
                    <br></br>
                    <h3 className={`${saveDisabled ? `` : `hidden`}`}>Please wait a moment while we save your Analysis...</h3>
                    
                </section>
            </div>
        </div>
        
    );
};
  
export default Save;