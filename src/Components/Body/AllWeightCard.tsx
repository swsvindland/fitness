import { format } from 'date-fns';
import { TextField } from '../TextFields/TextField';
import { Units } from '../../types/user';
import { Loading } from '../Loading';
import { CircleCheckSolid } from '../Icons/CircleCheckSolid';
import { FC, useContext, useState } from 'react';
import { AuthContext } from '../Auth/Auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserWeight, updateUserWeight } from '../../api';
import { CircleXMark } from '../Icons/CircleXMark';

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
        <div className="card p-4 my-2">
            <span className="text-lg text-secondary">
                {format(new Date(date ?? ''), 'PP')}
            </span>
            <hr className="border-secondary" />
            <div className="flex flex-row">
                <div className="flex-1 flex border-r border-secondary p-2">
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
                    <span className="mx-2 my-auto text-ternary text-xs">
                        {user?.unit === Units.Imperial ? 'lbs' : 'kg'}
                    </span>
                </div>
                <div className="flex-none flex">
                    <div className="w-16 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium border-r border-secondary">
                        <button
                            className="w-8 h-8"
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
                                <Loading />
                            ) : (
                                <CircleCheckSolid
                                    className={
                                        saved
                                            ? 'fill-secondary'
                                            : 'fill-transparent border-ternary border rounded-full'
                                    }
                                />
                            )}
                        </button>
                    </div>
                    <div className="w-16 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium">
                        <button
                            className="w-8 h-8"
                            onClick={() => {
                                deleteMutation.mutate(id);
                            }}
                        >
                            {deleteMutation.isLoading ? (
                                <Loading />
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
