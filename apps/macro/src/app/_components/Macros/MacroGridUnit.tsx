import { FC } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Progress,
} from '@nextui-org/react';

interface IProps {
    name: string;
    amount: number;
    currentAmount?: number;
    unit: string;
}

export const MacroGridUnit: FC<IProps> = ({
    name,
    amount,
    currentAmount,
    unit,
}) => {
    const percentage = ((currentAmount ?? 0) / amount) * 100;

    return (
        <Card className="p-4">
            <CardHeader className="text-secondary flex justify-between text-base font-normal">
                <span>{name}</span>
            </CardHeader>
            <CardBody>
                <dd className="my-1 flex items-baseline">
                    {currentAmount !== undefined ? (
                        <>
                            <span className="text-ternary flex items-baseline text-lg font-semibold sm:text-2xl">
                                {currentAmount?.toFixed(0) ?? 0}
                            </span>
                            <span className="text-ternary text-xs sm:text-lg">
                                {unit}
                            </span>
                            <span className="text-ternary flex items-baseline text-lg font-semibold sm:text-2xl">
                                /
                            </span>
                        </>
                    ) : null}
                    <span className="text-ternary flex items-baseline text-lg font-semibold sm:text-2xl">
                        {amount?.toFixed(0)}
                    </span>
                    <span className="text-ternary text-xs sm:text-lg">
                        {unit}
                    </span>
                </dd>
            </CardBody>
            <CardFooter>
                <Progress aria-label="progress" value={percentage} />
            </CardFooter>
        </Card>
    );
};
