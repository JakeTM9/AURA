# Code from topic modelling homework
# TODO:
import os
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from sklearn.feature_extraction.text import TfidfVectorizer
from spacy.lang.en.stop_words import STOP_WORDS as stopwords
from sklearn.decomposition import NMF
from wordcloud import WordCloud


# Add display topics
def display_topics(model, features, no_top_words=50):
    for topic, word_vector in enumerate(model.components_):
        total = word_vector.sum()
        largest = word_vector.argsort()[::-1]
        print("\nTopic %02d" % topic)
        if no_top_words > len(features):
            no_top_words = len(features)
        for i in range(0, no_top_words):
            print(" %s (%2.2f)" % (features[largest[i]], word_vector[largest[i]]*100.0/total))

def toArray_topics(model, features, no_top_words=50):
    arr = [[] for topic, word_vector in enumerate(model.components_)]
    index = 0
    for topic, word_vector in enumerate(model.components_):
        total = word_vector.sum()
        largest = word_vector.argsort()[::-1]
        arr_item = []
        if no_top_words > len(features):
            no_top_words = len(features)
        for i in range(0, no_top_words):
            arr_item.append(features[largest[i]])
            arr_item.append(word_vector[largest[i]]*100.0/total)
        arr[index] = arr_item
        index = index + 1
    return arr


def wordcloud_topics(model, features, posOrNeg, no_top_words=50):
    for topic, words in enumerate(model.components_):
        size = {}
        largest = words.argsort()[::-1] # invert sort order
        if no_top_words > len(features):
            no_top_words = len(features)
        
        for i in range(0, no_top_words):
            size[features[largest[i]]] = abs(words[largest[i]])
        wc = WordCloud(background_color="white", max_words=100, width=960, height=540)
        wc.generate_from_frequencies(size)
        filename = "img/wordcloud" + posOrNeg + "_{}.png".format(topic)
        #filename = "../img/wordcloud" + posOrNeg + "_{}.png".format(topic)
        wc.to_file(filename)

def run_topic_model_positive():
    ##This is some nonsense that we can make better later
    uploads_dir = os.path.join(os.getcwd(), 'review_data')
    #uploads_dir = os.path.join(os.getcwd(), '../review_data')
    finalPath = os.path.join(uploads_dir, 'reviews_positive' + '.csv')
    df = pd.read_csv(finalPath)

    #print(df.head())

    tfidf_text_vectorizer = TfidfVectorizer(stop_words=stopwords, min_df=5, max_df=0.7)
    tfidf_text_vectors = tfidf_text_vectorizer.fit_transform(df['content'])
    #print(tfidf_text_vectors.shape)

    nmf_model = NMF(n_components=6)
    nmf_model.fit_transform(tfidf_text_vectors)

    items = toArray_topics(nmf_model, tfidf_text_vectorizer.get_feature_names())
    wordcloud_topics(nmf_model, tfidf_text_vectorizer.get_feature_names(), "positive")
    return items

def run_topic_model_negative():
    ##This is some nonsense that we can make better later
    uploads_dir = os.path.join(os.getcwd(), 'review_data')
    
    #uploads_dir = os.path.join(os.getcwd(), '../review_data')
    finalPath = os.path.join(uploads_dir, 'reviews_negative' + '.csv')
    df = pd.read_csv(finalPath)

    #print(df.head())

    tfidf_text_vectorizer = TfidfVectorizer(stop_words=stopwords, min_df=5, max_df=0.7)
    tfidf_text_vectors = tfidf_text_vectorizer.fit_transform(df['content'])
    #print(tfidf_text_vectors.shape)

    nmf_model = NMF(n_components=6)
    nmf_model.fit_transform(tfidf_text_vectors)

    items = toArray_topics(nmf_model, tfidf_text_vectorizer.get_feature_names())
    wordcloud_topics(nmf_model, tfidf_text_vectorizer.get_feature_names(), "negative")
    return items

toPrint = run_topic_model_positive()
toPrint = run_topic_model_negative()
#print(toPrint)