import { FC, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CircleCheckSolid } from './Icons/CircleCheckSolid';
import { ChevronDownSolid } from './Icons/ChevronDownSolid';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export interface DropdownOption {
    id: number;
    name: string;
}

interface IProps {
    id?: string;
    label?: string;
    options: DropdownOption[];
    selected?: DropdownOption;
    setSelected: (value: DropdownOption) => void;
    className?: string;
}

export const Dropdown: FC<IProps> = ({
    id,
    label,
    options,
    selected,
    setSelected,
    className,
}) => {
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <div className={className}>
                    <label
                        htmlFor={id}
                        className="block text-sm font-medium text-secondary"
                    >
                        {label}
                    </label>
                    <div className="relative mt-1" id={id}>
                        <Listbox.Button className="relative w-full cursor-default rounded-md border border-ternary bg-background py-2 pl-3 pr-10 text-left shadow-sm focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary sm:text-sm">
                            <span className="block truncate text-secondary">
                                {selected ? selected.name : 'Select an option'}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownSolid
                                    className="h-5 w-5 fill-secondary"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md card py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option) => (
                                    <Listbox.Option
                                        key={option.id}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? 'text-secondary bg-primary-dark'
                                                    : 'text-ternary',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={classNames(
                                                        selected
                                                            ? 'font-semibold'
                                                            : 'font-normal',
                                                        'block truncate'
                                                    )}
                                                >
                                                    {option.name}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? 'text-secondary'
                                                                : 'text-ternary',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CircleCheckSolid
                                                            className="h-5 w-5 fill-ternary"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    );
};
