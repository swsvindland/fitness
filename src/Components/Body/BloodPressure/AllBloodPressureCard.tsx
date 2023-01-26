import { format } from 'date-fns';
import { TextField } from '../../TextFields/TextField';
import { Loading } from '../../Loading';
import { CircleCheckSolid } from '../../Icons/CircleCheckSolid';
import { FC, useContext, useState } from 'react';
import { AuthContext } from '../../Auth/Auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserBloodPressure, updateUserBloodPressure } from '../../../api';
import { CircleXMark } from '../../Icons/CircleXMark';

interface IProps {
    id: number;
    date: string;
    defaultSystolic: number;
    defaultDiastolic: number;
}

export const AllBloodPressureCard: FC<IProps> = ({
    id,
    date,
    defaultSystolic,
    defaultDiastolic,
}) => {
    const { user } = useContext(AuthContext);
    const [systolic, setSystolic] = useState<string>(
        defaultSystolic.toString()
    );
    const [diastolic, setDiastolic] = useState<string>(
        defaultDiastolic.toString()
    );
    const [saved, setSaved] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const updateMutation = useMutation(updateUserBloodPressure, {
        onSuccess: () => {
            setSaved(true);
        },
    });

    const deleteMutation = useMutation(deleteUserBloodPressure, {
        onSuccess: () => {
            queryClient.invalidateQueries(['UserBloodPressure']);
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
                        id={`user-systolic-${date}`}
                        label="Systolic"
                        value={systolic}
                        type="number"
                        inputMode="decimal"
                        onChange={(event) => {
                            setSystolic(event.target.value);
                        }}
                        className="my-auto"
                    />
                </div>
                <div className="flex-1 flex border-r border-secondary p-2">
                    <TextField
                        id={`user-diastolic-${date}`}
                        label="Diastolic"
                        value={diastolic}
                        type="number"
                        inputMode="decimal"
                        onChange={(event) => {
                            setDiastolic(event.target.value);
                        }}
                        className="my-auto"
                    />
                </div>
                <div className="flex-none flex">
                    <div className="w-16 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium border-r border-secondary">
                        <button
                            className="w-8 h-8"
                            onClick={() => {
                                updateMutation.mutate({
                                    id,
                                    userId: user?.id ?? '',
                                    systolic: parseInt(systolic),
                                    diastolic: parseInt(diastolic),
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