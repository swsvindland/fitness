import { MacroGrid } from './MacroGrid';
import Link from 'next/link';
import { Meals } from '~/app/_components/Food/Meals';
import { FC } from 'react';

export const Eat: FC = async () => {
    return (
        <div className="container">
            <div className="grid w-full grid-cols-1 gap-2">
                <MacroGrid />
                <Meals />
            </div>
            <div className="float-right my-2">
                <Link href="https://platform.fatsecret.com" target="_blank">
                    <img
                        src="https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.svg"
                        alt="Powered by Fat Secret"
                    />
                </Link>
            </div>
        </div>
    );
};
