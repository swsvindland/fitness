import { FC, FormEvent } from 'react';
import { api } from '~/trpc/react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { MagnifyingGlassSolid } from '@fitness/ui';

interface IProps {
    query: string;
    setQuery: (query: string) => void;
    selected: string | undefined;
    setSelected: (selected?: string) => void;
}

export const FoodSearch: FC<IProps> = ({
    query,
    setQuery,
    selected,
    setSelected,
}) => {
    const optionsQuery = api.food.autocomplete.useQuery({ query });

    const handleClear = () => {
        setSelected(undefined);
        setQuery('');
    };

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        setSelected(query);
    };

    const filtered = optionsQuery.data ?? [];

    return (
        <form
            className="flex flex-row items-center justify-between gap-2"
            onSubmit={handleSearch}
        >
            <Autocomplete
                label="Food"
                className="flex-1"
                defaultInputValue={selected}
                value={query}
                onInputChange={setQuery}
                onClear={handleClear}
            >
                {filtered.map((item) => (
                    <AutocompleteItem key={item} value={item}>
                        {item}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
            <Button
                isIconOnly
                color="primary"
                type="submit"
                className="h-14 w-14"
            >
                <MagnifyingGlassSolid className="h-6 w-6" />
            </Button>
        </form>
    );
};
