import { type FC, type FormEvent } from 'react';
import { Button } from '../Buttons/Button';
import { MagnifyingGlassSolid } from '../Icons/MagnifyingGlassSolid';
import { Autocomplete } from '../Autocomplete';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { XSolid } from '../Icons/XSolid';

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
            <Autocomplete
                label="Supplement"
                query={query}
                setQuery={setQuery}
                setSelected={setSelected}
                selected={selected}
                filtered={filtered}
                isLoading={false}
            />
            <SecondaryButton
                className=" ml-2 h-10 w-10 !p-2"
                onClick={handleClear}
            >
                <XSolid className="h-6 w-6 fill-secondary" />
            </SecondaryButton>
            <Button className=" ml-2 h-10 w-10 !p-2" type="submit">
                <MagnifyingGlassSolid className="h-6 w-6 fill-secondary" />
            </Button>
        </form>
    );
};
