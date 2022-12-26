import { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';

interface IProps {
    id?: string;
    name?: string;
    type?: HTMLInputTypeAttribute;
    inputMode?: 'numeric' | 'decimal';
    autoComplete?: string;
    label?: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

export const TextField: FC<IProps> = ({
    id,
    name,
    type,
    inputMode,
    autoComplete,
    label,
    value,
    onChange,
    className,
}) => {
    const styles =
        'appearance-none block w-full px-3 py-2 border border-ternary rounded-md shadow-sm placeholder-ternary focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm bg-background text-secondary focus:bg-background focus:text-secondary autofill:!bg-background autofill:!text-secondary';

    return (
        <div className={`${className} w-full m-1`}>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-secondary"
            >
                {label}
            </label>
            <div className="mt-1">
                {type === 'number' ? (
                    <input
                        id={id}
                        name={name}
                        type="number"
                        inputMode={inputMode}
                        autoComplete={autoComplete}
                        value={value}
                        required
                        className={styles}
                        onChange={onChange}
                    />
                ) : (
                    <input
                        id={id}
                        name={name}
                        type={type}
                        autoComplete={autoComplete}
                        value={value}
                        required
                        className={styles}
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    );
};