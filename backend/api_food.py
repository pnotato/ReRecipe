import requests
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# Given a list of food names returns nutritional data per 100g for each food
from typing import Tuple

def search_recipe(food_name_weight: Tuple[str, float]) -> list[dict]:
    # OAuth 2.0 credentials
    CLIENT_ID = os.getenv("CLIENT_ID")
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")

    TOKEN_URL = "https://oauth.fatsecret.com/connect/token"

    payload = {"grant_type" : "client_credentials", 
    "client_id" : CLIENT_ID, "client_secret" : CLIENT_SECRET, "scope" : "basic"}

    token_request = requests.post(TOKEN_URL, data = payload)
    access_token = token_request.json()['access_token']
    token_timer = token_request.json()['expires_in']


    food_list = []
    for food_name, weight in food_name_weight:
        food_data = search_food(food_name, weight, access_token)
        # Add food data to list
        food_list.append(food_data)
    return food_list
    

def search_food(search: str, weight: float, access_token) -> dict:
    ACCESS_URL = "https://platform.fatsecret.com/rest/server.api"

    search_params = {'method': 'foods.search','search_expression':search,"format":"json"}
    header = {"Authorization": "Bearer " + access_token}
    access_request = requests.post(ACCESS_URL, headers = header, params = search_params).json()

    food_id = access_request["foods"]["food"][0]["food_id"]

    id_params = {'method': 'food.get','food_id':food_id, "format":"json"}
    food_data = requests.post(ACCESS_URL, headers = header, params = id_params).json()

    # print(food_data)

    servings = food_data["food"]["servings"]["serving"]
    if (type(servings) == dict):
        servings = [servings]
    # Find serving that has metric serving unit of grams
    serving_g = None

    for serving in servings:
        # print(serving)
        if serving["metric_serving_unit"] == "g":
            serving_g = serving
    if not serving_g:
        serving_g = servings[0]

    # Get nutritional data for given weight
    scale_factor = weight / float(serving_g.get("metric_serving_amount", 1))
    calcium = float(serving_g.get("calcium", 0)) * scale_factor
    calories = float(serving_g.get("calories", 0)) * scale_factor
    carbohydrate = float(serving_g.get("carbohydrate", 0)) * scale_factor
    cholesterol = float(serving_g.get("cholesterol", 0)) * scale_factor
    fat = float(serving_g.get("fat", 0)) * scale_factor
    fiber = float(serving_g.get("fiber", 0)) * scale_factor
    iron = float(serving_g.get("iron", 0)) * scale_factor
    monounsaturated_fat = float(serving_g.get("monounsaturated_fat", 0)) * scale_factor
    polyunsaturated_fat = float(serving_g.get("polyunsaturated_fat", 0)) * scale_factor
    potassium = float(serving_g.get("potassium", 0)) * scale_factor
    protein = float(serving_g.get("protein", 0)) * scale_factor
    saturated_fat = float(serving_g.get("saturated_fat", 0)) * scale_factor
    sodium = float(serving_g.get("sodium", 0)) * scale_factor
    sugar = float(serving_g.get("sugar", 0)) * scale_factor
    vitamin_a = float(serving_g.get("vitamin_a", 0)) * scale_factor
    vitamin_c = float(serving_g.get("vitamin_c", 0)) * scale_factor

    food_data = {
        "food_name": food_data["food"]["food_name"],
        "calcium": calcium,
        "calories": calories,
        "carbohydrate": carbohydrate,
        "cholesterol": cholesterol,
        "fat": fat,
        "fiber": fiber,
        "iron": iron,
        "monounsaturated_fat": monounsaturated_fat,
        "polyunsaturated_fat": polyunsaturated_fat,
        "potassium": potassium,
        "protein": protein,
        "saturated_fat": saturated_fat,
        "sodium": sodium,
        "sugar": sugar,
        "vitamin_a": vitamin_a,
        "vitamin_c": vitamin_c,
        "weight": weight
    }

    return food_data
        


"""{
  "food": {
    "food_id": "33689",
    "food_name": "Cheddar Cheese",
    "food_type": "Generic",
    "food_url": "https://www.fatsecret.com/calories-nutrition/usda/cheddar-cheese",
    "servings": {
      "serving": [
        {
          "calcium": "16",
          "calories": "113",
          "carbohydrate": "0.36",
          "cholesterol": "29",
          "fat": "9.28",
          "fiber": "0",
          "iron": "1",
          "measurement_description": "slice (1 oz)",
          "metric_serving_amount": "28.000",
          "metric_serving_unit": "g",
          "monounsaturated_fat": "2.629",
          "number_of_units": "1.000",
          "polyunsaturated_fat": "0.264",
          "potassium": "27",
          "protein": "6.97",
          "saturated_fat": "5.906",
          "serving_description": "1 slice (1 oz)",
          "serving_id": "29136",
          "serving_url": "https://www.fatsecret.com/calories-nutrition/usda/cheddar-cheese?portionid=29136&portionamount=1.000",
          "sodium": "174",
          "sugar": "0.15",
          "vitamin_a": "8",
          "vitamin_c": "0"
        },
        {
          "calcium": "55",
          "calories": "403",
          "carbohydrate": "1.28",
          "cholesterol": "105",
          "fat": "33.14",
          "fiber": "0",
          "iron": "4",
          "measurement_description": "g",
          "metric_serving_amount": "100.000",
          "metric_serving_unit": "g",
          "monounsaturated_fat": "9.391",
          "number_of_units": "100.000",
          "polyunsaturated_fat": "0.942",
          "potassium": "98",
          "protein": "24.90",
          "saturated_fat": "21.092",
          "serving_description": "100 g",
          "serving_id": "56420",
          "serving_url": "https://www.fatsecret.com/calories-nutrition/usda/cheddar-cheese?portionid=56420&portionamount=100.000",
          "sodium": "621",
          "sugar": "0.52",
          "vitamin_a": "29",
          "vitamin_c": "0"
        },
        {
          "calcium": "16",
          "calories": "114",
          "carbohydrate": "0.36",
          "cholesterol": "30",
          "fat": "9.40",
          "fiber": "0",
          "iron": "1",
          "measurement_description": "oz",
          "metric_serving_amount": "28.350",
          "metric_serving_unit": "g",
          "monounsaturated_fat": "2.662",
          "number_of_units": "1.000",
          "polyunsaturated_fat": "0.267",
          "potassium": "28",
          "protein": "7.06",
          "saturated_fat": "5.980",
          "serving_description": "1 oz",
          "serving_id": "29134",
          "serving_url": "https://www.fatsecret.com/calories-nutrition/usda/cheddar-cheese?portionid=29134&portionamount=1.000",
          "sodium": "176",
          "sugar": "0.15",
          "vitamin_a": "8",
          "vitamin_c": "0"
        },
        {
          "calcium": "63",
          "calories": "455",
          "carbohydrate": "1.45",
          "cholesterol": "119",
          "fat": "37.45",
          "fiber": "0",
          "iron": "4",
          "measurement_description": "cup, shredded",
          "metric_serving_amount": "113.000",
          "metric_serving_unit": "g",
          "monounsaturated_fat": "10.612",
          "number_of_units": "1.000",
          "polyunsaturated_fat": "1.064",
          "potassium": "111",
          "protein": "28.14",
          "saturated_fat": "23.834",
          "serving_description": "1 cup shredded",
          "serving_id": "29133",
          "serving_url": "https://www.fatsecret.com/calories-nutrition/usda/cheddar-cheese?portionid=29133&portionamount=1.000",
          "sodium": "702",
          "sugar": "0.59",
          "vitamin_a": "33",
          "vitamin_c": "0"
        },
        {
          "calcium": "9",
          "calories": "69",
          "carbohydrate": "0.22",
          "cholesterol": "18",
          "fat": "5.63",
          "fiber": "0",
          "iron": "1",
          "measurement_description": "cubic inch",
          "metric_serving_amount": "17.000",
          "metric_serving_unit": "g",
          "monounsaturated_fat": "1.596",
          "number_of_units": "1.000",
          "polyunsaturated_fat": "0.160",
          "potassium": "17",
          "protein": "4.23",
          "saturated_fat": "3.586",
          "serving_description": "1 cubic inch",
          "serving_id": "29135",
          "serving_url": "https://www.fatsecret.com/calories-nutrition/usda/cheddar-cheese?portionid=29135&portionamount=1.000",
          "sodium": "106",
          "sugar": "0.09",
          "vitamin_a": "5",
          "vitamin_c": "0"
        }
      ]
    }
  }
}"""