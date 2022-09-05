import { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';

interface IProps {
    id?: string;
    name?: string;
    type?: HTMLInputTypeAttribute;
    inputMode?: 'numeric' | 'decimal';
    autocomplete?: 'on' | 'off';
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
    autocomplete,
    label,
    value,
    onChange,
    className,
}) => {
    const styles =
        'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm bg-background text-secondary focus:bg-background focus:text-secondary autofill:!bg-background autofill:!text-secondary';

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
                        min="0"
                        inputMode={inputMode}
                        autoComplete={autocomplete}
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
                        autoComplete={autocomplete}
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
