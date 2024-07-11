from flask import Flask, jsonify, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = '4rQgnniq-HSgoDUk7_84-RmQiQgNlV9V'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/lists', methods=['GET'])
def get_lists():
    try:
        headers = {
            'Authorization': f'Bearer {API_KEY}'
        }
        response = requests.get('https://csfloat.com/api/v1/listings?page=60', headers=headers)
        data = response.json()
        return jsonify(data)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=25597, host="0.0.0.0", debug=True)
