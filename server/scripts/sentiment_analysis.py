import nltk
import os
import pandas as pd
pd.set_option("display.max_colwidth", 10000) ## fix for truncated review

nltk.downloader.download('vader_lexicon')
from nltk.sentiment import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()
result = sia.polarity_scores("Wow, NLTK is really powerful!")
if result["pos"] > result["neg"]:
    print("yay")

#uploads_dir = os.path.join(os.getcwd(), 'review_data')
uploads_dir = os.path.join(os.getcwd(), '../review_data') ##for non-webapp use
reviewPath = os.path.join(uploads_dir, 'reviews' + '.csv')
posReviewPath = os.path.join(uploads_dir, 'reviews_positive' + '.csv')
negReviewPath = os.path.join(uploads_dir, 'reviews_negative' + '.csv')
#dataframes
reviews = pd.read_csv(reviewPath)
posReviews = pd.read_csv(posReviewPath)
negReviews = pd.read_csv(negReviewPath)
##kill old contents
posReviews = posReviews[0:0]
negReviews = negReviews[0:0]

for index,row in reviews.iterrows():
    result = sia.polarity_scores(row.content)
    if result["pos"] > result["neg"]:
        posReviews = posReviews.append(row, ignore_index = True)
        posReviews.to_csv(posReviewPath, index=False)
    else:
        negReviews = negReviews.append(row, ignore_index = True)
        negReviews.to_csv(negReviewPath, index=False)
    