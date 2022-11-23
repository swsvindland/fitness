import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Button } from './Buttons/Button';
import { SecondaryButton } from './Buttons/SecondaryButton';
import { isPlatform } from '@ionic/react';
import {
    IAPProduct,
    InAppPurchase2 as iap,
} from '@awesome-cordova-plugins/in-app-purchase-2';
import { Loading } from './Loading';
import { AuthContext } from './Auth/Auth';
import { UserRole } from '../types/user';
import { DeleteAccount } from './DeleteAccount';

const MONTHLY_SUBSCRIPTION = 'f345a58b28124c28b14b7a6c3093114e';
const YEARLY_SUBSCRIPTION = '5b0353d4799845989d2f4e143b3cb3ad';

export const PurchaseOptions: FC = () => {
    const { user, openPurchase, setOpenPurchase, setPaid } =
        useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [monthly, setMonthly] = useState<IAPProduct | undefined>(undefined);
    const [yearly, setYearly] = useState<IAPProduct | undefined>(undefined);

    const canCharge =
        !isPlatform('mobileweb') &&
        user?.userRole === UserRole.User &&
        (isPlatform('android') || isPlatform('ios'));

    useEffect(() => {
        if (canCharge) {
            iap.verbosity = iap.QUIET;

            iap.validator =
                'https://validator.fovea.cc/v1/validate?appName=com.svindland.fitness&apiKey=85cb7102-17c8-4f39-adaf-35051a4fb53b';

            iap.register([
                {
                    id: MONTHLY_SUBSCRIPTION,
                    alias: 'Access Monthly',
                    type: iap.PAID_SUBSCRIPTION,
                },
                {
                    id: YEARLY_SUBSCRIPTION,
                    alias: 'Access Yearly',
                    type: iap.PAID_SUBSCRIPTION,
                },
            ]);

            iap.ready(() => {
                const newMonthly = iap.get(MONTHLY_SUBSCRIPTION);
                setMonthly(newMonthly);

                const newYearly = iap.get(YEARLY_SUBSCRIPTION);
                setYearly(newYearly);
            });

            iap.refresh();
        }
    }, [canCharge]);

    //if user clicks purchase button
    const purchaseMonthly = () => {
        if (canCharge) {
            try {
                setLoading(true);
                iap.order('Access Monthly');
            } catch (e) {
                console.error(e);
            } finally {
                iap.refresh();
                setLoading(false);
            }
        }
    };

    const purchaseYearly = () => {
        if (isPlatform('ios') || isPlatform('android')) {
            try {
                setLoading(true);
                iap.order('Access Yearly');
            } catch (e) {
                console.error(e);
            } finally {
                iap.refresh();
                setLoading(false);
            }
        }
    };

    const restore = () => {
        if (canCharge) {
            iap.refresh();
        }
    };

    useEffect(() => {
        if (canCharge) {
            iap.when(MONTHLY_SUBSCRIPTION).approved((p: IAPProduct) => {
                p.verify();
                p.finish();
                setPaid(false);
            });
            iap.when(MONTHLY_SUBSCRIPTION).cancelled((p: IAPProduct) => {
                setPaid(false);
            });
            iap.when(MONTHLY_SUBSCRIPTION).expired((p: IAPProduct) => {
                setPaid(false);
            });
            iap.when(MONTHLY_SUBSCRIPTION).error((p: IAPProduct) => {
                setPaid(false);
            });
        }
    });

    useEffect(() => {
        if (canCharge) {
            iap.when(YEARLY_SUBSCRIPTION).approved((p: IAPProduct) => {
                p.verify();
                p.finish();
                setPaid(false);
            });
            iap.when(YEARLY_SUBSCRIPTION).cancelled((p: IAPProduct) => {
                setPaid(false);
            });
            iap.when(YEARLY_SUBSCRIPTION).expired((p: IAPProduct) => {
                setPaid(false);
            });
            iap.when(YEARLY_SUBSCRIPTION).error((p: IAPProduct) => {
                setPaid(false);
            });
        }
    });

    useEffect(() => {
        if (canCharge) {
            iap.when('subscription').updated((product: IAPProduct) => {
                const monthly = iap.get(MONTHLY_SUBSCRIPTION);
                const yearly = iap.get(YEARLY_SUBSCRIPTION);

                if (
                    user?.userRole === UserRole.FreeUser ||
                    user?.userRole === UserRole.Admin
                ) {
                    setPaid(true);
                } else if (monthly.owned || yearly.owned) {
                    setPaid(true);
                    setOpenPurchase(false);
                } else {
                    setPaid(false);
                }
            });
        } else {
            setPaid(true);
            setOpenPurchase(false);
        }
    });

    return (
        <>
            <Transition.Root show={openPurchase} as={Fragment}>
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
                                <Dialog.Panel className="relative transform rounded-lg card px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        <div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-lg font-medium leading-6 text-secondary"
                                                >
                                                    Get full to the app and all
                                                    it's features
                                                </Dialog.Title>
                                                <div className="mx-auto max-w-7xl">
                                                    {/* Tiers */}
                                                    <div className="mt-8 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:space-y-0">
                                                        <div className="relative flex flex-col rounded-2xl border border-ternary card p-8 shadow-sm">
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
                                                                    Get full
                                                                    access to
                                                                    the app. All
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
                                                                    Monthly
                                                                    Billing
                                                                </SecondaryButton>
                                                            </div>
                                                        </div>
                                                        <div className="relative flex flex-col rounded-2xl border border-ternary card p-8 shadow-sm">
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
                                                                    All the
                                                                    features of
                                                                    monthly but
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
                                                                        !yearly?.canPurchase
                                                                    }
                                                                >
                                                                    Yearly
                                                                    Billing
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <SecondaryButton
                                                    className="flex w-full justify-center align-middle my-4"
                                                    onClick={restore}
                                                >
                                                    Restore Purchases
                                                </SecondaryButton>
                                                <SecondaryButton
                                                    className="flex w-full justify-center align-middle my-4"
                                                    onClick={() =>
                                                        setOpenPurchase(false)
                                                    }
                                                >
                                                    Close
                                                </SecondaryButton>
                                                <DeleteAccount />
                                            </div>
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
