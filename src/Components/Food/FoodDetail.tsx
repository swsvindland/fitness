import { FC } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getFoodDetails } from '../../api';
import { Loading } from '../Loading';
import { EdamamTotalNutrients } from '../../types/EdamamFoodDetails';

export const FoodDetail: FC = () => {
    const { foodId } = useParams<{ foodId: string }>();

    const foodDetailsQuery = useQuery(['FoodDetails', foodId], () => {
        if (!foodId) return;
        return getFoodDetails(foodId);
    });

    const totalNutrients = foodDetailsQuery.data?.data?.totalNutrients;

    if (foodDetailsQuery.isLoading || !totalNutrients) {
        return <Loading />;
    }

    return (
        <div>
            <div className="flex flex-col justify-center rounded bg-card p-4">
                {Object.keys(totalNutrients).map((key) => (
                    <div
                        key={key}
                        className="grid grid-cols-3 border-secondary border-t border-x last:border-b p-1"
                    >
                        <div className="text-secondary">
                            {
                                totalNutrients[
                                    key as keyof EdamamTotalNutrients
                                ].label
                            }
                        </div>
                        <div className="text-ternary ml-auto">
                            {
                                totalNutrients[
                                    key as keyof EdamamTotalNutrients
                                ].quantity
                            }
                        </div>
                        <div className="text-ternary ml-auto">
                            {
                                totalNutrients[
                                    key as keyof EdamamTotalNutrients
                                ].unit
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
