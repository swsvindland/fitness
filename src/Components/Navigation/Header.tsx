import { FC, Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';
import { ArrowBackSolid } from '../Icons/ArrowBackSolid';
import { useHistory } from 'react-router-dom';
import { HeaderContext } from './HeaderContext';
import { UserSolid } from '../Icons/UserSolid';
import { Dumbbell } from '../Icons/Dumbbell';
import { PurchaseAccessIcon } from '../Purchase/PurchaseAccessIcon';

export const Header: FC = () => {
    const { setUser } = useContext(AuthContext);
    const { goBack } = useContext(HeaderContext);
    const history = useHistory();

    const logout = () => {
        localStorage.clear();

        setUser(undefined);
    };

    return (
        <Disclosure
            as="nav"
            className="bg-primary-dark dark:bg-background block fixed inset-x-0 top-0 z-10 shadow pt-safe"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {goBack ? (
                        <div className="flex flex-1 items-center">
                            <button
                                type="button"
                                onClick={() => history.goBack()}
                            >
                                <ArrowBackSolid className="fill-secondary w-6 h-6" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-1 items-center">
                            <Dumbbell className="fill-secondary w-10 h-10" />
                        </div>
                    )}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* TODO: Add back with notifications */}
                        {/*<button*/}
                        {/*    type="button"*/}
                        {/*    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"*/}
                        {/*>*/}
                        {/*    <span className="sr-only">View notifications</span>*/}
                        {/*    <BellIcon className="h-6 w-6" aria-hidden="true" />*/}
                        {/*</button>*/}

                        {/* Profile dropdown */}
                        <PurchaseAccessIcon />
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <div className="overflow-hidden w-8 h-8 bg-ternary rounded-full flex justify-center items-center">
                                        <UserSolid className="w-5 h-5 fill-primary-dark" />
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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md card py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        <Link
                                            to="/settings"
                                            className={
                                                'block px-4 py-2 text-sm text-ternary hover:bg-primary-dark'
                                            }
                                        >
                                            Settings
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a
                                            href="https://svindland.dev/terms.html"
                                            target="_blank"
                                            rel="noreferrer"
                                            className={
                                                'block px-4 py-2 text-sm text-ternary hover:bg-primary-dark'
                                            }
                                        >
                                            Terms &amp; Conditions
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <a
                                            href="https://svindland.dev/privacy.html"
                                            target="_blank"
                                            rel="noreferrer"
                                            className={
                                                'block px-4 py-2 text-sm text-ternary hover:bg-primary-dark'
                                            }
                                        >
                                            Privacy Policy
                                        </a>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button
                                            onClick={logout}
                                            className={
                                                'block px-4 py-2 text-sm text-ternary hover:bg-primary-dark w-full text-left'
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
