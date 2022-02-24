import React, { useState, useEffect } from 'react';
import '../css/style.css';
import Create from "./Create";
import Analysis from "./Analysis";

const Home = () => {
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
                <section>
                    <br></br>
                    <h3>Uh oh!... looks like you have no saved analysis. Why don't you create one?</h3>
                </section>
                <div class="thumbnails">
                    <div class="group">
                        <a href="#" title="7111">
                            <img src="images/all.jpg" alt="7111-m" width="290" height="242" />
                            <span>Analysis Title 1</span>
                        </a>
                        <a href="#" title="7112">
                            <img src="images/all.jpg" alt="7111-m" width="290" height="242" />
                            <span>Analysis Title 2</span>
                        </a>
                        <a href="#" title="7118">
                            <img src="images/all.jpg" alt="7111-m" width="290" height="242" />
                            <span>Analysis Title 3</span>
                        </a>
                        <a href="#" title="7124">
                            <img src="images/all.jpg" alt="7111-m" width="290" height="242" />
                            <span>Analysis Title 4</span>
                        </a>
                    </div>
		        </div>
            </div>
        </div>
        
    );
};
  
export default Home;