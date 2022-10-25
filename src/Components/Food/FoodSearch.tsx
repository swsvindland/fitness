import { FC, FormEvent, useState } from 'react';
import { Button } from '../Buttons/Button';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { TextField } from '../TextField';

interface IProps {
    selected?: string;
    setSelected: (selected?: string) => void;
}

export const FoodSearch: FC<IProps> = ({ selected, setSelected }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        setSelected(query);
    };

    return (
        <form
            className="flex items-end justify-between"
            onSubmit={handleSearch}
        >
            <TextField
                id="food"
                name="food"
                type="text"
                label="Food"
                value={query}
                onChange={(event) => setQuery(event.target.value as string)}
            />
            <Button className=" w-10 h-10 ml-2 m-1 !p-2" type="submit">
                <MagnifyingGlassIcon className="w-6 h-6 text-secondary" />
            </Button>
        </form>
    );
};
