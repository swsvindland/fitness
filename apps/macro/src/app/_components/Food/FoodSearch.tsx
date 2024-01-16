import { FC, FormEvent } from 'react';
import { api } from '~/trpc/react';
import { Autocomplete } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { MagnifyingGlassSolid, XSolid } from '@fitness/ui';

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
            {/*<Autocomplete*/}
            {/*    label="Food"*/}
            {/*    query={query}*/}
            {/*    setQuery={setQuery}*/}
            {/*    setSelected={setSelected}*/}
            {/*    selected={selected}*/}
            {/*    filtered={optionsQuery.data ?? []}*/}
            {/*    isLoading={optionsQuery.isLoading}*/}
            {/*/>*/}
            <Button className=" ml-2 h-10 w-10 !p-2" onClick={handleClear}>
                <XSolid className="fill-secondary h-6 w-6" />
            </Button>
            <Button className=" ml-2 h-10 w-10 !p-2" type="submit">
                <MagnifyingGlassSolid className="fill-secondary h-6 w-6" />
            </Button>
        </form>
    );
};
