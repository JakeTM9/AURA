import os
from pandas import DataFrame
import pandas as pd
import sys
import csv
import json

def hi():
    return "hi"

def generateAnalysis(path, reviewDataFileName):
    uploads_dir = os.path.join(path, 'uploads')
    wholeTableDF = pd.read_csv(os.path.join(uploads_dir,reviewDataFileName), encoding = 'ISO-8859-1')
    print(wholeTableDF,file=sys.stderr)
    for col in wholeTableDF.columns:
        print(col,file=sys.stderr)
    return wholeTableDF

def generateAnalysisFromScrape(csv_path):
    print(csv_path,file=sys.stderr)
    wholeTableDF = pd.read_csv(csv_path, encoding = 'ISO-8859-1')
    print(wholeTableDF,file=sys.stderr)
    for col in wholeTableDF.columns:
        print(col,file=sys.stderr)
    return wholeTableDF