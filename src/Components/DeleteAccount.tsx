import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useContext, useState } from 'react';
import { Button } from './Buttons/Button';
import { SecondaryButton } from './Buttons/SecondaryButton';
import { AuthContext } from '../Auth/Auth';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../api';

export const DeleteAccount: FC = () => {
    const { setUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const deleteMutation = useMutation(deleteUser, {
        onSuccess: async (data, variables, context) => {
            localStorage.clear();
            setUser(undefined);
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Delete Account</Button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-card px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-secondary"
                                            >
                                                Delete Account?
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-ternary">
                                                    This will delete all data we
                                                    have stored about you. You
                                                    will not be able to revert
                                                    this action.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <Button onClick={handleDelete}>
                                            Delete
                                        </Button>
                                        <SecondaryButton
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </SecondaryButton>
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
