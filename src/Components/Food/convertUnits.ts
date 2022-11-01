import { Units } from '../../types/Units';

export const ounceToGram = (ounce: number) => {
    return ounce * 28.3495;
};

export const gramToOunce = (gram: number) => {
    return gram * 0.035274;
};

export const poundToGram = (pound: number) => {
    return pound * 453.592;
};

export const gramToPound = (gram: number) => {
    return gram * 0.00220462;
};

export const kilogramToGram = (kilogram: number) => {
    return kilogram * 1000;
};

export const gramToKilogram = (gram: number) => {
    return gram * 0.001;
};

export const pinchToGram = (pinch: number) => {
    return pinch * 0.5;
};

export const gramToPinch = (gram: number) => {
    return gram * 2;
};

export const literToGram = (liter: number) => {
    return liter * 1000;
};

export const gramToLiter = (gram: number) => {
    return gram * 0.001;
};

export const fluidOunceToGram = (fluidOunce: number) => {
    return fluidOunce * 28.3495;
};

export const gramToFluidOunce = (gram: number) => {
    return gram * 0.035274;
};

export const gallonToGram = (gallon: number) => {
    return gallon * 3785.41;
};

export const gramToGallon = (gram: number) => {
    return gram * 0.000264172;
};

export const pintToGram = (pint: number) => {
    return pint * 473.176;
};

export const gramToPint = (gram: number) => {
    return gram * 0.00211338;
};

export const quartToGram = (quart: number) => {
    return quart * 946.353;
};

export const gramToQuart = (gram: number) => {
    return gram * 0.00105669;
};

export const milliliterToGram = (milliliter: number) => {
    return milliliter;
};

export const gramToMilliliter = (gram: number) => {
    return gram;
};

export const dropToGram = (drop: number) => {
    return drop * 0.05;
};

export const gramToDrop = (gram: number) => {
    return gram * 20;
};

export const cupToGram = (cup: number) => {
    return cup * 236.588;
};

export const gramToCup = (gram: number) => {
    return gram * 0.00422675;
};

export const tablespoonToGram = (tablespoon: number) => {
    return tablespoon * 14.7868;
};

export const gramToTablespoon = (gram: number) => {
    return gram * 0.067628;
};

export const convertFromUnitToGrams = (
    amount: number,
    unit: Units,
    servingSizeGrams: number
) => {
    switch (unit) {
        case Units.Serving:
            return amount * servingSizeGrams;
        case Units.Ounce:
            return ounceToGram(amount);
        case Units.Cup:
            return cupToGram(amount);
        case Units.Gallon:
            return gallonToGram(amount);
        case Units.Kilogram:
            return kilogramToGram(amount);
        case Units.Liter:
            return literToGram(amount);
        case Units.Milliliter:
            return milliliterToGram(amount);
        case Units.Pint:
            return pintToGram(amount);
        case Units.Pound:
            return poundToGram(amount);
        case Units.Quart:
            return quartToGram(amount);
        case Units.FluidOunce:
            return fluidOunceToGram(amount);
        case Units.Drop:
            return dropToGram(amount);
        case Units.Tablespoon:
            return tablespoonToGram(amount);
        case Units.Teaspoon:
            return tablespoonToGram(amount) / 3;
        case Units.Pinch:
            return pinchToGram(amount);
        case Units.Gram:
            return amount;
        default:
            return amount;
    }
};

export const convertFromGramsToUnit = (
    amount: number,
    unit: Units,
    servingSizeGrams: number
) => {
    switch (unit) {
        case Units.Serving:
            return amount / servingSizeGrams;
        case Units.Ounce:
            return gramToOunce(amount);
        case Units.Cup:
            return gramToCup(amount);
        case Units.Gallon:
            return gramToGallon(amount);
        case Units.Kilogram:
            return gramToKilogram(amount);
        case Units.Liter:
            return gramToLiter(amount);
        case Units.Milliliter:
            return gramToMilliliter(amount);
        case Units.Pint:
            return gramToPint(amount);
        case Units.Pound:
            return gramToPound(amount);
        case Units.Quart:
            return gramToQuart(amount);
        case Units.FluidOunce:
            return gramToFluidOunce(amount);
        case Units.Drop:
            return gramToDrop(amount);
        case Units.Tablespoon:
            return gramToTablespoon(amount);
        case Units.Teaspoon:
            return gramToTablespoon(amount) / 3;
        case Units.Pinch:
            return gramToPinch(amount);
        case Units.Gram:
            return amount;
        default:
            return amount;
    }
};
