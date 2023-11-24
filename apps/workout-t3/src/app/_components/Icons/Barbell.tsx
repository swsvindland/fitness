import { FC } from 'react';
import { IconProps } from './IconProps';

export const Barbell: FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            width="50"
            height="50"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.71238 37C8.55979 37 7.62542 36.0656 7.62542 34.913L7.62542 15.087C7.62542 13.9344 8.55979 13 9.71238 13C10.865 13 11.7993 13.9344 11.7993 15.087V23.4348H37.8863V15.087C37.8863 13.9344 38.8207 13 39.9733 13C41.1258 13 42.0602 13.9344 42.0602 15.087V34.913C42.0602 36.0656 41.1258 37 39.9733 37C38.8207 37 37.8863 36.0656 37.8863 34.913V26.5652H11.7993V34.913C11.7993 36.0656 10.865 37 9.71238 37Z" />
            <path d="M2.56522 23.4348C1.70077 23.4348 1 24.1356 1 25C1 25.8644 1.70077 26.5652 2.56522 26.5652H6.58195V23.4348H2.56522Z" />
            <path d="M47.4348 26.5652H43.1037V23.4348H47.4348C48.2992 23.4348 49 24.1356 49 25C49 25.8644 48.2992 26.5652 47.4348 26.5652Z" />
        </svg>
    );
};
