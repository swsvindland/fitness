import { FC } from 'react';

interface IProps {
    selected: number;
    setSelected: (selected: number) => void;
    pages: number;
}

export const Pagination: FC<IProps> = ({ selected, setSelected, pages }) => {
    return (
        <nav className="px-4 py-2 mb-2 flex items-center justify-center sm:px-0">
            <div className="">
                {Array.from(Array(pages).keys()).map((_, index) => (
                    <button
                        onClick={() => {
                            setSelected(index + 1);
                        }}
                        className={`${
                            selected === index + 1
                                ? 'bg-ternary text-primary-dark'
                                : 'bg-primary-dark text-secondary-light'
                        } mx-2 px-4 py-2 rounded-full text-sm font-medium`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </nav>
    );
};
