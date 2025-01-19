import requests
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())
api_key = os.getenv("USDA_API_KEY")

base_url = "https://api.nal.usda.gov/fdc/v1/foods/search"
query_params = {
    "api_key": api_key,
    "query": "Cheddar Cheese"
}

url = requests.get(url=base_url, params=query_params)

print(url.json())