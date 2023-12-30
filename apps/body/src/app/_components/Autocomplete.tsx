import { FC, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { LoadingSpinner } from '@fitness/ui';
import { CircleCheckSolid } from './Icons/CircleCheckSolid';

interface IProps {
    label: string;
    selected: string | undefined;
    setSelected: (value: string | undefined) => void;
    query: string;
    setQuery: (value: string) => void;
    filtered: string[];
    isLoading: boolean;
}

export const Autocomplete: FC<IProps> = ({
    label,
    selected,
    setSelected,
    query,
    setQuery,
    filtered,
    isLoading,
}) => {
    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative w-full">
                <div className="relative w-full cursor-default overflow-hidden rounded text-left">
                    <Combobox.Label className="text-secondary block text-sm font-medium">
                        {label}
                    </Combobox.Label>
                    <Combobox.Input
                        className="border-ternary bg-background text-secondary placeholder-ternary autofill:!bg-background autofill:!text-secondary focus:border-secondary focus:bg-background focus:text-secondary focus:ring-secondary block w-full appearance-none rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none"
                        // @ts-ignore
                        displayValue={(item) => item}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="bg-card absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {isLoading && <LoadingSpinner />}
                        {filtered.length === 0 && query !== '' ? (
                            <Combobox.Option
                                key={query}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? 'bg-primary-dark text-ternary'
                                            : 'text-ternary'
                                    }`
                                }
                                value={query}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                            }`}
                                        >
                                            {query}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active
                                                        ? 'text-white'
                                                        : 'text-teal-600'
                                                }`}
                                            >
                                                <CircleCheckSolid
                                                    className="fill-ternary h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Combobox.Option>
                        ) : (
                            filtered.map((item) => (
                                <Combobox.Option
                                    key={item}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? 'bg-primary-dark text-ternary'
                                                : 'text-ternary'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal'
                                                }`}
                                            >
                                                {item}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                        active
                                                            ? 'text-white'
                                                            : 'text-teal-600'
                                                    }`}
                                                >
                                                    <CircleCheckSolid
                                                        className="fill-ternary h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};
