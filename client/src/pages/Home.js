import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Create from "./Create";
import Analysis from "./Analysis";
import Card from "../components/Card"
import axios from 'axios';

const Home = ({updateInUseSaveData}) => {
    const [showWarning, setShowWarning] = useState(true);
    const [cards, setCards] = useState([])
    const [inUseSaveData, setInUseSaveData] = useState('');

    async function getAnalysisCards() {
        let res = await axios.get("/api/getAnalysisCards", {
        })
        .then((res) => setCards(res.data))
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getAnalysisCards();
    }, []);

    useEffect(() => {
        if(cards.length !== 0){
            setShowWarning(false)
        }
    }, [cards]);

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
                <div class={showWarning ? "" : "hide"}>
                    <br></br>
                    <h3>Uh oh!... looks like you have no saved analysis. Why don't you create one?</h3>
                </div>
                <div class="thumbnails">
                    <div class="group">
                        {cards.map((card) => (
                        <Card key = {card.title} card={card} updateInUseSaveData={updateInUseSaveData}/>
                        ))}
                    </div>
		        </div>
            </div>
        </div>
        
    );
};
  
export default Home;