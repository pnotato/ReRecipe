from flask import Flask, request, jsonify
from flask_cors import CORS
from parse_recipe import parse_recipe
from dotenv import load_dotenv, find_dotenv


app = Flask(__name__)
CORS(app)

@app.route("/parse_recipe", methods=["POST"])
def call_openai():
    data = request.json
    text_input = data.get("text")

    if not text_input:
        return jsonify({"error": "No text input provided"}), 400

    try:
        response = parse_recipe(text_input)
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)  # remove debug later on.
    load_dotenv(find_dotenv())
