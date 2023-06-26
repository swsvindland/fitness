import React, { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';
import { SecondaryButton } from './Buttons/SecondaryButton';
import { Button } from './Buttons/Button';

export const ActionButtons: FC = () => {
    const queryClient = useQueryClient();
    const history = useHistory();

    const handleStartScan = () => {
        history.push('/scanner');
    };

    const handleAddFood = async () => {
        await queryClient.invalidateQueries(['RecentUserFoods']);
        history.push('/eat/add-food');
    };

    return (
        <div className="fixed bottom-24 right-0">
            <SecondaryButton className="mx-1" onClick={handleStartScan}>
                Scan Barcode
            </SecondaryButton>
            <Button className="mx-1" onClick={handleAddFood}>
                Add Food
            </Button>
        </div>
    );
};
