import nltk
import os
import pandas as pd

nltk.downloader.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()
result = sia.polarity_scores("Wow, NLTK is really powerful!")
if result["pos"] > result["neg"]:
    print("yay")

#uploads_dir = os.path.join(os.getcwd(), 'review_data')
uploads_dir = os.path.join(os.getcwd(), '../review_data') ##for non-webapp use
finalPath = os.path.join(uploads_dir, 'reviews' + '.csv')
reviews = pd.read_csv(finalPath)

for i in reviews.itertuples():
    result = sia.polarity_scores(i.content)
    if result["pos"] > result["neg"]:
        print(i.content)
    