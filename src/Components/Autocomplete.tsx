import { FC, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Loading } from './Loading';
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
                    <Combobox.Label className="block text-sm font-medium text-secondary">
                        {label}
                    </Combobox.Label>
                    <Combobox.Input
                        className="appearance-none block w-full px-3 py-2 border border-ternary rounded-md shadow-sm placeholder-ternary focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm bg-background text-secondary focus:bg-background focus:text-secondary autofill:!bg-background autofill:!text-secondary"
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
                    <Combobox.Options className="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-card py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {isLoading && <Loading />}
                        {filtered.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-ternary">
                                Nothing found.
                            </div>
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
                                                        className="h-5 w-5 text-ternary"
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
