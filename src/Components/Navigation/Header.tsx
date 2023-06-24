import { type FC, Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';
import { ArrowBackSolid } from '../Icons/ArrowBackSolid';
import { useHistory } from 'react-router-dom';
import { HeaderContext } from './HeaderContext';
import { UserSolid } from '../Icons/UserSolid';
import { Dumbbell } from '../Icons/Dumbbell';
import { PurchaseAccessIcon } from '../Purchase/PurchaseAccessIcon';
import { signOut } from '../../utils/auth';

export const Header: FC = () => {
    const { setUser } = useContext(AuthContext);
    const { goBack } = useContext(HeaderContext);
    const history = useHistory();

    const logout = async () => {
        try {
            await signOut();
        } finally {
            localStorage.clear();

            setUser(undefined);
        }
    };

    return (
        <Disclosure
            as="nav"
            className="fixed inset-x-0 top-0 z-10 block bg-white shadow pt-safe dark:bg-teal-800"
        >
            <div className="container mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {goBack ? (
                        <div className="flex flex-1 items-center">
                            <button
                                type="button"
                                onClick={() => history.goBack()}
                            >
                                <ArrowBackSolid className="h-6 w-6 fill-white" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-1 items-center">
                            <Dumbbell className="h-10 w-10 fill-teal-400 dark:fill-white" />
                        </div>
                    )}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <PurchaseAccessIcon />
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-teal-400 dark:bg-white">
                                        <UserSolid className="h-5 w-5 fill-white dark:fill-teal-800" />
                                    </div>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="card absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        <Link
                                            to="/settings"
                                            className={
                                                'text-ternary hover:bg-primary-dark block px-4 py-2 text-sm'
                                            }
                                        >
                                            Settings
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a
                                            href="https://workout-track.com/terms"
                                            target="_blank"
                                            rel="noreferrer"
                                            className={
                                                'text-ternary hover:bg-primary-dark block px-4 py-2 text-sm'
                                            }
                                        >
                                            Terms &amp; Conditions
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a
                                            href="https://workout-track.com/privacy"
                                            target="_blank"
                                            rel="noreferrer"
                                            className={
                                                'text-ternary hover:bg-primary-dark block px-4 py-2 text-sm'
                                            }
                                        >
                                            Privacy Policy
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            onClick={logout}
                                            className={
                                                'text-ternary hover:bg-primary-dark block w-full px-4 py-2 text-left text-sm'
                                            }
                                        >
                                            Sign out
                                        </button>
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
};
