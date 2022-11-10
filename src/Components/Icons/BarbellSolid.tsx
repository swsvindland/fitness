import { FC } from 'react';
import { IconProps } from './IconProps';

export const BarbellSolid: FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            width="100%"
            height="100%"
            viewBox="0 0 640 512"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
        >
            <g transform="matrix(1.4056,0,0,1,-126.761,0)">
                <path d="M112,96C112,78.3 126.3,64 144,64L160,64C177.7,64 192,78.3 192,96L192,416C192,433.7 177.7,448 160,448L144,448C126.3,448 112,433.7 112,416L112,96ZM528,96L528,416C528,433.7 513.7,448 496,448L480,448C462.3,448 448,433.7 448,416L448,96C448,78.3 462.3,64 480,64L496,64C513.7,64 528,78.3 528,96ZM416,224L416,288L224,288L224,224L416,224Z" />
            </g>
        </svg>
    );
};
