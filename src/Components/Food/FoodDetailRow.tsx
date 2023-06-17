import { type FC } from 'react';

interface IProps {
    name: string;
    value: number;
    unit: string;
}

export const FoodDetailRow: FC<IProps> = ({ name, value, unit }) => {
    return (
        <div className="flex flex-row justify-between">
            <span className="text-md text-secondary">{name}</span>
            <div>
                <span className="text-md text-ternary">
                    {(isNaN(value) ? 0 : value).toFixed(2)}
                </span>
                <span className="text-md text-ternary">{unit}</span>
            </div>
        </div>
    );
};
