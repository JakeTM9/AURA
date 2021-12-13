from flask import render_template, request, url_for, redirect
from app import app, predictor, generator
import sys
import os
from werkzeug.utils import secure_filename
# use decorators to link the function to a url
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/testModel')
def testModel():
    if request.method == 'POST':
        review = request.form["review"]
        return redirect(url_for('result'), review = review)
    return render_template('testModel.html')

@app.route("/result", methods=['GET', 'POST'])
def result():
    review = request.form.get('review')
    return render_template("result.html", review=review, prediction = predictor.predict_sentiment(review))

@app.route('/Input_CSV')
def Input_CSV():
    return render_template('Input_CSV.html')

uploads_dir = os.path.join(app.instance_path, 'uploads')
os.makedirs(uploads_dir, exist_ok=True)

@app.route('/create', methods=['GET', 'POST'])
def create():
    if 'myfile1' in request.files:
        reviewData = request.files['myfile1']
        reviewData.save(os.path.join(uploads_dir, secure_filename(reviewData.filename)))
        reviewDataFileName = secure_filename(reviewData.filename)
    analysisTitle = request.form['analysisTitle']
    path = app.instance_path
    if('myfile1' in request.files and analysisTitle != "" and request.method == 'POST'):
        return redirect(url_for('analysisGeneration',  analysisTitle = analysisTitle, path = path, reviewDataFileName = reviewDataFileName))
    return 'Please Try Again with Proper CSV Files'

@app.route('/analysisGeneration', methods=['GET', 'POST'])
def analysisGeneration():
    analysisTitle = request.args.get('analysisTitle')
    path = request.args.get('path')
    reviewDataFileName = request.args.get('reviewDataFileName')
    #finalDF = queries.standardDatapullFiles( int(desiredHousehold), path, householdsFileName, transactionsFileName, productsFileName)
    exampleReturnData = generator.hi()
    allDataDF = generator.generateAnalysis(path,reviewDataFileName)
    return render_template('Generated_Analysis.html',analysisTitle = analysisTitle, exampleReturnData = exampleReturnData, allDataDF = allDataDF)