import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import openai

load_dotenv("../.env")

app = Flask(__name__)
CORS(app)

# Load OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/parse_recipe", methods=["POST"])
def call_openai():
    data = request.json
    text_input = data.get("text")

    if not text_input:
        return jsonify({"error": "No text input provided"}), 400

    try:
        prompt = f"Extract the ingredients and quantities from the following recipe:\n\n{text_input}\n\nFormat the response as a JSON list of objects with 'ingredient' and 'quantity' fields."
        response = openai.Completion.create(
            model="4o-mini",
            prompt=prompt,
            max_tokens=150
        )
        return jsonify(response.choices[0].text.strip()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)  # remove debug later on.
