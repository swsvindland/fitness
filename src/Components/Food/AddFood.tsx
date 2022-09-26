import { FC, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { FoodAutocomplete } from './FoodAutocomplete';
import { useQuery } from '@tanstack/react-query';
import { searchFood } from '../../api';
import { Loading } from '../Loading';
import { useHistory } from 'react-router';

export const AddFood: FC = () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    const history = useHistory();

    const searchFoodQuery = useQuery(['SearchFood', selected], () => {
        if (!selected) return;
        return searchFood(selected);
    });

    const handleRowClick = (foodId: string) => {
        history.push(`/eat/food/${foodId}`);
    };

    if (searchFoodQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <FoodAutocomplete setSelected={setSelected} />
            <div className="ring-1 ring-ternary md:mx-0 rounded my-2">
                <table className="min-w-full divide-y divide-ternary">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Protein
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Fat
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Carbs
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Calories
                            </th>
                            <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                                <span className="sr-only">Select</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchFoodQuery.data?.data.map((food, foodIdx) => (
                            <tr
                                key={food.foodId}
                                onClick={() => handleRowClick(food.foodId)}
                            >
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-transparent',
                                        'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                    )}
                                >
                                    <div className="font-medium text-secondary">
                                        {food.label}
                                    </div>
                                    <div className="mt-1 flex flex-col text-ternary lg:hidden">
                                        <span>
                                            Protein: {food.nutrients.PROCNT}g
                                        </span>
                                        <span>Fat: {food.nutrients.FAT}g</span>
                                        <span>
                                            Carbs: {food.nutrients.CHOCDF}g
                                        </span>
                                        <span>{food.nutrients.ENERC_KCAL}</span>
                                    </div>
                                    {foodIdx !== 0 ? (
                                        <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                                    ) : null}
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {food.nutrients.PROCNT}g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {food.nutrients.FAT}g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {food.nutrients.CHOCDF}g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'px-3 py-3.5 text-sm text-ternary'
                                    )}
                                >
                                    <div className="hidden sm:block">
                                        {food.nutrients.ENERC_KCAL} Calories
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};