import time
from flask import Flask, request, jsonify
from scripts import scraper

app = Flask(__name__)

##This is now exclusivley an api
@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/getReviewData')
def get_review_data():
    google_play_id = request.args['google_play_id']
    number_reviews = request.args['number_reviews']
    file_name = request.args['file_name']
    data = scraper.scrapeOnly(google_play_id, number_reviews)
    return jsonify(data[0])