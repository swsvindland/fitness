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
                    amount={(serving.Calories ?? 0) * displayedQuantity}
                    unit="kCal"
                />
                <MacroGridUnit
                    name="Protein"
                    amount={(serving.Protein ?? 0) * displayedQuantity}
                    unit="g"
                />
                <MacroGridUnit
                    name="Fat"
                    amount={(serving.Fat ?? 0) * displayedQuantity}
                    unit="g"
                />
                <MacroGridUnit
                    name="Carbs"
                    amount={(serving.Carbohydrate ?? 0) * displayedQuantity}
                    unit="g"
                />
            </div>
            <div className="card mt-3 w-full p-4">
                <FoodDetailRow
                    name="Serving Size"
                    value={
                        (serving.MetricServingAmount ?? 0) * displayedQuantity
                    }
                    unit={serving.MetricServingUnit ?? ''}
                />
                <FoodDetailRow
                    name="Total Fat"
                    value={(serving.Fat ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Saturated Fat"
                    value={(serving.SaturatedFat ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Trans Fat"
                    value={(serving.TransFat ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Polyunsaturated Fat"
                    value={
                        (serving.PolyunsaturatedFat ?? 0) * displayedQuantity
                    }
                    unit="g"
                />
                <FoodDetailRow
                    name="Monounsaturated Fat"
                    value={
                        (serving.MonounsaturatedFat ?? 0) * displayedQuantity
                    }
                    unit="g"
                />
                <FoodDetailRow
                    name="Total Carbohydrate"
                    value={(serving.Carbohydrate ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Dietary Fiber"
                    value={(serving.Fiber ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Sugar"
                    value={(serving.Sugar ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Added Sugar"
                    value={(serving.AddedSugar ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Protein"
                    value={(serving.Protein ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Cholesterol"
                    value={(serving.Cholesterol ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Sodium"
                    value={(serving.Sodium ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Potassium"
                    value={(serving.Potassium ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Iron"
                    value={(serving.Iron ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Calcium"
                    value={(serving.Calcium ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin A"
                    value={(serving.VitaminA ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin C"
                    value={(serving.VitaminC ?? 0) * displayedQuantity}
                    unit="g"
                />
                <FoodDetailRow
                    name="Vitamin D"
                    value={(serving.VitaminD ?? 0) * displayedQuantity}
                    unit="g"
                />
            </div>
        </div>
    );
};
