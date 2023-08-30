import { ChangeEvent, FC } from 'react';

interface IProps {
    id?: string;
    name?: string;
    autoComplete?: string;
    label?: string;
    value: string | number;
    rows: number;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
}

export const TextArea: FC<IProps> = ({
    id,
    name,
    autoComplete,
    label,
    value,
    rows,
    onChange,
    className,
}) => {
    return (
        <div className={`${className} m-1 w-full`}>
            <label htmlFor={id} className="block text-sm font-medium">
                {label}
            </label>
            <div className="mt-1">
                <textarea
                    id={id}
                    name={name}
                    autoComplete={autoComplete}
                    value={value}
                    rows={rows}
                    className="sm:text-sm; block w-full appearance-none rounded-lg border border-teal-500 bg-white px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 dark:bg-black"
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
