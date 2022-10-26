import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useEffect, useState } from 'react';
import { Button } from './Buttons/Button';
import { SecondaryButton } from './Buttons/SecondaryButton';
import { isPlatform } from '@ionic/react';
import {
    InAppPurchase2 as iap,
    IAPProduct,
} from '@awesome-cordova-plugins/in-app-purchase-2';

export const PurchaseAccess: FC = () => {
    const [open, setOpen] = useState<boolean>(false);

    const [monthly, setMonthly] = useState<IAPProduct | undefined>(undefined);
    const [yearly, setYearly] = useState<IAPProduct | undefined>(undefined);

    //initiate initInAppPurchase function
    useEffect(() => {
        const init = async () => {
            await initInAppPurchase();
            handleOwned();
        };
        if (isPlatform('ios') || isPlatform('android')) {
            init();
        }
    }, []);

    //if on an ios or android device, then get product info
    const initInAppPurchase = () => {
        if (isPlatform('ios') || isPlatform('android')) {
            iap.verbosity = iap.DEBUG;

            iap.validator =
                'https://validator.fovea.cc/v1/validate?appName=com.svindland.fitness&apiKey=85cb7102-17c8-4f39-adaf-35051a4fb53b';

            iap.register({
                id: 'f345a58b28124c28b14b7a6c3093114e',
                alias: 'Access Monthly',
                type: iap.PAID_SUBSCRIPTION,
            });

            iap.register({
                id: '5b0353d4799845989d2f4e143b3cb3ad',
                alias: 'Access Yearly',
                type: iap.PAID_SUBSCRIPTION,
            });

            iap.ready(() => {
                const product = iap.get('f345a58b28124c28b14b7a6c3093114e');
                setMonthly(product);
            });

            iap.ready(() => {
                const product = iap.get('5b0353d4799845989d2f4e143b3cb3ad');
                setYearly(product);
            });

            iap.refresh();
        }
    };

    //if user clicks purchase button
    const purchaseMonthly = () => {
        try {
            iap.order('Access Monthly').then(() => {
                iap.when('f345a58b28124c28b14b7a6c3093114e').approved(
                    (p: IAPProduct) => {
                        //store product
                        p.verify();
                        p.finish();
                    }
                );
            });
            iap.refresh();
        } catch (e) {
            console.error(e);
        }
    };

    const purchaseYearly = () => {
        try {
            iap.order('Access Yearly').then(() => {
                iap.when('5b0353d4799845989d2f4e143b3cb3ad').approved(
                    (p: IAPProduct) => {
                        //store product
                        p.verify();
                        p.finish();
                    }
                );
            });
            iap.refresh();
        } catch (e) {
            console.error(e);
        }
    };

    const handleOwned = () => {
        iap.when('subscription').updated((product: IAPProduct) => {
            const monthly = iap.get('f345a58b28124c28b14b7a6c3093114e');
            const yearly = iap.get('5b0353d4799845989d2f4e143b3cb3ad');

            if (!monthly || !yearly) {
                setOpen(false);
            } else if (monthly.owned || yearly.owned) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        });
    };

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
                                                    <div className="relative flex flex-col rounded-2xl border border-ternary bg-card p-8 shadow-sm">
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-secondary">
                                                                Monthly
                                                            </h3>
                                                            <p className="mt-4 flex items-baseline text-secondary">
                                                                <span className="text-5xl font-bold tracking-tight">
                                                                    {
                                                                        monthly?.price
                                                                    }
                                                                </span>
                                                                <span className="ml-1 text-xl font-semibold">
                                                                    month
                                                                </span>
                                                            </p>
                                                            <p className="mt-6 text-ternary">
                                                                Get full access
                                                                to the app. All
                                                                features and
                                                                workouts
                                                                available.
                                                            </p>
                                                        </div>
                                                        <div className="mt-4">
                                                            <SecondaryButton
                                                                className="flex w-full justify-center align-middle"
                                                                onClick={
                                                                    purchaseMonthly
                                                                }
                                                                disabled={
                                                                    !monthly?.canPurchase
                                                                }
                                                            >
                                                                Monthly Billing
                                                            </SecondaryButton>
                                                        </div>
                                                    </div>
                                                    <div className="relative flex flex-col rounded-2xl border border-ternary bg-card p-8 shadow-sm">
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-semibold text-secondary">
                                                                Yearly
                                                            </h3>
                                                            <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-secondary py-1.5 px-4 text-sm font-semibold text-primary-dark">
                                                                Most popular
                                                            </p>
                                                            <p className="mt-4 flex items-baseline text-secondary">
                                                                <span className="text-5xl font-bold tracking-tight">
                                                                    {
                                                                        yearly?.price
                                                                    }
                                                                </span>
                                                                <span className="ml-1 text-xl font-semibold">
                                                                    year
                                                                </span>
                                                            </p>
                                                            <p className="mt-6 text-ternary">
                                                                All the features
                                                                of monthly but
                                                                cheaper!
                                                            </p>
                                                        </div>
                                                        <div className="mt-4">
                                                            <Button
                                                                className="flex w-full justify-center align-middle"
                                                                onClick={
                                                                    purchaseYearly
                                                                }
                                                                disabled={
                                                                    yearly?.canPurchase
                                                                }
                                                            >
                                                                Yearly Billing
                                                            </Button>
                                                        </div>
                                                    </div>
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
