from dataclasses import dataclass

# Represents the nutritional data for one ingredient per 100g, and its weight in the recipe
@dataclass
class NutritionalData:
    kcal: float
    sugar_g: float
    saturated_fat_g: float
    salt_mg: float
    fibre_g: float
    protein_g: float
    weight_g: float

def convert_to_nutritional_data(food_data: dict) -> NutritionalData:
    return NutritionalData(
        kcal=food_data["calories"],
        sugar_g=food_data["sugar"],
        saturated_fat_g=food_data["saturated_fat"],
        salt_mg=food_data["sodium"],
        fibre_g=food_data["fiber"],
        protein_g=food_data["protein"],
        weight_g=food_data["weight"]
    )

# Take a list of NutritionalData objects and return a NutriScore
def calculate_nutri_score(nutritional_data: list[NutritionalData], percent_fv: float) -> dict:
    # Add up the data for all ingredients
    total_kcal = 0
    total_sugar_g = 0
    total_saturated_fat_g = 0
    total_salt_mg = 0
    total_fibre_g = 0
    total_protein_g = 0
    total_weight_g = 0

    for data in nutritional_data:
        total_kcal += data.kcal
        total_sugar_g += data.sugar_g
        total_saturated_fat_g += data.saturated_fat_g
        total_salt_mg += data.salt_mg
        total_fibre_g += data.fibre_g
        total_protein_g += data.protein_g
        total_weight_g += data.weight_g
    
    # Calculate the scores for each category
    energy_density = energy_density_score(total_kcal, total_weight_g)
    sugar = sugar_score(total_sugar_g, total_weight_g)
    saturated_fat = saturated_fat_score(total_saturated_fat_g, total_weight_g)
    salt = salt_score(total_salt_mg, total_weight_g)
    fruit_veg = fruit_veg_score(percent_fv)
    fibre = fibre_score(total_fibre_g, total_weight_g)
    protein = protein_score(total_protein_g, total_weight_g)

    # Calculate the NutriScore
    total_score = energy_density + sugar + saturated_fat + salt - fruit_veg - fibre - protein

    # Return the NutriScore breakdown and total
    return {
        "energy_density": energy_density,
        "sugar": sugar,
        "saturated_fat": saturated_fat,
        "salt": salt,
        "fruit_veg": fruit_veg,
        "fibre": fibre,
        "protein": protein,
        "total_score": total_score
    }


def energy_density_score(total_kcal: float, weight_g: float) -> int:
    # Calculate kcal per 100g
    kcal_per_100g = total_kcal / weight_g * 100

    if kcal_per_100g > 800:
        return 10
    elif kcal_per_100g > 720:
        return 9
    elif kcal_per_100g > 640:
        return 8
    elif kcal_per_100g > 560:
        return 7
    elif kcal_per_100g > 480:
        return 6
    elif kcal_per_100g > 400:
        return 5
    elif kcal_per_100g > 320:
        return 4
    elif kcal_per_100g > 240:
        return 3
    elif kcal_per_100g > 160:
        return 2
    elif kcal_per_100g > 80:
        return 1
    else:
        return 0
    

def sugar_score(sugar_g: float, weight_g: float) -> int:
    # Calculate sugar per 100g
    sugar_per_100g = sugar_g / weight_g * 100

    # Thresholds 45, 50, 36, 31, 27, 22.5, 18, 13.5, 9, 4.5, <4.5
    if sugar_per_100g > 45:
        return 10
    elif sugar_per_100g > 40:
        return 9
    elif sugar_per_100g > 36:
        return 8
    elif sugar_per_100g > 31:
        return 7
    elif sugar_per_100g > 27:
        return 6
    elif sugar_per_100g > 22.5:
        return 5
    elif sugar_per_100g > 18:
        return 4
    elif sugar_per_100g > 13.5:
        return 3
    elif sugar_per_100g > 9:
        return 2
    elif sugar_per_100g > 4.5:
        return 1
    else:
        return 0
    
def saturated_fat_score(saturated_fat_g: float, weight_g: float) -> int:
    # Calculate saturated fat per 100g
    saturated_fat_per_100g = saturated_fat_g / weight_g * 100

    # Thresholds 64, 58, 52, 46, 40, 34, 28, 22, 16, 10, <10
    if saturated_fat_per_100g > 64:
        return 10
    elif saturated_fat_per_100g > 58:
        return 9
    elif saturated_fat_per_100g > 52:
        return 8
    elif saturated_fat_per_100g > 46:
        return 7
    elif saturated_fat_per_100g > 40:
        return 6
    elif saturated_fat_per_100g > 34:
        return 5
    elif saturated_fat_per_100g > 28:
        return 4
    elif saturated_fat_per_100g > 22:
        return 3
    elif saturated_fat_per_100g > 16:
        return 2
    elif saturated_fat_per_100g > 10:
        return 1
    else:
        return 0
    

def salt_score (salt_mg: float, weight_g: float) -> int:
    # Calculate salt per 100g
    salt_per_100g = salt_mg / weight_g * 100

    # Thresholds 900, 810, 720, 630, 540, 450, 360, 270, 180, 90, <90
    if salt_per_100g > 900:
        return 10
    elif salt_per_100g > 810:
        return 9
    elif salt_per_100g > 720:
        return 8
    elif salt_per_100g > 630:
        return 7
    elif salt_per_100g > 540:
        return 6
    elif salt_per_100g > 450:
        return 5
    elif salt_per_100g > 360:
        return 4
    elif salt_per_100g > 270:
        return 3
    elif salt_per_100g > 180:
        return 2
    elif salt_per_100g > 90:
        return 1
    else:
        return 0
    

def fruit_veg_score(percent_fv: float) -> int:
    # Thresholds 80, 60, 40, <40
    if percent_fv > 80:
        return 5
    elif percent_fv > 60:
        return 2
    elif percent_fv > 40:
        return 1
    else: 
        return 0
    

def fibre_score(fibre: float, weight_g: float) -> int:
    # Calculate fibre per 100g
    fibre_per_100g = fibre / weight_g * 100

    # Thresholds 3.5, 2.8, 2.1, 1.4, 0.7, <0.7
    if fibre_per_100g > 3.5:
        return 5
    elif fibre_per_100g > 2.8:
        return 4
    elif fibre_per_100g > 2.1:
        return 3
    elif fibre_per_100g > 1.4:
        return 2
    elif fibre_per_100g > 0.7:
        return 1
    else:
        return 0
    

def protein_score(protein: float, weight_g: float) -> int:
    # Calculate protein per 100g
    protein_per_100g = protein / weight_g * 100

    # Thresholds 8, 6.4, 4.8, 3.2, 1.6, <1.6
    if protein_per_100g > 8:
        return 5
    elif protein_per_100g > 6.4:
        return 4
    elif protein_per_100g > 4.8:
        return 3
    elif protein_per_100g > 3.2:
        return 2
    elif protein_per_100g > 1.6:
        return 1
    else:
        return 0