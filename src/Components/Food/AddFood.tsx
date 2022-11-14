import { FC, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { FoodSearch } from './FoodSearch';
import { useQuery } from '@tanstack/react-query';
import { searchFood } from '../../api';
import { Loading } from '../Loading';
import { useHistory } from 'react-router-dom';
import { useShowBackButton } from '../Navigation/headerHooks';

export const AddFood: FC = () => {
    useShowBackButton();
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
        <div className="bg-card p-4 rounded max-w-3xl w-full">
            <FoodSearch setSelected={setSelected} />
            <div className="ring-1 ring-ternary md:mx-0 rounded my-2">
                <table className="divide-y divide-ternary">
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
                        {!searchFoodQuery.data?.data && selected ? (
                            <tr className="flex justify-between items-center text-center">
                                <span className="text-ternary">No Results</span>
                            </tr>
                        ) : (
                            searchFoodQuery.data?.data.map((hint, foodIdx) => (
                                <tr
                                    key={hint.food.foodId}
                                    onClick={() =>
                                        handleRowClick(hint.food.foodId)
                                    }
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
                                            {hint.food.label}
                                        </div>
                                        <div className="mt-1 flex flex-col text-ternary lg:hidden">
                                            <span>
                                                Protein:{' '}
                                                {hint.food.nutrients.PROCNT?.toFixed(
                                                    2
                                                )}
                                                g
                                            </span>
                                            <span>
                                                Fat:{' '}
                                                {hint.food.nutrients.FAT?.toFixed(
                                                    2
                                                )}
                                                g
                                            </span>
                                            <span>
                                                Carbs:{' '}
                                                {hint.food.nutrients.CHOCDF?.toFixed(
                                                    2
                                                )}
                                                g
                                            </span>
                                            <span>
                                                {hint.food.nutrients.ENERC_KCAL?.toFixed(
                                                    2
                                                )}
                                            </span>
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
                                        {hint.food.nutrients.PROCNT?.toFixed(2)}
                                        g
                                    </td>
                                    <td
                                        className={classNames(
                                            foodIdx === 0
                                                ? ''
                                                : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                        )}
                                    >
                                        {hint.food.nutrients.FAT?.toFixed(2)}g
                                    </td>
                                    <td
                                        className={classNames(
                                            foodIdx === 0
                                                ? ''
                                                : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                        )}
                                    >
                                        {hint.food.nutrients.CHOCDF?.toFixed(2)}
                                        g
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
                                            {hint.food.nutrients.ENERC_KCAL?.toFixed(
                                                2
                                            )}{' '}
                                            Calories
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
