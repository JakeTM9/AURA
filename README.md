# AURA (Analyzing User Reviews for Better Design of Mobile Apps)

  

This project is the senior design final project of
- Henry Bish
- Steven Hagedorn
- Daniel Stoy
- Jakob Wardega

TODO: add more of a description
  

## Requirements

- [Node.js](https://nodejs.org/en/download/) (tested with v16.13.1 on Windows 10)
- [Python 3.8.X](https://www.python.org/downloads/) (any version of 3.8 will do)


## To Install
Clone the repository

    git clone https://github.com/JakeTM9/AURA.git

Navigate to the root directory

    cd AURA

## To Run
In Terminal #1 (from root directory):

    cd server
    python -m venv venv
    ./venv/scripts/activate
    pip install -r requirements.txt
    flask run

Open up a new terminal
In Terminal #2 (from root directory)

    cd client
    npm install
    npm run start

## Files

All front end files can be found in the client directory. The client makes asynchronous requests to the server inside of react components like the [Create page](https://github.com/JakeTM9/AURA/blob/dev/client/src/pages/Create.js) 

All machine learning scripts and scripts that do data manipulation can be found in the server directory. The most important file in the server directory is the [Server File](https://github.com/JakeTM9/AURA/blob/dev/server/server.py)

## TODO:
- Use Selects for multiple graphs/clouds
- Make word cloud work 
- Display whole actual top reviews
- Sentiment Analysis of Review groupings
