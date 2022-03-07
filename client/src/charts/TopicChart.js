import React, { useState, useEffect } from 'react';
import '../css/style.css';
import * as d3 from 'd3';

const TopicChart = (topicData) => {
    useEffect(() => {
        //let vis = document.getElementById('BarChart');
        let containerWidth = 500;
        let containerHeight = 250;
        let margin = {top: 25, right: 30, bottom: 60, left: 100};
        // setSvgWidth(containerWidth - margin.left - margin.right);
        // setSvgHeight(containerHeight - margin.top - margin.bottom);

        let width = containerWidth - margin.left - margin.right;
        let height = containerHeight - margin.top - margin.bottom;

        let maxRelevance = topicData.counts.shift()
        let xScale = d3.scaleLinear()
            .domain([0,105 - (100 - topicData.counts[0])])
            .range([0, width]);

        let Title = topicData.words.shift();

        document.getElementById("titleElement" + topicData.id).innerText = "Topic: " + Title;
        let Words = topicData.words;
        
        let yScale = d3.scaleBand()
            .domain(Words)
            .range([0, height])
            .paddingInner(0.15);

        let xAxis = d3.axisBottom(xScale)
            .ticks(6)
            .tickSizeOuter(0)
            .tickPadding(10);

        let yAxis = d3.axisLeft(yScale)
            .ticks(6)
            .tickSizeOuter(0)
            .tickPadding(10);

        // Define size of SVG drawing area
        let svg = d3.select(document.getElementById("#Barchart" + topicData.id))
        .attr('width', containerWidth)
        .attr('height', containerHeight);

        // Append group element that will contain our actual chart (see margin convention)
        let chart = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

        // Append empty x-axis group and move it to the bottom of the chart
        let xAxisG = chart.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${height})`);

        // Append y-axis group
        let yAxisG = chart.append('g')
            .attr('class', 'axis y-axis');

        // We need to make sure that the tracking area is on top of other chart elements
        let marks = chart.append('g');
        let trackingArea = chart.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all');

        //x axis label
        chart.append("text")
            .attr("text-anchor", "end")
            .attr("x", width/2 + 150)
            .attr("y", height +50)
            .attr("font-size","20px")
            .text("% Likliness to Appear in Review with Topic");

        chart.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left +20)
            .attr("x", -margin.top -20 )
            .attr("font-size","20px")
            .text("Word");

        let data = {count1: topicData.counts[0],count2: topicData.counts[1], count3: topicData.counts[2], count4: topicData.counts[3]};

        chart.append("rect")
          .data([data])
          .attr('class', 'chart-bar')
          .attr('width', d => xScale(d.count1))
          .attr('height', yScale.bandwidth())
          .attr('y', yScale(Words[0]))
          .attr('x',0);
        
          chart.append("rect")
          .data([data])
          .attr('class', 'chart-bar')
          .attr('width', d => xScale(d.count2))
          .attr('height', yScale.bandwidth())
          .attr('y', yScale(Words[1]))
          .attr('x',0);

          chart.append("rect")
          .data([data])
          .attr('class', 'chart-bar')
          .attr('width', d => xScale(d.count3))
          .attr('height', yScale.bandwidth())
          .attr('y', yScale(Words[2]))
          .attr('x',0);

          chart.append("rect")
          .data([data])
          .attr('class', 'chart-bar')
          .attr('width', d => xScale(d.count4))
          .attr('height', yScale.bandwidth())
          .attr('y', yScale(Words[3]))
          .attr('x',0);

        // Update the axes
        xAxisG.call(xAxis);
        yAxisG.call(yAxis);
    },[])

    return (
        <div>
            <h2 id={"titleElement" + topicData.id}></h2>
            <svg id={"#Barchart" + topicData.id}></svg>
        </div>
        
    );
};
  
export default TopicChart;