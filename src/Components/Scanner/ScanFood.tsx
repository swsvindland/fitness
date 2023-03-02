import { useParams, useHistory } from 'react-router-dom';
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchFoodByBarcode } from '../../api';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { LinkButton } from '../Buttons/LinkButton';

export const ScanFood: FC = () => {
    const { barcode } = useParams<{ barcode: string }>();
    const history = useHistory();

    const searchFoodQuery = useQuery(['SearchFoodByBarcode', barcode], () => {
        if (!barcode) return;
        return searchFoodByBarcode(barcode);
    });

    if (!barcode) {
        history.goBack();
    }

    if (searchFoodQuery.isLoading) {
        return <LoadingSpinner />;
    }

    if (searchFoodQuery.data?.data.id) {
        history.push(`/eat/food/${searchFoodQuery.data?.data.id}`);
    }

    if (!searchFoodQuery.data?.data) {
        return (
            <div>
                <h1 className="text-2xl font-bold text-secondary">
                    Food not found
                </h1>
                <p>{barcode}</p>
                <LinkButton to="/eat">Go Back</LinkButton>
            </div>
        );
    }

    return null;
};
