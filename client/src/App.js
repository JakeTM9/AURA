import React, { useState, useEffect } from 'react';
import './css/style.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Analysis from "./pages/Analysis";
import Save from "./pages/Save";
import SavedAnalysis from './pages/SavedAnalysis';

function App() {
  const [analysisReviewData, setAnalysisReviewData] = useState('');
  const [analysisTopicModelDataPositive, setAnalysisTopicModelDataPositive] = useState('');
  const [analysisTopicModelDataNegative, setAnalysisTopicModelDataNegative] = useState('');
  const [analysisStaticData, setAnalysisStaticData] = useState('');
  const [analysisSaveData, setAnalysisSaveData] = useState('');
  const [inUseSaveData, setInUseSaveData] = useState(''); 
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Route path="/home" element={<Home updateInUseSaveData = {setInUseSaveData} />} />
            
          {/* This route is for about component 
          with exact path "/create", in component 
          props we passes the imported component*/}
          <Route path="/create" element={<Create updateReviewData = {setAnalysisReviewData} updateTopicModelDataPositive = {setAnalysisTopicModelDataPositive} updateTopicModelDataNegative = {setAnalysisTopicModelDataNegative} updateStaticData = {setAnalysisStaticData} updateSaveData = {setAnalysisSaveData}/>} />
            
          {/* This route is for contactus component
          with exact path "/analysis", in 
          component props we passes the imported component*/}
          <Route path="/analysis" element={<Analysis reviewData={analysisReviewData} topicModelDataPositive = {analysisTopicModelDataPositive} topicModelDataNegative = {analysisTopicModelDataNegative} staticData= {analysisStaticData} saveData={analysisSaveData}/>} />

          <Route path="/savedAnalysis" element={<SavedAnalysis savedData={inUseSaveData}/>} />
          
          <Route path="/save" element={<Save reviewData={analysisReviewData} topicModelData={analysisTopicModelDataPositive} saveData={analysisSaveData}/>} />
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Route path="*" element={<Navigate to="/home" />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;