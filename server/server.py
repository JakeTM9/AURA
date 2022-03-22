import time
from flask import Flask, request, jsonify
from scripts import scraper, topic_model, saved_analyses, static_analysis, sentiment_analysis

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
    ##run sentiment analysis
    sentiment_analysis.run()
    return jsonify(data[0])

##gonna split nega and positive
@app.route('/api/getTopicModelDataPositive')
def get_topic_model_data_positive():
    items = topic_model.run_topic_model_positive()
    return jsonify(items)

@app.route('/api/getTopicModelDataNegative')
def get_topic_model_data_negative():
    items = topic_model.run_topic_model_negative()
    return jsonify(items)

@app.route('/api/getStaticData')
def get_static_data():
    items = static_analysis.main()
    return items

@app.route('/api/getAnalysisCards')
def get_anlysis_cards():
    items = saved_analyses.getAnalysisCards()
    print(items)
    return items

@app.route('/api/saveAnalysisData')
def save_analysis_data():
    title = request.args['title']
    topic_model_data = request.args['topicModelData[]']
    saved_analyses.add(title, topic_model_data)
    
    return {} #dont need to return anything now: in the future we can return a fail in case of a duplicate name or smth