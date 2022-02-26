import time
from flask import Flask, request, jsonify
from scripts import scraper, topic_model, saved_analyses

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
    data = scraper.scrapeAndSave(google_play_id, number_reviews)
    #items = topic_model.run_topic_model()
    return jsonify(data[0])

@app.route('/api/getTopicModelData')
def get_topic_model_data():
    items = topic_model.run_topic_model()
    return jsonify(items)

@app.route('/api/saveAnalysisData')
def save_analysis_data():
    title = request.args['title']
    topic_model_data = request.args['topicModelData[]']
    saved_analyses.add(title, topic_model_data)
    
    return {} #dont need to return anything now: in the future we can return a fail in case of a duplicate name or smth