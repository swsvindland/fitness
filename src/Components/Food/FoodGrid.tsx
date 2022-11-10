import { FC, useContext, useEffect, useState } from 'react';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { LinkButton } from '../Buttons/LinkButton';
import { classNames } from '../../utils/classNames';
import { useQuery } from '@tanstack/react-query';
import { getUserFoods } from '../../api';
import { Loading } from '../Loading';
import { useHistory } from 'react-router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ScannerContext } from './ScannerContext';
import { Button } from '../Buttons/Button';

export const FoodGrid: FC = () => {
    const history = useHistory();
    const { hideBackground, setHideBackground } = useContext(ScannerContext);
    const [err, setErr] = useState<string>();

    const startScan = async () => {
        BarcodeScanner.hideBackground(); // make background of WebView transparent
        setHideBackground(true);

        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
        stopScan();

        // if the result has content
        if (result.hasContent) {
            console.log(result.content);
            history.push(`/eat/scan/${result.content}`);
            // present(result.content!, [{ text: 'OK', role: 'cancel' }]);
            // log the raw scanned content
        }
    };

    const stopScan = () => {
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
        setHideBackground(false);
    };

    useEffect(() => {
        const checkPermission = async () => {
            try {
                const status = await BarcodeScanner.checkPermission({
                    force: true,
                });

                if (status.granted) {
                    return true;
                }

                return false;
            } catch (error: any) {
                setErr(error.message);
                console.log(error.message);
            }
        };

        checkPermission();

        return () => {};
    }, []);

    const handleRowClick = (foodId?: number) => {
        if (!foodId) return;
        history.push(`/eat/user-food/${foodId}`);
    };

    const foodQuery = useQuery(['Food'], () => {
        return getUserFoods();
    });

    if (foodQuery.isLoading) {
        return <Loading />;
    }

    if (hideBackground) {
        return (
            <div className="flex justify-center">
                <div className="fixed bottom-56 w-80 border-b border-secondary"></div>
                <Button className="fixed bottom-24" onClick={stopScan}>
                    Close Scanner
                </Button>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 bg-card rounded m-1 p-4">
            <div className="flex flex-row justify-end">
                <SecondaryButton className="mx-1" onClick={startScan}>
                    Scan Barcode
                </SecondaryButton>
                <LinkButton to="/eat/add-food" className="mx-1">
                    Add Food
                </LinkButton>
            </div>
            <div className="ring-1 ring-ternary md:mx-0 rounded my-2">
                <table className="min-w-full divide-y divide-ternary">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Protein
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Fat
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Carbs
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Calories
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-secondary lg:table-cell"
                            >
                                Servings
                            </th>
                            <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                                <span className="sr-only">Select</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodQuery.data?.data.map((food, foodIdx) => (
                            <tr key={food.id}>
                                <td
                                    onClick={() =>
                                        handleRowClick(food.food?.id)
                                    }
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-transparent',
                                        'relative py-4 pl-4 sm:pl-6 pr-3 text-sm'
                                    )}
                                >
                                    <div className="font-medium text-secondary">
                                        {food.food?.name}
                                    </div>
                                    <div className="mt-1 flex flex-col text-ternary lg:hidden">
                                        <span>
                                            Protein:{' '}
                                            {food.food?.protein?.toFixed(2)}g
                                        </span>
                                        <span>
                                            Fat:{' '}
                                            {food.food?.totalFat?.toFixed(2)}g
                                        </span>
                                        <span>
                                            Carbs:{' '}
                                            {food.food?.carbohydrates?.toFixed(
                                                2
                                            )}
                                            g
                                        </span>
                                        <span>
                                            {food.food?.calories.toFixed(2)}{' '}
                                            Calories
                                        </span>
                                        <span>
                                            {food.servings.toFixed(2)} Servings
                                        </span>
                                    </div>
                                    {foodIdx !== 0 ? (
                                        <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                                    ) : null}
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {food.food?.protein?.toFixed(2)}g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {food.food?.totalFat?.toFixed(2)}g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'hidden px-3 py-3.5 text-sm text-ternary lg:table-cell'
                                    )}
                                >
                                    {food.food?.carbohydrates?.toFixed(2)}g
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'px-3 py-3.5 text-sm text-ternary'
                                    )}
                                >
                                    <div className="hidden sm:block">
                                        {food.food?.calories.toFixed(2)}{' '}
                                        Calories
                                    </div>
                                </td>
                                <td
                                    className={classNames(
                                        foodIdx === 0
                                            ? ''
                                            : 'border-t border-gray-200',
                                        'px-3 py-3.5 text-sm text-ternary'
                                    )}
                                >
                                    <div className="hidden sm:block">
                                        {food.servings.toFixed(2)} Servings
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
