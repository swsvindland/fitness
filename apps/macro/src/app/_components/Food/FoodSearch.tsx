import { FC, useEffect, useMemo, useState } from 'react';
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

interface IOption {
    key: string;
    value: string;
}

export const FoodSearch: FC<IProps> = ({ field, setField }) => {
    const [filtered, setFiltered] = useState<IOption[]>([]);

    const optionsQuery = api.food.autocomplete.useQuery(
        {
            query: field.inputValue,
        },
        { enabled: field.inputValue?.length > 0 }
    );

    useEffect(() => {
        if (optionsQuery.data && optionsQuery.data.length > 0) {
            setFiltered(
                optionsQuery.data.map((item) => ({ key: item, value: item }))
            );
        }
    }, [optionsQuery.data]);

    const handleClear = () => {
        setField({
            selectedKey: '',
            inputValue: '',
        });

        setFiltered([]);
    };

    const onSelectionChange = (key: string | number) => {
        const newSelectedItem = filtered.find((option) => option.key === key);

        setField({
            selectedKey: newSelectedItem?.key ?? null,
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

    console.log(filtered);

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
            {(item) => (
                <AutocompleteItem key={item.key}>{item.value}</AutocompleteItem>
            )}
        </Autocomplete>
    );
};
