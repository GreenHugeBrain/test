from flask import Flask, jsonify, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
cors = CORS(app, resources={r'/*'})