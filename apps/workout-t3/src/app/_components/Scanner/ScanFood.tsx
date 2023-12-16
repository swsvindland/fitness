'use client';

import { FC } from 'react';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { LinkButton } from '../Buttons/LinkButton';
import { useRouter } from 'next/navigation';
import { api } from '~/trpc/react';

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
        return <LoadingSpinner />;
    }

    if (searchFoodQuery.data) {
        router.push(`/eat/food/${searchFoodQuery.data}`);
    }

    if (!searchFoodQuery.data) {
        return (
            <div>
                <h1 className="text-secondary text-2xl font-bold">
                    Food not found
                </h1>
                <p>{barcode}</p>
                <LinkButton to="/eat">Go Back</LinkButton>
            </div>
        );
    }

    return null;
};
