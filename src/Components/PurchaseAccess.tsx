import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import { Button } from './Buttons/Button';
import { SecondaryButton } from './Buttons/SecondaryButton';

const pricing = {
    tiers: [
        {
            title: 'Monthly',
            price: 4.99,
            frequency: '/month',
            description:
                'Get full access to the app. All features and workouts available.',
            cta: 'Monthly billing',
            mostPopular: false,
        },
        {
            title: 'Yearly',
            price: 29.99,
            frequency: '/year',
            description: 'Same as monthly but half off!',
            cta: 'Yearly billing',
            mostPopular: true,
        },
    ],
};

export const PurchaseAccess: FC = () => {
    const [open] = useState<boolean>(false);

    return (
        <>
            <Transition.Root show={open} as={Fragment}>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-card px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-secondary"
                                            >
                                                Get access to the app
                                            </Dialog.Title>
                                            <div className="mx-auto max-w-7xl">
                                                {/* Tiers */}
                                                <div className="mt-8 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0">
                                                    {pricing.tiers.map(
                                                        (tier) => (
                                                            <div
                                                                key={tier.title}
                                                                className="relative flex flex-col rounded-2xl border border-ternary bg-card p-8 shadow-sm"
                                                            >
                                                                <div className="flex-1">
                                                                    <h3 className="text-xl font-semibold text-secondary">
                                                                        {
                                                                            tier.title
                                                                        }
                                                                    </h3>
                                                                    {tier.mostPopular ? (
                                                                        <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-secondary py-1.5 px-4 text-sm font-semibold text-primary-dark">
                                                                            Most
                                                                            popular
                                                                        </p>
                                                                    ) : null}
                                                                    <p className="mt-4 flex items-baseline text-secondary">
                                                                        <span className="text-5xl font-bold tracking-tight">
                                                                            $
                                                                            {
                                                                                tier.price
                                                                            }
                                                                        </span>
                                                                        <span className="ml-1 text-xl font-semibold">
                                                                            {
                                                                                tier.frequency
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    <p className="mt-6 text-ternary">
                                                                        {
                                                                            tier.description
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="mt-4">
                                                                    {tier.mostPopular ? (
                                                                        <Button className="flex w-full justify-center align-middle">
                                                                            {
                                                                                tier.cta
                                                                            }
                                                                        </Button>
                                                                    ) : (
                                                                        <SecondaryButton className="flex w-full justify-center align-middle">
                                                                            {
                                                                                tier.cta
                                                                            }
                                                                        </SecondaryButton>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
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
