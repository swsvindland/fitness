import { FC, FormEvent } from 'react';
import { Button } from '../Buttons/Button';
import { MagnifyingGlassSolid } from '../Icons/MagnifyingGlassSolid';
import { Autocomplete } from '../Autocomplete';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { XSolid } from '../Icons/XSolid';
import { api } from '~/trpc/react';

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

    return (
        <form
            className="flex flex-row items-end justify-between"
            onSubmit={handleSearch}
        >
            <Autocomplete
                label="Food"
                query={query}
                setQuery={setQuery}
                setSelected={setSelected}
                selected={selected}
                filtered={optionsQuery.data ?? []}
                isLoading={optionsQuery.isLoading}
            />
            <SecondaryButton
                className=" ml-2 h-10 w-10 !p-2"
                onClick={handleClear}
            >
                <XSolid className="fill-secondary h-6 w-6" />
            </SecondaryButton>
            <Button className=" ml-2 h-10 w-10 !p-2" type="submit">
                <MagnifyingGlassSolid className="fill-secondary h-6 w-6" />
            </Button>
        </form>
    );
};
