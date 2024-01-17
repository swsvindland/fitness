'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { LoadingPage } from '@fitness/ui';

export const FoodGrid: FC = () => {
    const router = useRouter();

    const handleRowClick = (foodId?: bigint) => {
        if (!foodId) return;
        router.push(`/user-food/${foodId}`);
    };

    const foodQuery = api.food.getAllUserFood.useQuery({
        date: new Date().toDateString(),
    });

    if (foodQuery.isLoading) {
        return <LoadingPage />;
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
                    <TableRow
                        key={foodIdx}
                        onClick={() => handleRowClick(food.Id)}
                    >
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
