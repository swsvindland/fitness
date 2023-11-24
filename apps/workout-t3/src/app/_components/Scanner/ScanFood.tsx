'use client';

import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchFoodByBarcode } from '@fitness/api-legacy';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { LinkButton } from '../Buttons/LinkButton';
import { useRouter } from 'next/navigation';

interface Props {
    barcode: string;
}

export const ScanFood: FC<Props> = ({ barcode }) => {
    const router = useRouter();

    const searchFoodQuery = useQuery(['SearchFoodByBarcode', barcode], () => {
        if (!barcode) return;
        return searchFoodByBarcode(barcode);
    });

    if (!barcode) {
        router.back();
    }

    if (searchFoodQuery.isLoading) {
        return <LoadingSpinner />;
    }

    if (searchFoodQuery.data?.data.id) {
        router.push(`/eat/food/${searchFoodQuery.data?.data.id}`);
    }

    if (!searchFoodQuery.data?.data) {
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
