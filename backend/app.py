from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Home"

@app.route("/get-user/<user_id>")
def get


if __name__ == "__main__":
    app.run(debug=True) ## remove debug later on. 




