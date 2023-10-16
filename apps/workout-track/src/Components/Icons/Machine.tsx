import { FC } from 'react';
import { IconProps } from './IconProps';

export const Machine: FC<IconProps> = (props) => {
    return (
        <svg
            {...props}
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.1875 46.9373C6.53166 46.9373 6 46.4057 6 45.7498V4.18749C6 3.53166 6.53166 3 7.18749 3H25.7975C26.4533 3 26.985 3.53166 26.985 4.18749V32.4626L28.8342 32.7727C29.481 32.8811 29.9174 33.4934 29.8089 34.1402L29.3128 37.0982C29.2044 37.745 28.5921 38.1814 27.9453 38.073L26.985 37.9119V45.7498H38.7297L41.4539 29.4074L38.137 28.7078L36.6812 38.4469C36.5842 39.0955 35.9798 39.5427 35.3312 39.4458L32.3951 39.0069C31.7465 38.9099 31.2992 38.3055 31.3962 37.6569L35.8888 7.60172C35.9857 6.9531 36.5901 6.50588 37.2388 6.60283L40.1749 7.04172C40.8235 7.13867 41.2707 7.74309 41.1738 8.39172L38.4887 26.3548L43.0574 27.3183C43.6798 27.4496 44.0883 28.048 43.9837 28.6755L40.907 47.1326C40.8115 47.7051 40.3161 48.1248 39.7357 48.1248H22.3011C21.7295 48.1248 21.239 47.7176 21.1338 47.1558L19.158 36.5993L16.9405 36.2274C16.2937 36.119 15.8573 35.5067 15.9658 34.8599L16.4619 31.9019C16.5703 31.2551 17.1826 30.8187 17.8294 30.9271L24.0162 31.9647V5.96874H8.96874V46.9373H7.1875ZM24.0162 37.4141L21.6526 37.0177L23.2869 45.7498H24.0162V37.4141Z"
            />
            <path d="M13.125 44.5623C14.4366 44.5623 15.5 43.499 15.5 42.1873C15.5 40.8757 14.4366 39.8123 13.125 39.8123C11.8133 39.8123 10.75 40.8757 10.75 42.1873C10.75 43.499 11.8133 44.5623 13.125 44.5623Z" />
        </svg>
    );
};