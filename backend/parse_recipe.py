import openai
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# Helper function to call OpenAI API
def parse_recipe(text_input: str) -> str:
    example_response = """
[
    {
        "ingredient": "flour",
        "quantity": 1,
        "unit": "cup", 
        "weight": 125,
        "fv": false
    },
    {
        "ingredient": "eggs",
        "quantity": 10,
        "unit": "",
        "weight": 600,
        "fv": false
    },
    {
        "ingredient": "tomato",
        "quantity": 1,
        "unit": "",
        "weight": 200,
        "fv": true
    },
    {
        "ingredient": "salt",
        "quantity": 1,
        "unit": "teaspoon",
        "weight": 6,
        "fv": false
    },
    {
        "ingredient": "lemon",
        "quantity": 1,
        "unit": "",
        "weight": 70,
        "fv": true
    }
]
"""
    openai.api_key = os.getenv("OPENAI_API_KEY")
    prompt = f"Extract the ingredients and quantities from the following recipe:\n\n{text_input}\n\nFormat the response as a JSON list of objects with 'ingredient' (name of ingredient), 'quantity', 'unit', 'fv' (Whether or not it's a fruit/vegetable), and 'weight' (total weight). For uncountable ingredients, use the unit of measurement. For countable ingredients, return an empty string for unit unless it is otherwise specified. Classify each ingredient based on whether it is a fruit/vegetable (fv) or not, and estimate its total weight. For example: \n\n{example_response}\n\n Please return raw json without any metadata or json``` indicator."
    response = openai.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a recipe parsing AI."},
            {"role": "user", "content": prompt}
        ],
        model="gpt-4o-mini",
        max_tokens=500
    )
    return response.choices[0].message.content.strip()
