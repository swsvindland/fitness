import { type ChangeEvent, type FC, type HTMLInputTypeAttribute } from 'react';

interface IProps {
    id?: string;
    name?: string;
    type?: HTMLInputTypeAttribute;
    inputMode?: 'numeric' | 'decimal';
    autoComplete?: string;
    label?: string;
    value: string | number | undefined;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
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
    required,
}) => {
    const styles =
        'bg-white dark:bg-black appearance-none block w-full px-3 py-2 border border-teal-500 rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm';

    const isRequired = required !== undefined ? required : true;

    return (
        <div className={`${className ?? ''} m-1 w-full`}>
            <label htmlFor={id} className="block text-sm font-medium">
                {label}
                {isRequired && label ? '*' : null}
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
                        required={isRequired}
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
                        required={isRequired}
                        className={styles}
                        onChange={onChange}
                    />
                )}
            </div>
        </div>
    );
};
