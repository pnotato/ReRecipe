import openai
import os
from dotenv import load_dotenv, find_dotenv
from api_food import search_recipe
from nutri_score import calculate_nutri_score, convert_to_nutritional_data

load_dotenv(find_dotenv())

# Helper function to call OpenAI API and return json of everything
def parse_recipe(text_input: str) -> dict:
    example_response = """
[
    {
        "ingredient": "flour",
        "quantity": 1,
        "unit": "cup", 
        "weight": 125,
        "fv": 0
    },
    {
        "ingredient": "eggs",
        "quantity": 10,
        "unit": "",
        "weight": 600,
        "fv": 0
    },
    {
        "ingredient": "tomato",
        "quantity": 1,
        "unit": "",
        "weight": 200,
        "fv": 1
    },
    {
        "ingredient": "salt",
        "quantity": 1,
        "unit": "teaspoon",
        "weight": 6,
        "fv": 0
    },
    {
        "ingredient": "lemon",
        "quantity": 1,
        "unit": "",
        "weight": 70,
        "fv": 1
    }
]
"""
    openai.api_key = os.getenv("OPENAI_API_KEY")
    prompt = f"Extract the ingredients and quantities from the following recipe:\n\n{text_input}\n\nFormat the response as a JSON list of objects with 'ingredient' (name of ingredient), 'quantity', 'unit', 'fv' (1 if it is a fruit/vegetable, 0 if it isn't), and 'weight' (total weight). If an ingredient is branded or very specific, return a generic ingredient name. For uncountable ingredients, use the unit of measurement. For countable ingredients, return an empty string for unit unless it is otherwise specified. Classify each ingredient based on whether it is a fruit/vegetable (fv) or not, and estimate its total weight. For example: \n\n{example_response}\n\n Please return raw json without any metadata or json``` indicator."
    response = openai.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a recipe parsing AI."},
            {"role": "user", "content": prompt}
        ],
        model="gpt-4o-mini",
        max_tokens=2000
    )

    recipe_ingredients_str = response.choices[0].message.content.strip()
    print(recipe_ingredients_str)

    # Initialize response dictionary
    response = {}

    # Convert the string to a list of dictionaries
    try:
        recipe_ingredients_dict = eval(recipe_ingredients_str)
    except TypeError or SyntaxError:
        try:
            eval(recipe_ingredients_str + "}")
        except Exception as e:
            print(e)
            raise(TypeError("Invalid response from OpenAI API"))
    response["ingredients"] = recipe_ingredients_dict

    # Get percentage of fruit/vegetables in ingredient list
    percent_fv = sum(ingredient["fv"] == 1 for ingredient in recipe_ingredients_dict) / len(recipe_ingredients_dict) * 100
    

    # Get nutritional data for each ingredient by its total weight in g
    food_name_weights = [(ingredient["ingredient"], ingredient["weight"]) for ingredient in recipe_ingredients_dict]
    # print(food_name_weights)
    nutritional_data = search_recipe(food_name_weights)
    # print(nutritional_data)

    # Convert the full nutritional data to NutritionalData objects
    nutritional_data_objects = []
    for data in nutritional_data:
        nutritional_data_objects.append(convert_to_nutritional_data(data))
    
    # Calculate the NutriScore
    nutri_score = calculate_nutri_score(nutritional_data_objects, percent_fv)
    response["nutri_score"] = nutri_score

    # Calculate total nutritional data for the recipe
    total_nutrients = {
        "calcium": 0,
        "calories": 0,
        "carbohydrate": 0,
        "cholesterol": 0,
        "fat": 0,
        "fiber": 0,
        "iron": 0,
        "monounsaturated_fat": 0,
        "polyunsaturated_fat": 0,
        "potassium": 0,
        "protein": 0,
        "saturated_fat": 0,
        "sodium": 0,
        "sugar": 0,
        "vitamin_a": 0,
        "vitamin_c": 0,
        "weight": 0
    }

    for data in nutritional_data:
        total_nutrients["calcium"] += int(round(data["calcium"]))
        total_nutrients["calories"] += int(round(data["calories"]))
        total_nutrients["carbohydrate"] += int(round(data["carbohydrate"]))
        total_nutrients["cholesterol"] += int(round(data["cholesterol"]))
        total_nutrients["fat"] += int(round(data["fat"]))
        total_nutrients["fiber"] += int(round(data["fiber"]))
        total_nutrients["iron"] += int(round(data["iron"]))
        total_nutrients["monounsaturated_fat"] += int(round(data["monounsaturated_fat"]))
        total_nutrients["polyunsaturated_fat"] += int(round(data["polyunsaturated_fat"]))
        total_nutrients["potassium"] += int(round(data["potassium"]))
        total_nutrients["protein"] += int(round(data["protein"]))
        total_nutrients["saturated_fat"] += int(round(data["saturated_fat"]))
        total_nutrients["sodium"] += int(round(data["sodium"]))
        total_nutrients["sugar"] += int(round(data["sugar"]))
        total_nutrients["vitamin_a"] += int(round(data["vitamin_a"]))
        total_nutrients["vitamin_c"] += int(round(data["vitamin_c"]))
        total_nutrients["weight"] += int(round(data["weight"]))

    response["total_nutrients"] = total_nutrients

    print(response)

    return response
