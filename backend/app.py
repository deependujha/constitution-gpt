import os
import random
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()
PORT = os.getenv('PORT')

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/chatbot', methods=['POST'])
def home():
    question = request.json.get('question')
    if question is None:
        response = jsonify({'error': 'Bad Request'})
        response.status_code = 400
        return response

    messages = [
        "Hello, how are you?",
        "What's your favorite color?",
        "Have a great day!",
        "I'm feeling tired today.",
        "Do you enjoy reading?",
        "What's your favorite hobby?",
        "Let's meet for coffee sometime.",
        "I can't wait for the weekend!",
        "Did you watch the latest movie?",
        "Wishing you a wonderful week ahead!"
    ]

    idx = random.randint(0, 9)
    response = jsonify({'response': messages[idx], 'success': True})
    response.status_code = 200
    return response


if __name__ == '__main__':
    app.run(port=PORT, debug=True)
