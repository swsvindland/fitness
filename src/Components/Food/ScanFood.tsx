import { useParams, useHistory } from 'react-router-dom';
import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchFood } from '../../api';
import { Loading } from '../Loading';
import { LinkButton } from '../Buttons/LinkButton';

export const ScanFood: FC = () => {
    const { barcode } = useParams<{ barcode: string }>();
    const history = useHistory();

    const searchFoodQuery = useQuery(['SearchFood', barcode], () => {
        if (!barcode) return;
        return searchFood('', barcode);
    });

    if (!barcode) {
        history.goBack();
    }

    if (searchFoodQuery.isLoading) {
        return <Loading />;
    }

    if ((searchFoodQuery.data?.data.length ?? 0) >= 0) {
        history.push(`/eat/food/${searchFoodQuery.data?.data[0].foodId}`);
    }

    if (searchFoodQuery.data?.data.length === 0) {
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
