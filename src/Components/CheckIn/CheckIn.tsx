import { type FC } from 'react';
import { TodoItem } from '../Home/TodoItem';
import { useShowBackButton } from '../Navigation/headerHooks';
import { Button } from '../Buttons/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { completeCheckIn, getUserCheckIn } from '../../api';
import { useHistory } from 'react-router-dom';

export const CheckIn: FC = () => {
    useShowBackButton();
    const queryClient = useQueryClient();
    const history = useHistory();

    const checkInQuery = useQuery(['CheckIn'], () => {
        return getUserCheckIn();
    });

    const finishCheckInMutation = useMutation(completeCheckIn, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['Dashboard']);
            await queryClient.invalidateQueries(['CheckIn']);
            history.goBack();
        },
    });

    return (
        <div className="container">
            <h1 className="text-secondary text-2xl font-bold">Check In</h1>
            <TodoItem
                name="Add your blood pressure"
                show
                checked={checkInQuery.data?.data.bloodPressureAdded ?? false}
                route="/body/blood-pressure"
            />
            <TodoItem
                name="Add your body measurements"
                show
                checked={checkInQuery.data?.data.bodyMeasurementsAdded ?? false}
                route="/body/body"
            />
            <TodoItem
                name="Add your progress Photos"
                show
                checked={checkInQuery.data?.data.progressPhotosAdded ?? false}
                route="/body/progress/upload"
            />
            <Button
                className="ml-1 flex w-full justify-center"
                onClick={() => finishCheckInMutation.mutate()}
            >
                Finish Check In
            </Button>
        </div>
    );
};
