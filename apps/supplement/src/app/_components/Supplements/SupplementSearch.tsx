import { FC, FormEvent } from 'react';
import { MagnifyingGlassSolid } from '@fitness/ui';
import { Button } from '@nextui-org/button';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

interface IProps {
    query: string;
    setQuery: (query: string) => void;
    selected: string | undefined;
    setSelected: (selected?: string) => void;
    options: string[];
}

export const SupplementSearch: FC<IProps> = ({
    query,
    setQuery,
    selected,
    setSelected,
    options,
}) => {
    const filtered = options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
    );

    const handleClear = () => {
        setSelected(undefined);
        setQuery('');
    };

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        setSelected(query);
    };

    return (
        <form
            className="flex flex-row items-end justify-between"
            onSubmit={handleSearch}
        >
            <div className="flex w-full items-center justify-center gap-2">
                <Autocomplete
                    label="Search for a supplement"
                    className="flex-1"
                    defaultInputValue={selected}
                    value={query}
                    onInputChange={setQuery}
                    onClear={handleClear}
                >
                    {filtered?.map((item) => (
                        <AutocompleteItem key={item} value={item}>
                            {item}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Button
                    type="submit"
                    color="primary"
                    className="py-7"
                    startContent={
                        <MagnifyingGlassSolid className="fill-secondary h-6 w-6" />
                    }
                ></Button>
            </div>
        </form>
    );
};
