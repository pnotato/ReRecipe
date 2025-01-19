import requests
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

def search_food(search: str) -> dict:
    # OAuth 2.0 credentials
    CLIENT_ID = os.getenv("CLIENT_ID")
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")

    TOKEN_URL = "https://oauth.fatsecret.com/connect/token"
    ACCESS_URL = "https://platform.fatsecret.com/rest/server.api"

    payload = {"grant_type" : "client_credentials", 
    "client_id" : CLIENT_ID, "client_secret" : CLIENT_SECRET, "scope" : "basic"}

    token_request = requests.post(TOKEN_URL, data = payload)
    access_token = token_request.json()['access_token']
    token_timer = token_request.json()['expires_in']

    search_params = {'method': 'foods.search','search_expression':search,"format":"json"}
    header = {"Authorization": "Bearer " + access_token}
    access_request = requests.post(ACCESS_URL, headers = header, params = search_params).json()

    # print(access_request["foods"]["food"][0])
    food_id = access_request["foods"]["food"][0]["food_id"]

    id_params = {'method': 'food.get','food_id':food_id, "format":"json"}
    food_data = requests.post(ACCESS_URL, headers = header, params = id_params).json()
    return food_data


print(search_food("cheddar"))