import { FC, Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { DumbbellSolid } from '../../icons/DumbbellSolid';
import { AuthContext } from '../../Auth/Auth';

export const Header: FC = () => {
    const { setUser } = useContext(AuthContext);

    const logout = () => {
        localStorage.clear();

        setUser(undefined);
    };

    return (
        <Disclosure
            as="nav"
            className="bg-primary-dark block fixed inset-x-0 top-0 z-10 shadow header"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-end">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <DumbbellSolid className="fill-secondary w-6 h-6" />
                    </div>
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
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <div className="overflow-hidden relative w-8 h-8 bg-gray-100 rounded-full dark:bg-gray-600">
                                        <svg
                                            className="absolute -left-1 w-10 h-10 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
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
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-card py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
