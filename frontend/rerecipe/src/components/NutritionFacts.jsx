import { useState } from 'react'
import './NutritionFacts.css'


function NutritionFacts({ totalNutrients }) {

    const {
        calcium = 0,
        calories = 0,
        carbohydrate = 0,
        cholesterol = 0,
        fat = 0,
        fiber = 0,
        iron = 0,
        monounsaturated_fat = 0,
        polyunsaturated_fat = 0,
        potassium = 0,
        protein = 0,
        saturated_fat = 0,
        sodium = 0,
        sugar = 0,
        vitamin_a = 0,
        vitamin_c = 0,
        weight = 0
      } = totalNutrients || {};

    return (

        <>
            <section className="performance-facts">
                <header className="performance-facts__header">
                <h1 className="performance-facts__title">Nutrition Facts</h1>
                <p>Serving Size (Whole Recipe): {weight}g</p>
                </header>
                <table className="performance-facts__table">
                <thead>
                    <tr>
                    <th colSpan={3} className="small-info">
                        Amount Per Serving
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th colSpan={2}>
                        <b>Calories    </b>
                        {calories}
                    </th>
                    <td></td>
                    </tr>
                
                    <tr>
                    <th colSpan={2}>
                        <b>Total Fat    </b>
                        {fat}g
                    </th>
                    <td>
                    </td>
                    </tr>
                    <tr>
                    <td className="blank-cell"></td>
                    <th>Saturated Fat {saturated_fat}g</th>
                    <td>
                    </td>
                    </tr>
                    <tr>
                    <td className="blank-cell"></td>
                    <th>Trans Fat 0g</th>
                    <td></td>
                    </tr>
                    <tr>
                    <th colSpan={2}>
                        <b>Cholesterol    </b>
                        {cholesterol}mg
                    </th>
                    <td>
                    </td>
                    </tr>
                    <tr>
                    <th colSpan={2}>
                        <b>Sodium    </b>
                        {sodium}mg
                    </th>
                    <td>
                    </td>
                    </tr>
                    <tr>
                    <th colSpan={2}>
                        <b>Total Carbohydrate    </b>
                        {carbohydrate}g
                    </th>
                    <td>
                    </td>
                    </tr>
                    <tr>
                    <td className="blank-cell"></td>
                    <th>Dietary Fiber {fiber}g</th>
                    <td>
                    </td>
                    </tr>
                    <tr>
                    <td className="blank-cell"></td>
                    <th>Sugars {sugar}g</th>
                    <td></td>
                    </tr>
                    <tr className="thick-end">
                    <th colSpan={2}>
                        <b>Protein    </b>
                        {protein}g
                    </th>
                    <td></td>
                    </tr>
                </tbody>
                </table>
                
                <p className="small-info">Calories per gram:</p>
                <p className="small-info text-center">Fat 9 • Carbohydrate 4 • Protein 4</p>
            </section>
        </>
    )
}

export default NutritionFacts