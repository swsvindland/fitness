import { MacroGridUnit } from '../Macros/MacroGridUnit';
import { FoodDetailRow } from './FoodDetailRow';
import { FC } from 'react';
import { FoodV2Serving } from '@fitness/types';

interface IProps {
    serving: FoodV2Serving;
    displayedQuantity: number;
}
export const NutritionLabel: FC<IProps> = ({ serving, displayedQuantity }) => {
    return (
        <div className="w-full">
            <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
                <MacroGridUnit
                    name="Calories"
                    amount={serving.Calories * displayedQuantity}
                    unit="kCal"
                />
                <MacroGridUnit
                    name="Protein"
                    amount={serving.Protein * displayedQuantity}
                    unit="g"
                />
                <MacroGridUnit
                    name="Fat"
                    amount={serving.Fat * displayedQuantity}
                    unit="g"
                />
                <MacroGridUnit
                    name="Carbs"
                    amount={serving.Carbohydrate * displayedQuantity}
                    unit="g"
                />
            </div>
            <div className="card mt-3 w-full p-4">
                <FoodDetailRow
                    name="Serving Size"
                    value={serving.MetricServingAmount * displayedQuantity}
                    unit={serving.MetricServingUnit}
                />
                <FoodDetailRow
                    name="Total Fat"
                    value={serving.Fat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Saturated Fat"
                    value={serving.SaturatedFat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Trans Fat"
                    value={serving.TransFat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Polyunsaturated Fat"
                    value={serving.PolyunsaturatedFat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Monounsaturated Fat"
                    value={serving.MonounsaturatedFat * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Total Carbohydrate"
                    value={serving.Carbohydrate * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Dietary Fiber"
                    value={serving.Fiber * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Sugar"
                    value={serving.Sugar * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Added Sugar"
                    value={serving.AddedSugar * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Protein"
                    value={serving.Protein * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Cholesterol"
                    value={serving.Cholesterol * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Sodium"
                    value={serving.Sodium * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Potassium"
                    value={serving.Potassium * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Iron"
                    value={serving.Iron * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Calcium"
                    value={serving.Calcium * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin A"
                    value={serving.VitaminA * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin C"
                    value={serving.VitaminC * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin D"
                    value={serving.VitaminD * displayedQuantity}
                    unit="g"
                />
            </div>
        </div>
    );
};
