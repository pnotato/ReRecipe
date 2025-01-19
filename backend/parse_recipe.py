import openai
from dotenv import load_dotenv
import os


load_dotenv("../.env")


# Helper function to call OpenAI API
def parse_recipe(text_input):
    """Example response:
[
    {
        "ingredient": "flour",
        "quantity": 1,
        "unit": "cup"
    },
    {
        "ingredient": "eggs",
        "quantity": 2,
        "unit": ""
    },
    {
        "ingredient": "sugar",
        "quantity": 3,
        "unit": "cups"
    }
]
"""
    openai.api_key = os.getenv("OPENAI_API_KEY")
    prompt = f"Extract the ingredients and quantities from the following recipe:\n\n{text_input}\n\nFormat the response as a JSON list of objects with 'ingredient' and 'quantity' and 'unit' fields for the name of the ingredient, the quantity, and the unit of measurement respectively. Please return raw json without any metadata."
    response = openai.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a recipe parsing AI."},
            {"role": "user", "content": prompt}
        ],
        model="gpt-4o-mini",
        max_tokens=1000
    )
    return response.choices[0].message.content.strip()
