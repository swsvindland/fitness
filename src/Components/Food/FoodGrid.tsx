import { FC } from 'react';
import { FoodAutocomplete } from './FoodAutocomplete';

const plans = [
    {
        id: 1,
        name: 'Apple',
        protein: 1,
        fat: 0,
        carbs: 100,
        calories: 100,
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export const FoodGrid: FC = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8 bg-card rounded m-1 p-4">
            <FoodAutocomplete />
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
                        {plans.map((plan, planIdx) => (
                            <tr key={plan.id}>
                                <td
                                    className={classNames(
                                        planIdx === 0
                                            ? ''
                                            : 'border-t border-transparent',
                                        'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                    )}
                                >
                                    <div className="font-medium text-secondary">
                                        {plan.name}
                                    </div>
                                    <div className="mt-1 flex flex-col text-ternary lg:hidden">
                                        <span>Protein: {plan.protein}g</span>
                                        <span>Fat: {plan.fat}g</span>
                                        <span>Carbs: {plan.carbs}g</span>
                                        <span>{plan.calories}</span>
                                    </div>
                                    {planIdx !== 0 ? (
                                        <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                                    ) : null}
                                </td>
                                <td
                                    className={classNames(
                                        planIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {plan.protein}g
                                </td>
                                <td
                                    className={classNames(
                                        planIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {plan.fat}g
                                </td>
                                <td
                                    className={classNames(
                                        planIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {plan.carbs}g
                                </td>
                                <td
                                    className={classNames(
                                        planIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'px-3 py-3.5 text-sm text-ternary'
                                    )}
                                >
                                    <div className="hidden sm:block">
                                        {plan.calories} Calories
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
