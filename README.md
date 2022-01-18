# Big Changes Coming

in term 1
cd client
npm install
npm run start

in term 2
cd server
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
flask run


## Python Flask App: App Review Analysis + Positive/Negative Sentiment Analysis

This is a minimal Flask app that has the user upload a csv of user reviews with columns: 'Rating, Review, Author, and Date'. The csv data is then displayed as a table. More functionality to come soon. The other thing the user can do is use the Sentiment Analysis functionalityt from the home page. To do this input a user review and hit the submit button. The user is then redirected to a page that displays the review as well as the prediction.

## Instructions

The app is easy to run.
Requirements: Python 3 and pip 
1. Download the code
2. Navigate to the AURA-main directory in CMD (If there are 2, use the deeper one)
3. run "py -3 -m venv .venv"
4. run ".venv\scripts\activate"
5. run "pip install -r requirements.txt" (may take about 5 minutes)
6. run "flask run"
7. Navigate to the address output in the console (Example: http://localhost:5000/)

## More on Sentiment Analysis:
The app has a saved tensorflow model to make the prediction. The model uses [Twitter Airline Review Data](https://www.kaggle.com/crowdflower/twitter-airline-sentiment) to train.

I followed [this guide](https://techvidvan.com/tutorials/python-sentiment-analysis/) to create the sentiment analysis model and [this guide](https://www.tensorflow.org/tutorials/keras/save_and_load) to save the model

If you want to train the model using more epochs or a different way. Trainer.py is included and can be run. Be sure to delete "sentiment_analysis_model.h5" from the app directory in order to save the new model.

Datasets used in training the model for clustering were obtained from the following sources.
- google_play_reviews.csv: https://www.kaggle.com/prakharrathi25/google-play-store-reviews
- apple_store_reviews.csv: https://www.kaggle.com/yamqwe/app-store-reviews. This dataset originates from CrwalFeeds.