import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Home from "./Home";
import Create from "./Create";
import * as d3 from 'd3';
  
const Analysis = ({reviewData, topicModelData}) => {
    const [topicModelDataDisplay, setTopicModelDataDisplay] = useState('');
    useEffect(() => {
        if(topicModelData !== ""){
            console.log(topicModelData);
            setTopicModelDataDisplay(topicModelData)
        }
      }, [topicModelData]);
    
    useEffect(() => {
        let valuesTopicZero = topicModelData[0].filter(function(el){
            if(!isNaN(el)){
                return el;
            }})
        let wordsTopicZero = topicModelData[0].filter(function(el){
            if(isNaN(el)){
                return el;
            }})
        let valuesTopicOne = topicModelData[1].filter(function(el){
            if(!isNaN(el)){
                return el;
            }})
        let wordsTopicOne = topicModelData[1].filter(function(el){
            if(isNaN(el)){
                return el;
            }})
        let dataSetZero = [
            {word: wordsTopicZero[0], count: valuesTopicZero[0].toFixed(2)},
            {word: wordsTopicZero[1], count: valuesTopicZero[1].toFixed(2)},
            {word: wordsTopicZero[2], count: valuesTopicZero[2].toFixed(2)},
            {word: wordsTopicZero[3], count: valuesTopicZero[3].toFixed(2)},
            {word: wordsTopicZero[4], count: valuesTopicZero[4].toFixed(2)},
        ]

        let dataSetOne = [
            {word: wordsTopicOne[0], count: valuesTopicOne[0].toFixed(2)},
            {word: wordsTopicOne[1], count: valuesTopicOne[1].toFixed(2)},
            {word: wordsTopicOne[2], count: valuesTopicOne[2].toFixed(2)},
            {word: wordsTopicOne[3], count: valuesTopicOne[3].toFixed(2)},
            {word: wordsTopicOne[4], count: valuesTopicOne[4].toFixed(2)},
        ]
          // Generate a p tag for each element in the dataSet with the text: Subject: Count 
        d3.select('#pgraphs0').selectAll('h3').data(dataSetZero).enter().append('h3').style('display','inline').text(dt => dt.word + ":" + dt.count+ "  ")
        d3.select('#pgraphs1').selectAll('h3').data(dataSetOne).enter().append('h3').style('display','inline').text(dt => dt.word + ":" + dt.count+ "  ")

        // Bar Chart:
        const getMax = () => { // Calculate the maximum value in the DataSet
            let max = 0
            dataSetZero.forEach((dt) => {
                if(dt.count > max) {max = dt.count}
            })
            return max
        }
    
        
        // Create each of the bars and then set them all to have the same height(Which is the max value)
        d3.select('#BarChart0').selectAll('div').data(dataSetZero) 
        .enter().append('div').classed('bar', true).style('height', `${getMax()}px`)

        d3.select('#BarChart1').selectAll('div').data(dataSetOne) 
        .enter().append('div').classed('bar', true).style('height', `${getMax()}px`)
    
        //Transition the bars into having a height based on their corresponding count value
        d3.select('#BarChart0').selectAll('.bar')
        .transition().duration(1000).style('height', bar => `${bar.count}px`)
            .style('width', '30px').style('margin-right', '30px').delay(300) // Fix their width and margin

        d3.select('#BarChart1').selectAll('.bar')
        .transition().duration(1000).style('height', bar => `${bar.count}px`)
            .style('width', '30px').style('margin-right', '30px').delay(300)
    }, [])
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
                <section>
                    <div id="BarChart0"></div>
                    <div id="pgraphs0"></div>
                    <div id="BarChart1"></div>
                    <div id="pgraphs1"></div>
                </section>
            </div>
        </div>
    );
};
  
export default Analysis;