import { FC, useState } from 'react';
import { FoodSearch } from './FoodSearch';
import { useQuery } from '@tanstack/react-query';
import { getRecentUserFoods, searchFood } from '../../api';
import { Loading } from '../Loading';
import { Link } from 'react-router-dom';
import { useShowBackButton } from '../Navigation/headerHooks';

export const AddFood: FC = () => {
    useShowBackButton();
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string | undefined>(undefined);

    const searchFoodQuery = useQuery(['SearchFood', selected], () => {
        if (!selected) return;
        return searchFood(selected, 0);
    });

    const recentlyEaten = useQuery(['RecentUserFoods'], () => {
        return getRecentUserFoods();
    });

    if (searchFoodQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="max-w-2xl w-full grid grid-cols-1">
            <div className="card p-4">
                <FoodSearch
                    query={query}
                    setQuery={setQuery}
                    setSelected={setSelected}
                />
            </div>
            <div className="max-w-2xl w-full">
                {!searchFoodQuery.data?.data && selected ? (
                    <div className="flex justify-between items-center text-center">
                        <span className="text-ternary">No Results</span>
                    </div>
                ) : (
                    searchFoodQuery.data?.data.map((food, foodIdx) => (
                        <Link
                            to={`/eat/food/${food.foodId}`}
                            className="card my-2 flex flex-col p-4"
                        >
                            <span className="text-lg text-secondary">
                                {food.foodName}
                            </span>
                            <span className="text-md text-ternary">
                                {food.foodDescription}
                            </span>
                        </Link>
                    ))
                )}
            </div>
            <div className="max-w-2xl w-full">
                {!recentlyEaten.data?.data ? null : (
                    <h2 className="mt-2 text-lg text-secondary">
                        Recently Eaten
                    </h2>
                )}
                {!recentlyEaten.data?.data ? (
                    <div className="flex justify-between items-center text-center" />
                ) : (
                    recentlyEaten.data?.data.map((food) => (
                        <Link
                            to={`/eat/food/${food.foodV2Id}`}
                            className="card my-2 flex flex-col p-4"
                        >
                            <span className="text-lg text-secondary">
                                {food.foodV2?.name}
                            </span>
                            <span className="text-md text-ternary">
                                {food.serving?.servingDescription}
                            </span>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};
