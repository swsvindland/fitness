import { format } from 'date-fns';
import { TextField } from '../../TextFields/TextField';
import { Units } from '@fitness/types';
import { LoadingSpinner } from '../../Loading/LoadingSpinner';
import { CircleCheckSolid } from '../../Icons/CircleCheckSolid';
import { FC, useContext, useState } from 'react';
import { AuthContext } from '../../Auth/Auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserWeight, updateUserWeight } from '@fitness/api';
import { CircleXMark } from '../../Icons/CircleXMark';

interface IProps {
    id: number;
    date: string;
    defaultWeight: number;
}

export const AllWeightCard: FC<IProps> = ({ id, date, defaultWeight }) => {
    const { user } = useContext(AuthContext);
    const [weight, setWeight] = useState<string>(defaultWeight.toString());
    const [saved, setSaved] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const updateMutation = useMutation(updateUserWeight, {
        onSuccess: () => {
            setSaved(true);
        },
    });

    const deleteMutation = useMutation(deleteUserWeight, {
        onSuccess: () => {
            queryClient.invalidateQueries(['UserWeights']);
        },
    });

    return (
        <div className="card my-2 p-4">
            <span className="text-secondary text-lg">
                {format(new Date(date ?? ''), 'PP')}
            </span>
            <hr className="border-secondary" />
            <div className="flex flex-row">
                <div className="border-secondary flex flex-1 border-r p-2">
                    <TextField
                        id={`user-weight-${date}`}
                        value={weight}
                        type="number"
                        inputMode="decimal"
                        onChange={(event) => {
                            setWeight(event.target.value);
                        }}
                        className="my-auto"
                    />
                    <span className="text-ternary mx-2 my-auto text-xs">
                        {user?.unit === Units.Imperial ? 'lbs' : 'kg'}
                    </span>
                </div>
                <div className="flex flex-none">
                    <div className="border-secondary inline-flex w-16 flex-1 items-center justify-center border-r py-4 text-sm font-medium">
                        <button
                            className="h-8 w-8"
                            onClick={() => {
                                updateMutation.mutate({
                                    id,
                                    userId: user?.id ?? '',
                                    weight: parseFloat(weight),
                                    created: date,
                                });
                            }}
                        >
                            {updateMutation.isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <CircleCheckSolid
                                    className={
                                        saved
                                            ? 'fill-secondary'
                                            : 'border-ternary rounded-full border fill-transparent'
                                    }
                                />
                            )}
                        </button>
                    </div>
                    <div className="inline-flex w-16 flex-1 items-center justify-center py-4 text-sm font-medium">
                        <button
                            className="h-8 w-8"
                            onClick={() => {
                                deleteMutation.mutate(id);
                            }}
                        >
                            {deleteMutation.isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <CircleXMark className="fill-error" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
