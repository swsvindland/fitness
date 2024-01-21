'use client';

import { FC, useEffect, useState } from 'react';
import { FieldState, FoodSearch } from './FoodSearch';
import { AddFoodCard } from './AddFoodCard';
import { api } from '~/trpc/react';
import { LoadingListOfCards } from '@fitness/ui';

const sameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

interface AddFoodProps {
    meal: number;
}

export const AddFood: FC<AddFoodProps> = ({ meal }) => {
    const [fieldState, setFieldState] = useState<FieldState>({
        selectedKey: '',
        inputValue: '',
    });

    const [recentlyEaten, setRecentlyEaten] = useState<any[]>([]);

    const searchFoodQuery = api.food.searchFood.useQuery({
        query: fieldState.selectedKey ?? null,
    });
    const recentlyEatenQuery = api.food.getRecentUserFoods.useQuery();

    useEffect(() => {
        if (recentlyEatenQuery.data) {
            const seen = new Map<string, any>();

            recentlyEatenQuery.data.forEach((food) => {
                if (!food.Created) return food;

                if (!seen.has(food.FoodV2.Name)) {
                    if (sameDay(food.Created, new Date())) {
                        seen.set(food.FoodV2.Name, food);
                    } else {
                        seen.set(food.FoodV2.Name, {
                            ...food,
                            ServingAmount: 0,
                        });
                    }
                }
            });

            setRecentlyEaten(Array.from(seen.values()));
        }
    }, [recentlyEatenQuery.data]);

    return (
        <div className="container grid grid-cols-1 gap-4">
            <FoodSearch field={fieldState} setField={setFieldState} />
            <div className="flex w-full flex-col gap-2">
                <LoadingListOfCards isLoading={searchFoodQuery.isLoading} />
                {!searchFoodQuery.data && fieldState.selectedKey ? (
                    <div className="flex items-center justify-between text-center">
                        <span className="text-ternary">No Results</span>
                    </div>
                ) : (
                    searchFoodQuery.data?.map((food) => (
                        <AddFoodCard
                            key={food.food_id}
                            foodId={Number(food.food_id)}
                            name={food.food_name}
                            brandName={food.brand_name ?? 'generic'}
                            servingSize={
                                food.servings.serving[0]?.serving_description ??
                                ''
                            }
                            meal={meal}
                        />
                    ))
                )}
            </div>
            <LoadingListOfCards isLoading={recentlyEatenQuery.isLoading} />
            <div className="flex w-full flex-col gap-2">
                {!recentlyEaten ? null : (
                    <h2 className="text-secondary mt-2 text-lg">
                        Recently Eaten
                    </h2>
                )}
                {!recentlyEaten ? (
                    <div className="flex items-center justify-between text-center" />
                ) : (
                    recentlyEaten?.map((food) => (
                        <AddFoodCard
                            key={food.Id}
                            userFoodId={Number(food.Id)}
                            foodId={Number(food.FoodV2Id)}
                            name={food.FoodV2?.Name ?? ''}
                            brandName={food.FoodV2?.Brand ?? 'generic'}
                            servingSize={
                                food.FoodV2Serving?.ServingDescription ?? ''
                            }
                            defaultServings={food.ServingAmount}
                            meal={meal}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
