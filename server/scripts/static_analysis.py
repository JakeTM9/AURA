import json
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import pandas as pd
import numpy as np
import os

# This script will generate data for some static analysis point and return them in a json object
# Included analyses: Total reviews, average review score,average score by version,
# average review length, top reviews by user thumbs ups

# May be returning truncated version of top review


def numReviews(reviews):
    # return length of csv
    return len(reviews)


def avgScore(reviews):
    # get series from reviews for the scores
    scores = reviews.score
    # average using numpy
    averageScore = np.average(scores)
    return averageScore


# TODO calculate average for each version
# def avgScoreByVersion(reviews):


def avgReviewLength(reviews):
    lengths = []
    wordCounts = []

    # allReviews is a list of each entry in the "content" column
    allReviews = reviews.content.to_list()

    # loop through each review
    for review in allReviews:
        # append current review length in characters to list
        lengths.append(len(review))
        # append current review length in words to array
        wordCounts.append(len(review.split()))
    # find average value of each list using numpy
    avgLength = np.average(lengths)
    avgWordCount = np.average(wordCounts)
    return avgLength, avgWordCount


def getTopReview(reviews):
    # find row with max thumbsUpCount, access content column in that row, convert to a string for printing
    pd.set_option("display.max_colwidth", 10000) ## fix for truncated review
    review = reviews[reviews.thumbsUpCount == reviews.thumbsUpCount.max()].content.to_string(index=False)
    return review


# Return JSON object
def main():
    # read csv in using pandas so the dataframe may be passed around
    uploads_dir = os.path.join(os.getcwd(), 'review_data')
    finalPath = os.path.join(uploads_dir, 'reviews' + '.csv')
    reviews = pd.read_csv(finalPath)

    posPath = os.path.join(uploads_dir, 'reviews_positive' + '.csv')
    posReviews = pd.read_csv(posPath)

    negPath = os.path.join(uploads_dir, 'reviews_negative' + '.csv')
    negReviews = pd.read_csv(negPath)

    reviewCount = numReviews(reviews)
    posReviewCount = numReviews(posReviews)
    negReviewCount = numReviews(negReviews)

    avgReviewScore = avgScore(reviews)
    topReview = getTopReview(reviews)
    avgLength, avgWordCount = avgReviewLength(reviews)

    # print(f"Number of reviews: {reviewCount}")
    # print(f"Average review score: {avgReviewScore}")
    # print(f"Top review: {topReview}")
    # print(f"Average review length in characters: {avgLength}")
    # print(f"Average review length in words: {avgWordCount}")
    # return numReviews()
    staticAnalysisData = {
        "ReviewCount": reviewCount,
        "AvgScore": avgReviewScore,
        "avgLengthChar": avgLength,
        "avgWordCount": avgWordCount,
        "topReview": topReview,
        "PositiveReviewCount" : posReviewCount,
        "NegativeReviewCount" : negReviewCount
    }
    # print(json.dumps(staticAnalysisData))
    return json.dumps(staticAnalysisData)


if __name__ == "__main__":
    main()
