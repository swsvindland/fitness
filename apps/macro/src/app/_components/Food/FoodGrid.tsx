'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { LoadingCard, LoadingSpinner } from '@fitness/ui';
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';

export const FoodGrid: FC = () => {
    const router = useRouter();

    const handleRowClick = (foodId?: bigint) => {
        if (!foodId) return;
        router.push(`/eat/user-food/${foodId}`);
    };

    const foodQuery = api.food.getAllUserFood.useQuery({
        date: new Date().toDateString(),
    });

    if (foodQuery.isLoading) {
        return <LoadingSpinner />;
    }

    if (!foodQuery.data) {
        return null;
    }

    return (
        <Table>
            <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>Calories</TableColumn>
                <TableColumn>Macros</TableColumn>
            </TableHeader>
            <TableBody>
                {foodQuery.data.map((food, foodIdx) => (
                    <TableRow key={foodIdx}>
                        <TableCell>
                            {food.FoodV2.Name} ({food.ServingAmount})
                        </TableCell>
                        <TableCell>{food.FoodV2Serving.Calories}</TableCell>
                        <TableCell>
                            P {food.FoodV2Serving.Protein} F
                            {food.FoodV2Serving.Fat} C
                            {food.FoodV2Serving.Carbohydrate}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

// return (
//     <div className="card rounded p-4 px-4 sm:px-6 lg:px-8">
//         <div className="ring-ternary my-2 rounded ring-1 md:mx-0">
//             <table className="divide-ternary min-w-full divide-y">
//                 <thead>
//                     <tr>
//                         <th
//                             scope="col"
//                             className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
//                         >
//                             Name
//                         </th>
//                         <th
//                             scope="col"
//                             className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
//                         >
//                             Protein
//                         </th>
//                         <th
//                             scope="col"
//                             className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
//                         >
//                             Fat
//                         </th>
//                         <th
//                             scope="col"
//                             className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
//                         >
//                             Carbs
//                         </th>
//                         <th
//                             scope="col"
//                             className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
//                         >
//                             Calories
//                         </th>
//                         <th
//                             scope="col"
//                             className="text-secondary hidden px-3 py-3.5 text-left text-sm font-semibold lg:table-cell"
//                         >
//                             Servings
//                         </th>
//                         <th
//                             scope="col"
//                             className="relative py-3.5 pl-3 pr-4 sm:pr-6"
//                         >
//                             <span className="sr-only">Select</span>
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {foodQuery.data?.map((food, foodIdx) => (
//                         <tr key={food.Id} className="">
//                             <td
//                                 onClick={() => handleRowClick(food.Id)}
//                                 className={classNames(
//                                     foodIdx === 0
//                                         ? ''
//                                         : 'border-ternary border-t',
//                                     'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
//                                 )}
//                             >
//                                 <div className="text-secondary font-medium">
//                                     {food?.FoodV2?.Name}
//                                 </div>
//                                 <div className="text-ternary mt-1 flex flex-col lg:hidden">
//                                     <span>
//                                         Protein:{' '}
//                                         {(
//                                             (food.FoodV2Serving?.Protein ??
//                                                 0) * food.ServingAmount
//                                         ).toFixed(2)}
//                                         g
//                                     </span>
//                                     <span>
//                                         Fat:{' '}
//                                         {(
//                                             (food.FoodV2Serving?.Fat ?? 0) *
//                                             food.ServingAmount
//                                         )?.toFixed(2)}
//                                         g
//                                     </span>
//                                     <span>
//                                         Carbs:{' '}
//                                         {(
//                                             (food.FoodV2Serving
//                                                 ?.Carbohydrate ?? 0) *
//                                             food.ServingAmount
//                                         )?.toFixed(2)}
//                                         g
//                                     </span>
//                                     <span>
//                                         {(
//                                             (food.FoodV2Serving?.Calories ??
//                                                 0) * food.ServingAmount
//                                         ).toFixed(2)}{' '}
//                                         Calories
//                                     </span>
//                                     <span>
//                                         {food.ServingAmount?.toFixed(2)}{' '}
//                                         Servings
//                                     </span>
//                                 </div>
//                                 {foodIdx !== 0 ? (
//                                     <div className="bg-ternary absolute -top-px left-6 right-0 h-px" />
//                                 ) : null}
//                             </td>
//                             <td
//                                 className={classNames(
//                                     foodIdx === 0
//                                         ? ''
//                                         : 'border-ternary border-t',
//                                     'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
//                                 )}
//                             >
//                                 {(
//                                     (food.FoodV2Serving?.Protein ?? 0) *
//                                     food.ServingAmount
//                                 )?.toFixed(2)}
//                                 g
//                             </td>
//                             <td
//                                 className={classNames(
//                                     foodIdx === 0
//                                         ? ''
//                                         : 'border-ternary border-t',
//                                     'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
//                                 )}
//                             >
//                                 {(
//                                     (food.FoodV2Serving?.Fat ?? 0) *
//                                     food.ServingAmount
//                                 )?.toFixed(2)}
//                                 g
//                             </td>
//                             <td
//                                 className={classNames(
//                                     foodIdx === 0
//                                         ? ''
//                                         : 'border-ternary border-t',
//                                     'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
//                                 )}
//                             >
//                                 {(
//                                     (food.FoodV2Serving?.Carbohydrate ??
//                                         0) * food.ServingAmount
//                                 )?.toFixed(2)}
//                                 g
//                             </td>
//                             <td
//                                 className={classNames(
//                                     foodIdx === 0
//                                         ? ''
//                                         : 'border-ternary border-t',
//                                     'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
//                                 )}
//                             >
//                                 {(
//                                     (food.FoodV2Serving?.Calories ?? 0) *
//                                     food.ServingAmount
//                                 )?.toFixed(2)}
//                                 Cal
//                             </td>
//                             <td
//                                 className={classNames(
//                                     foodIdx === 0
//                                         ? ''
//                                         : 'border-ternary border-t',
//                                     'text-ternary hidden px-3 py-3.5 text-sm lg:table-cell'
//                                 )}
//                             >
//                                 {food.ServingAmount?.toFixed(2)} Servings
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     </div>
// );
