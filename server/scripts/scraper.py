from google_play_scraper import app, Sort, reviews
import csv,os,sys

#To use do a pip install google-play-scraper

#Scraper, provide an apps id to scrape reviews for that app
#can also scrape all info about the app, name, description, score, ect.
#provide ID of app to get reviews, change length to change the amount of reviews
#Right now using pokemon go
def ScrapeReviews(id =  'com.nianticlabs.pokemongo', length = 1000):
    result = reviews(id, count=length)
    return result

def scrapeIcon(google_play_id):
    return app(google_play_id)["icon"]


#imports to a CSV
#reviews are the reviews
#Will write this to the directory your currently in, change the path variable to change this
def ImportToCSV(itemsToImport, path):
    if(len(itemsToImport[0]) > 0):
        f = open(path, 'w+', encoding="utf-8")
        writer = csv.DictWriter(f, fieldnames= itemsToImport[0][0].keys())
        writer.writeheader()
        for x in itemsToImport[0]:
            writer.writerow(x)
        
        f.close()
    return

def scrape(google_play_id, num_reviews, filename, path):
    review_data = reviews(google_play_id, count = int(num_reviews))
    uploads_dir = os.path.join(path, 'uploads')
    finalPath = os.path.join(uploads_dir, filename + '.csv')
    ImportToCSV(review_data, finalPath)
    return finalPath

def scrapeOnly(google_play_id, num_reviews):
    review_data = reviews(google_play_id, count = int(num_reviews))
    return review_data

def scrapeAndSave(google_play_id, num_reviews):
    review_data = reviews(google_play_id, count = int(num_reviews))
    uploads_dir = os.path.join(os.getcwd(), 'review_data')
    finalPath = os.path.join(uploads_dir, 'reviews' + '.csv')
    ImportToCSV(review_data, finalPath)
    return review_data



#if __name__ == '__main__':
#    import sys
#    if(len(sys.argv) == 2):
#        ScrapeReviews(sys.argv[1])
#    else:
#        itemsToImport = ScrapeReviews()
#        ImportToCSV(itemsToImport)