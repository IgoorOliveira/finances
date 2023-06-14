from flask import Flask

app = Flask(__name__, static_folder='static')
app.secret_key = "igfddosfosd dsbfbo"

from app import routes