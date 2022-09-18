import { FC, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { foodAutocomplete } from '../../api';
import { Autocomplete } from '../Autocomplete';

interface IProps {
    selected?: string;
    setSelected: (selected?: string) => void;
}

export const FoodAutocomplete: FC<IProps> = ({ selected, setSelected }) => {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState<string[]>([]);

    const mutation = useMutation(foodAutocomplete, {
        onSuccess: (data) => {
            if (!data) return;
            setFiltered(data.data);
        },
    });

    useMemo(() => {
        if (query.length < 3) return;

        mutation.mutate(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    return (
        <Autocomplete
            label="Food"
            selected={selected}
            setSelected={setSelected}
            query={query}
            setQuery={setQuery}
            filtered={filtered}
            isLoading={mutation.isLoading}
        />
    );
};
