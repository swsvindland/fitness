'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';
import { Button } from '@nextui-org/button';
import { LoadingPage } from '@fitness/ui';

interface Props {
    barcode: string;
}

export const ScanFood: FC<Props> = ({ barcode }) => {
    const router = useRouter();

    const searchFoodQuery = api.food.searchFoodByBarcode.useQuery({
        barcode,
    });

    if (!barcode) {
        router.back();
    }

    if (searchFoodQuery.isLoading) {
        return <LoadingPage />;
    }

    if (searchFoodQuery.data) {
        router.push(`/food/${searchFoodQuery.data}`);
    }

    if (!searchFoodQuery.data) {
        return (
            <div>
                <h1 className="text-secondary text-2xl font-bold">
                    Food not found
                </h1>
                <p>{barcode}</p>
                <Button href="/eat">Go Back</Button>
            </div>
        );
    }

    return null;
};
