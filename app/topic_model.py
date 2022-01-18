# Code from topic modelling homework
# TODO:
import pandas as pd
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from sklearn.feature_extraction.text import TfidfVectorizer
from spacy.lang.en.stop_words import STOP_WORDS as stopwords
from sklearn.decomposition import NMF
from wordcloud import WordCloud


# Add display topics
def display_topics(model, features, no_top_words=5):
    for topic, word_vector in enumerate(model.components_):
        total = word_vector.sum()
        largest = word_vector.argsort()[::-1]
        print("\nTopic %02d" % topic)
        for i in range(0, no_top_words):
            print(" %s (%2.2f)" % (features[largest[i]], word_vector[largest[i]]*100.0/total))


def wordcloud_topics(model, features, no_top_words=40):
    for topic, words in enumerate(model.components_):
        size = {}
        largest = words.argsort()[::-1] # invert sort order
        for i in range(0, no_top_words):
            size[features[largest[i]]] = abs(words[largest[i]])
        wc = WordCloud(background_color="white", max_words=100, width=960, height=540)
        wc.generate_from_frequencies(size)
        plt.imshow(wc, interpolation='bilinear')
        plt.axis("off")
        plt.show()


df = pd.read_csv('google_play_reviews.csv')
print(df.head())

tfidf_text_vectorizer = TfidfVectorizer(stop_words=stopwords, min_df=5, max_df=0.7)
tfidf_text_vectors = tfidf_text_vectorizer.fit_transform(df['content'])
print(tfidf_text_vectors.shape)

nmf_model = NMF(n_components=6)
nmf_model.fit_transform(tfidf_text_vectors)

display_topics(nmf_model, tfidf_text_vectorizer.get_feature_names())

wordcloud_topics(nmf_model, tfidf_text_vectorizer.get_feature_names())