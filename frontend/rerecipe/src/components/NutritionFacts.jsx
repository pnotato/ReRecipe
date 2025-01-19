import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
            <img src="https://s.cdpn.io/3/NutritionFacts.gif" className="image" />
            <section className="performance-facts">
                <header className="performance-facts__header">
                <h1 className="performance-facts__title">Nutrition Facts</h1>
                <p>Serving Size: {weight}g</p>
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
                        <b>Calories</b>
                        {calories}
                    </th>
                    <td>Calories from Fat {fat*9}</td>
                    </tr>
                    <tr className="thick-row">
                    <td colSpan={3} className="small-info">
                        <b>% Daily Value*</b>
                    </td>
                    </tr>
                    <tr>
                    <th colSpan={2}>
                        <b>Total Fat</b>
                        {fat}g
                    </th>
                    <td>
                        <b>22%</b>
                    </td>
                    </tr>
                    <tr>
                    <td className="blank-cell"></td>
                    <th>Saturated Fat {saturated_fat}g</th>
                    <td>
                        <b>22%</b>
                    </td>
                    </tr>
                    <tr>
                    <td className="blank-cell"></td>
                    <th>Trans Fat 0g</th>
                    <td></td>
                    </tr>
                    <tr>
                    <th colSpan={2}>
                        <b>Cholesterol</b>
                        {cholesterol}mg
                    </th>
                    <td>
                        <b>18%</b>
                    </td>
                    </tr>
                    <tr>
                    <th colSpan={2}>
                        <b>Sodium</b>
                        {sodium}mg
                    </th>
                    <td>
                        <b>2%</b>
                    </td>
                    </tr>
                    <tr>
                    <th colSpan={2}>
                        <b>Total Carbohydrate</b>
                        {carbohydrate}g
                    </th>
                    <td>
                        <b>6%</b>
                    </td>
                    </tr>
                    <tr>
                    <td className="blank-cell"></td>
                    <th>Dietary Fiber 1g</th>
                    <td>
                        <b>{fiber}g</b>
                    </td>
                    </tr>
                    <tr>
                    <td className="blank-cell"></td>
                    <th>Sugars {sugar}g</th>
                    <td></td>
                    </tr>
                    <tr className="thick-end">
                    <th colSpan={2}>
                        <b>Protein</b>
                        {protein}g
                    </th>
                    <td></td>
                    </tr>
                </tbody>
                </table>
                <table className="performance-facts__table--grid">
                <tbody>
                    <tr>
                    <td colSpan={2}>Vitamin A {vitamin_a/8}%</td>
                    <td>Vitamin C {vitamin_c/0.8}%%</td>
                    </tr>
                    <tr className="thin-end">
                    <td colSpan={2}>Calcium {calcium/1100 * 100}%</td>
                    <td>Iron {iron/12 * 100}%</td>
                    </tr>
                </tbody>
                </table>
                <p className="small-info">
                * Percent Daily Values are based on a 2,000 calorie diet. Your daily
                values may be higher or lower depending on your calorie needs:
                </p>
                <table className="performance-facts__table--small small-info">
                <thead>
                    <tr>
                    <td colSpan={2} />
                    <th>Calories:</th>
                    <th>2,000</th>
                    <th>2,500</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th colSpan={2}>Total Fat</th>
                    <td>Less than</td>
                    <td>65g</td>
                    <td>80g</td>
                    </tr>
                    <tr>
                    <td className="blank-cell" />
                    <th>Saturated Fat</th>
                    <td>Less than</td>
                    <td>20g</td>
                    <td>25g</td>
                    </tr>
                    <tr>
                    <th colSpan={2}>Cholesterol</th>
                    <td>Less than</td>
                    <td>300mg</td>
                    <td>300 mg</td>
                    </tr>
                    <tr>
                    <th colSpan={2}>Sodium</th>
                    <td>Less than</td>
                    <td>2,400mg</td>
                    <td>2,400mg</td>
                    </tr>
                    <tr>
                    <th colSpan={3}>Total Carbohydrate</th>
                    <td>300g</td>
                    <td>375g</td>
                    </tr>
                    <tr>
                    <td className="blank-cell" />
                    <th colSpan={2}>Dietary Fiber</th>
                    <td>25g</td>
                    <td>30g</td>
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