from flask import render_template, request, url_for, redirect
from app import app, predictor
import sys
# use decorators to link the function to a url
@app.route('/')
def home():
    if request.method == 'POST':
        review = request.form["review"]
        return redirect(url_for('result'), review = review)
    return render_template('index.html')

@app.route("/result", methods=['GET', 'POST'])
def result():
    review = request.form.get('review')
    return render_template("result.html", review=review, prediction = predictor.predict_sentiment(review))