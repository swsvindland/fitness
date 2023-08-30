import { MacroGridUnit } from '../Macros/MacroGridUnit';
import { FoodDetailRow } from './FoodDetailRow';
import { Serving } from '../../types/Food';
import { FC } from 'react';

interface IProps {
    serving: Serving;
    displayedQuantity: number;
}
export const NutritionLabel: FC<IProps> = ({ serving, displayedQuantity }) => {
    return (
        <div className="w-full">
            <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                <MacroGridUnit
                    name="Calories"
                    amount={serving.calories * displayedQuantity}
                    unit="kCal"
                />
                <MacroGridUnit
                    name="Protein"
                    amount={serving.protein * displayedQuantity}
                    unit="g"
                />
                <MacroGridUnit
                    name="Fat"
                    amount={serving.fat * displayedQuantity}
                    unit="g"
                />
                <MacroGridUnit
                    name="Carbs"
                    amount={serving.carbohydrate * displayedQuantity}
                    unit="g"
                />
            </div>
            <div className="card mt-3 w-full p-4">
                <FoodDetailRow
                    name="Serving Size"
                    value={serving.metricServingAmount * displayedQuantity}
                    unit={serving.metricServingUnit}
                />
                <FoodDetailRow
                    name="Total Fat"
                    value={serving.fat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Saturated Fat"
                    value={serving.saturatedFat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Trans Fat"
                    value={serving.transFat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Polyunsaturated Fat"
                    value={serving.polyunsaturatedFat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Monounsaturated Fat"
                    value={
                        parseFloat(serving.monounsaturatedFat) *
                        displayedQuantity
                    }
                    unit="g"
                />
                <FoodDetailRow
                    name="Total Carbohydrate"
                    value={serving.carbohydrate * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Dietary Fiber"
                    value={serving.fiber * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Sugar"
                    value={serving.sugar * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Added Sugar"
                    value={serving.addedSugar * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Protein"
                    value={serving.protein * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Cholesterol"
                    value={serving.cholesterol * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Sodium"
                    value={serving.sodium * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Potassium"
                    value={serving.potassium * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Iron"
                    value={serving.iron * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Calcium"
                    value={serving.calcium * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin A"
                    value={serving.vitaminA * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin C"
                    value={serving.vitaminC * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin D"
                    value={serving.vitaminD * displayedQuantity}
                    unit="g"
                />
            </div>
        </div>
    );
};
