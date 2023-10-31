import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/message', methods=['POST'])
def message():
    json_data = request.json
    message = json_data.get('message')
    print(message)
    time.sleep(len(message) / 10.0)
    return str(len(message))
