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
    const styles =
        'appearance-none block w-full px-3 py-2 border border-ternary rounded-md shadow-sm placeholder-ternary focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm bg-background text-secondary focus:bg-background focus:text-secondary autofill:!bg-background autofill:!text-secondary';

    return (
        <div className={`${className} m-1 w-full`}>
            <label
                htmlFor={id}
                className="text-secondary block text-sm font-medium"
            >
                {label}
            </label>
            <div className="mt-1">
                <textarea
                    id={id}
                    name={name}
                    autoComplete={autoComplete}
                    value={value}
                    rows={rows}
                    className={styles}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};
