'use client';

import { FC, useEffect, useState } from 'react';
import { FoodSearch } from './FoodSearch';
import { AddFoodCard } from './AddFoodCard';
import { api } from '~/trpc/react';
import { LoadingListOfCards } from '@fitness/ui';

const sameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

export const AddFood: FC = () => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const [recentlyEaten, setRecentlyEaten] = useState<any[]>([]);

    const searchFoodQuery = api.food.searchFood.useQuery({
        query: selected ?? null,
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
        <div className="container grid grid-cols-1">
            <div className="card p-4">
                <FoodSearch
                    query={query}
                    setQuery={setQuery}
                    setSelected={setSelected}
                    selected={selected}
                />
            </div>
            <div className="w-full">
                <LoadingListOfCards isLoading={searchFoodQuery.isLoading} />
                {!searchFoodQuery.data && selected ? (
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
                        />
                    ))
                )}
            </div>
            <LoadingListOfCards isLoading={recentlyEatenQuery.isLoading} />
            <div className="w-full">
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
                        />
                    ))
                )}
            </div>
        </div>
    );
};
