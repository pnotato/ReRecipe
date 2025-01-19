import openai
from dotenv import load_dotenv
import os


load_dotenv("../.env")



# Helper function to call OpenAI API
def parse_recipe(text_input):
    example_response = """
[
    {
        "ingredient": "flour",
        "quantity": 1,
        "unit": "cup", 
        "fv": false
    },
    {
        "ingredient": "eggs",
        "quantity": 2,
        "unit": "",
        "fv": false
    },
    {
        "ingredient": "tomato",
        "quantity": 1,
        "unit": "",
        "fv": true
    },
    {
        "ingredient": "salt",
        "quantity": 1,
        "unit": "teaspoon",
        "fv": false
    },
    {
        "ingredient": "lemon",
        "quantity": 1,
        "unit": "",
        "fv": true
    }
]
"""
    openai.api_key = os.getenv("OPENAI_API_KEY")
    prompt = f"Extract the ingredients and quantities from the following recipe:\n\n{text_input}\n\nFormat the response as a JSON list of objects with 'ingredient' and 'quantity' and 'unit' fields for the name of the ingredient, the quantity, and the unit of measurement respectively. For uncountable ingredients, use the unit of measurement. For countable ingredients, return an empty string for unit unless it is otherwise specified. Classify each ingredient based on whether it is a fruit/vegetable (fv) or not. For example: \n\n{example_response}\n\n Please return raw json without any metadata or json``` indicator."
    response = openai.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a recipe parsing AI."},
            {"role": "user", "content": prompt}
        ],
        model="gpt-4o",
        max_tokens=500
    )
    return response.choices[0].message.content.strip()
