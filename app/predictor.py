import pandas as pd
import matplotlib.pyplot as plt
import tensorflow as tf
import os
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM,Dense, Dropout, SpatialDropout1D
from tensorflow.keras.layers import Embedding

from tensorflow import keras

##NEED TO REBUILD TOKENIZOR AND SENTIMENT LABEL
df = pd.read_csv("app/Tweets.csv")
df.head()
df.columns
tweet_df = df[['text','airline_sentiment']]
tweet_df.head(5)
tweet_df = tweet_df[tweet_df['airline_sentiment'] != 'neutral']
tweet_df.head(5)
tweet_df["airline_sentiment"].value_counts()
sentiment_label = tweet_df.airline_sentiment.factorize()

tweet = tweet_df.text.values
tokenizer = Tokenizer(num_words=5000)
tokenizer.fit_on_texts(tweet)

##PREDICTION FUNCTION-----------------------------------------------------
def predict_sentiment(text):
    tw = tokenizer.texts_to_sequences([text])
    tw = pad_sequences(tw,maxlen=200)
    prediction = int(model.predict(tw).round().item())
    return "Prediction: " + sentiment_label[1][prediction]

##LOAD TRAINED MODEL--------------------------------------------------------
model = tf.keras.models.load_model('app/sentiment_analysis_model.h5')

##EXAMPLES--------------------------------------------------------------
#test_sentence1 = "I enjoyed my journey on this flight."
#predict_sentiment(test_sentence1)

#test_sentence2 = "This is the worst flight experience of my life!"
#predict_sentiment(test_sentence2)