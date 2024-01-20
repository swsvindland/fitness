import { FC, useMemo } from 'react';
import { api } from '~/trpc/react';
import {
    Autocomplete,
    AutocompleteItem,
    MenuTriggerAction,
} from '@nextui-org/react';

export interface FieldState {
    selectedKey: string | null;
    inputValue: string;
}

interface IProps {
    field: FieldState;
    setField: (field: FieldState) => void;
}

export const FoodSearch: FC<IProps> = ({ field, setField }) => {
    const optionsQuery = api.food.autocomplete.useQuery(
        {
            query: field.inputValue,
        },
        { enabled: field.inputValue?.length > 3 }
    );

    const filtered = useMemo(() => {
        const items = optionsQuery.data ?? [];

        return [...items];
    }, [optionsQuery.data]);

    const handleClear = () => {
        setField({
            selectedKey: '',
            inputValue: '',
        });
    };

    const onSelectionChange = (key: string | number) => {
        const newSelectedItem = filtered.find((option) => option === key);

        setField({
            selectedKey: newSelectedItem ?? null,
            inputValue: key?.toString(),
        });
    };

    const onInputChange = (value: string) => {
        setField({
            selectedKey: value === '' ? null : field.selectedKey,
            inputValue: value,
        });
    };

    const onOpenChange = (
        isOpen: boolean,
        menuTrigger: MenuTriggerAction | undefined
    ) => {
        if (menuTrigger === 'manual' && isOpen) {
            setField({
                inputValue: field.inputValue,
                selectedKey: field.selectedKey,
            });
        }
    };

    const handleSearch = () => {
        setField({
            inputValue: field.inputValue,
            selectedKey: field.inputValue,
        });
    };

    return (
        <Autocomplete
            fullWidth
            inputValue={field.inputValue}
            allowsCustomValue
            allowsEmptyCollection={false}
            items={filtered}
            label="Food"
            placeholder="Search foods"
            selectedKey={field.selectedKey}
            isLoading={optionsQuery.isLoading}
            defaultItems={[]}
            onInputChange={onInputChange}
            onOpenChange={onOpenChange}
            onSelectionChange={onSelectionChange}
            onClear={handleClear}
            onBlur={handleSearch}
            onSubmit={handleSearch}
        >
            {filtered.map((item) => (
                <AutocompleteItem key={item} value={item}>
                    {item}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
};
