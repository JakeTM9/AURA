import os,json
import pandas as pd

def main():
    uploads_dir = os.path.join(os.getcwd(), 'saved')
    finalPath = os.path.join(uploads_dir, 'saved_analyses' + '.csv')
    df = pd.read_csv(finalPath)
    return

def add(title,id,numReviews):
    uploads_dir = os.path.join(os.getcwd(), 'saved')
    dataPath = os.path.join(uploads_dir, 'saved_analyses' + '.csv')
    df = pd.read_csv(dataPath)
    toAdd = {'title': title, 'id': id, 'numReviews': numReviews}
    df = df.append(toAdd, ignore_index = True)
    df.to_csv(dataPath, index=False)
    print(df)

def getAnalysisCards():
    uploads_dir = os.path.join(os.getcwd(), 'saved')
    dataPath = os.path.join(uploads_dir, 'saved_analyses' + '.csv')
    df = pd.read_csv(dataPath)
    result = df.to_json(orient="records")
    parsed = json.loads(result)
    return json.dumps(parsed, indent=4)