'use client';

import { FC, useState } from 'react';
import { FoodSearch } from './FoodSearch';
import { AddFoodCard } from './AddFoodCard';
import { LoadingListOfCards } from '../Loading/LoadingListOfCards';
import { api } from '~/trpc/react';

export const AddFood: FC = () => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const searchFoodQuery = api.food.searchFood.useQuery({
        query: selected ?? null,
    });
    const recentlyEaten = api.food.getRecentUserFoods.useQuery();

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
            <LoadingListOfCards isLoading={recentlyEaten.isLoading} />
            <div className="w-full">
                {!recentlyEaten.data ? null : (
                    <h2 className="text-secondary mt-2 text-lg">
                        Recently Eaten
                    </h2>
                )}
                {!recentlyEaten.data ? (
                    <div className="flex items-center justify-between text-center" />
                ) : (
                    recentlyEaten.data?.map((food, index) => (
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
