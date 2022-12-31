import { FC } from 'react';
import { LinkButton } from '../Buttons/LinkButton';
import { classNames } from '../../utils/classNames';
import { useQuery } from '@tanstack/react-query';
import { getUserFoods } from '../../api';
import { Loading } from '../Loading';
import { useHistory } from 'react-router-dom';

export const FoodGrid: FC = () => {
    const history = useHistory();

    const handleRowClick = (foodId?: number) => {
        if (!foodId) return;
        history.push(`/eat/user-food/${foodId}`);
    };

    // const handleStartScan = () => {
    //     history.push('/scanner');
    // };

    const foodQuery = useQuery(['Food'], () => {
        return getUserFoods();
    });

    if (foodQuery.isLoading) {
        return <Loading />;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 card rounded m-1 p-4">
            <div className="flex flex-row justify-end">
                {/*<SecondaryButton className="mx-1" onClick={handleStartScan}>*/}
                {/*    Scan Barcode*/}
                {/*</SecondaryButton>*/}
                <LinkButton to="/eat/add-food" className="mx-1">
                    Add Food
                </LinkButton>
            </div>
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
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Servings
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
                        {foodQuery.data?.data?.map((food, foodIdx) => (
                            <tr key={food.id} className="">
                                <td
                                    onClick={() => handleRowClick(food.id)}
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-ternary',
                                        'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                    )}
                                >
                                    <div className="font-medium text-secondary">
                                        {food?.foodV2?.name}
                                    </div>
                                    <div className="mt-1 flex flex-col text-ternary lg:hidden">
                                        <span>
                                            Protein:{' '}
                                            {(
                                                (food.serving?.protein ?? 0) *
                                                food.servingAmount
                                            ).toFixed(2)}
                                            g
                                        </span>
                                        <span>
                                            Fat:{' '}
                                            {(
                                                (food.serving?.fat ?? 0) *
                                                food.servingAmount
                                            )?.toFixed(2)}
                                            g
                                        </span>
                                        <span>
                                            Carbs:{' '}
                                            {(
                                                (food.serving?.carbohydrate ??
                                                    0) * food.servingAmount
                                            )?.toFixed(2)}
                                            g
                                        </span>
                                        <span>
                                            {food.serving?.calories?.toFixed(2)}{' '}
                                            Calories
                                        </span>
                                        <span>
                                            {food.servingAmount?.toFixed(2)}{' '}
                                            Servings
                                        </span>
                                    </div>
                                    {foodIdx !== 0 ? (
                                        <div className="absolute right-0 left-6 -top-px h-px bg-ternary" />
                                    ) : null}
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-ternary',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {(
                                        (food.serving?.protein ?? 0) *
                                        food.servingAmount
                                    )?.toFixed(2)}
                                    g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-ternary',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {(
                                        (food.serving?.fat ?? 0) *
                                        food.servingAmount
                                    )?.toFixed(2)}
                                    g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-ternary',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {(
                                        (food.serving?.carbohydrate ?? 0) *
                                        food.servingAmount
                                    )?.toFixed(2)}
                                    g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-ternary',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {(
                                        (food.serving?.calories ?? 0) *
                                        food.servingAmount
                                    )?.toFixed(2)}
                                    Cal
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-ternary',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {food.servingAmount?.toFixed(2)} Servings
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
