import os,json
import pandas as pd

def main():
    uploads_dir = os.path.join(os.getcwd(), 'review_data')
    finalPath = os.path.join(uploads_dir, 'saved_analyses' + '.csv')
    df = pd.read_csv(finalPath)
    print(df)
    return

def add(title,topic_model_data):
    uploads_dir = os.path.join(os.getcwd(), 'review_data')
    dataPath = os.path.join(uploads_dir, 'saved_analyses' + '.csv')
    df = pd.read_csv(dataPath)
    toAdd = {'title': title, 'topic_model_data': topic_model_data}
    df = df.append(toAdd, ignore_index = True)
    df.to_csv(dataPath, index=False)
    print(df)