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
import { Scanner } from '~/app/_components/Scanner/Scanner';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

interface FoodGridProps {
    meal: number;
}

export const FoodGrid: FC<FoodGridProps> = ({ meal }) => {
    const router = useRouter();

    const handleRowClick = (foodId?: bigint) => {
        if (!foodId) return;
        router.push(`/user-food/${foodId}/${meal}`);
    };

    const foodQuery = api.food.getAllUserFood.useQuery({
        meal,
        date: new Date().toDateString(),
    });

    const macros = api.macros.getMacrosPerMeal.useQuery({
        meal,
        date: new Date().toDateString(),
    });

    if (foodQuery.isLoading) {
        return <LoadingPage />;
    }

    if (!foodQuery.data) {
        return null;
    }

    const { Protein, Fat, Carbs } = macros.data ?? {
        Protein: 0,
        Fat: 0,
        Carbs: 0,
    };

    return (
        <div className="py-4">
            <div className="flex justify-between items-center pb-1">
                <div>
                    <h2 className="text-secondary text-lg">Meal: {meal}</h2>
                    <span>
                        P: {Protein.toFixed(0)} F: {Fat.toFixed(0)} C:{' '}
                        {Carbs.toFixed(0)}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Scanner />
                    <Button
                        color="primary"
                        isIconOnly
                        className="flex w-full justify-center"
                        href={`/add-food/${meal}`}
                        as={Link}
                    >
                        <PlusIcon className="w-6 h-6" />
                    </Button>
                </div>
            </div>
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
        </div>
    );
};
