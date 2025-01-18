from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Home"

@app.route("/get-user/<user_id>") # testing
def get_user(user_id):
    user_data = {
        "user_id": user_id,
        "name": "John Doe",
        "email": "john.doe@example.com"
    }

    extra = request.args.get("extra")
    if extra:
        user_data["extra"] = extra

    return jsonify(user_data), 200

@app.route("/enter-recipe-text", methods=['POST'])
def process_recipe_text():
    data = request.json
    print(data)
    return jsonify({"message": "success", "data":data})

if __name__ == "__main__":
    app.run(debug=True) ## remove debug later on. 




