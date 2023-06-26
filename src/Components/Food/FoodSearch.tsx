import { type FC, type FormEvent } from 'react';
import { Button } from '../Buttons/Button';
import { MagnifyingGlassSolid } from '../Icons/MagnifyingGlassSolid';
import { Autocomplete } from '../Autocomplete';
import { useQuery } from '@tanstack/react-query';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { XSolid } from '../Icons/XSolid';
import { foodAutocomplete } from '../../api';
import { Barcode } from '../Icons/Barcode';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const optionsQuery = useQuery(['SearchFoodOptions', query], () => {
        if (!query) return;
        return foodAutocomplete(query);
    });

    const handleClear = () => {
        setSelected(undefined);
        setQuery('');
    };

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        setSelected(query);
    };

    const handleStartScan = () => {
        history.push('/scanner');
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
                filtered={optionsQuery.data?.data ?? []}
                isLoading={optionsQuery.isLoading}
            />
            <SecondaryButton
                className=" ml-2 h-10 w-10 !p-2"
                onClick={handleClear}
            >
                <XSolid className="h-6 w-6 fill-teal-500" />
            </SecondaryButton>
            <Button className=" ml-2 h-10 w-10 !p-2" type="submit">
                <MagnifyingGlassSolid className="h-6 w-6" />
            </Button>
            <SecondaryButton
                className=" ml-2 h-10 w-10 !p-2"
                onClick={handleStartScan}
            >
                <Barcode className="h-6 w-6 fill-teal-500" />
            </SecondaryButton>
        </form>
    );
};
