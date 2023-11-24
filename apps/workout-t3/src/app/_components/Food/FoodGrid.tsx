import React, { FC } from 'react';
import { classNames } from '~/utils/classNames';
import { useQuery } from '@tanstack/react-query';
import { foodApiAuth, getUserFoods } from '@fitness/api-legacy';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { LoadingCard } from '../Loading/LoadingCard';
import { useRouter } from 'next/navigation';

export const FoodGrid: FC = () => {
    const router = useRouter();

    const handleRowClick = (foodId?: number) => {
        if (!foodId) return;
        router.push(`/eat/user-food/${foodId}`);
    };

    const foodApiAuthTokenQuery = useQuery(
        ['FatSecretAuth'],
        () => {
            return foodApiAuth();
        },
        {
            onSuccess: (data) => {
                sessionStorage.setItem('oldToken', data.data.accessToken);
            },
        }
    );

    const foodQuery = useQuery(['UserFood'], () => {
        return getUserFoods();
    });

    if (foodQuery.isLoading || foodApiAuthTokenQuery.isLoading) {
        return <LoadingSpinner />;
    }

    if (foodQuery.isLoading || foodApiAuthTokenQuery.isLoading) {
        return <LoadingCard isLoading />;
    }

    return (
        <div className="card rounded p-4 px-4 sm:px-6 lg:px-8">
            <div className="ring-ternary my-2 rounded ring-1 md:mx-0">
                <table className="divide-ternary min-w-full divide-y">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
                            >
                                Protein
                            </th>
                            <th
                                scope="col"
                                className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
                            >
                                Fat
                            </th>
                            <th
                                scope="col"
                                className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
                            >
                                Carbs
                            </th>
                            <th
                                scope="col"
                                className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
                            >
                                Calories
                            </th>
                            <th
                                scope="col"
                                className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
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
                                            : 'border-ternary border-t',
                                        'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                                    )}
                                >
                                    <div className="text-secondary font-medium">
                                        {food?.foodV2?.name}
                                    </div>
                                    <div className="text-ternary mt-1 flex flex-col lg:hidden">
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
                                            {(
                                                (food.serving?.calories ?? 0) *
                                                food.servingAmount
                                            ).toFixed(2)}{' '}
                                            Calories
                                        </span>
                                        <span>
                                            {food.servingAmount?.toFixed(2)}{' '}
                                            Servings
                                        </span>
                                    </div>
                                    {foodIdx !== 0 ? (
                                        <div className="bg-ternary absolute -top-px left-6 right-0 h-px" />
                                    ) : null}
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-ternary border-t',
                                        'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
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
                                            : 'border-ternary border-t',
                                        'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
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
                                            : 'border-ternary border-t',
                                        'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
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
                                            : 'border-ternary border-t',
                                        'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
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
                                            : 'border-ternary border-t',
                                        'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
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
