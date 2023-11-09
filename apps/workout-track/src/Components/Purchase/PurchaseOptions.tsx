import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useContext } from 'react';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { AuthContext } from '../Auth/Auth';
import { DeleteAccount } from '../DeleteAccount';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePaid } from '@fitness/api-legacy';
import { addDays } from 'date-fns';
import { LoadingSpinner } from '../Loading/LoadingSpinner';

export const PurchaseOptions: FC = () => {
    const { user, setUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const paidMutation = useMutation(updatePaid, {
        onSuccess: async () => {
            await queryClient.invalidateQueries();
            setUser(await queryClient.getQueryData(['user', user?.id]));
        },
    });

    const updatePaidIfNeeded = (paid: boolean, paidUntil?: string) => {
        if (user?.paid === paid) return;
        paidMutation.mutate({ paid, paidUntil });
    };

    const purchaseFreeTrial = async () => {
        updatePaidIfNeeded(true, addDays(new Date(), 90).toISOString());
    };

    return (
        <>
            <Transition.Root show={true} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="card relative transform rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-secondary text-2xl font-bold"
                                            >
                                                WorkoutTrack is a premium app.
                                                Subscribe for access.
                                            </Dialog.Title>
                                            <div className="ml-8">
                                                <p className="text-ternary">
                                                    Do to an update in billing
                                                    software, WorkoutTrack will
                                                    be free until further
                                                    notice. Expect pricing to
                                                    remain the same, but get 90
                                                    days at a time for free till
                                                    we get the next update out.
                                                </p>
                                                <ul className="my-8 list-disc">
                                                    <li className="text-ternary text-start text-lg">
                                                        Track your workouts
                                                    </li>
                                                    <li className="text-ternary text-start text-lg">
                                                        Calculate and meet your
                                                        macros
                                                    </li>
                                                    <li className="text-ternary text-start text-lg">
                                                        Create custom workouts
                                                    </li>
                                                    <li className="text-ternary text-start text-lg">
                                                        Measure your progress
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="mx-auto max-w-7xl">
                                                <div className="mt-8 space-y-12">
                                                    <div className="card border-ternary relative flex flex-col rounded-2xl border p-8 shadow-sm">
                                                        <span className="text-secondary text-center text-lg font-bold tracking-tight">
                                                            Free (90 Days)
                                                        </span>
                                                        {paidMutation.isLoading ? (
                                                            <LoadingSpinner />
                                                        ) : (
                                                            <div className="mt-4">
                                                                <SecondaryButton
                                                                    className="flex w-full justify-center align-middle"
                                                                    onClick={
                                                                        purchaseFreeTrial
                                                                    }
                                                                >
                                                                    Free Trial
                                                                    (No Credit
                                                                    Card
                                                                    Required)
                                                                </SecondaryButton>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <DeleteAccount />
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
