import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { FaChartBar, FaHome } from "react-icons/fa";
import { AiOutlineHourglass } from "react-icons/ai";
import { SlNotebook } from "react-icons/sl";
import { AiOutlineSetting } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import { FaBars } from "react-icons/fa6";
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { SignOutButton } from "@/components/buttons/buttons";
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigationScheme = [
    { name: 'Dashboard', href: '/', icon: FaHome, current: true },
    { name: 'Progress', href: '/progress', icon: FaChartBar, current: false },
    { name: 'Tests', href: '/tests', icon: AiOutlineHourglass, current: false },
    { name: 'Notebook', href: '/notebook', icon: SlNotebook, current: false },
    { name: 'Settings', href: '/settings', icon: AiOutlineSetting, current: false },
]

const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
    const [ sidebarOpen, setSidebarOpen ] = useState(false)
    const session = useSession()

    const router = useRouter();
    const { pathname } = router;

    const navigation = navigationScheme.map(item => ({
        ...item,
        current: pathname === item.href
    }));
    return (
        <>
            <div>
                <Transition show={sidebarOpen}>
                    <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <TransitionChild
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </TransitionChild>

                        <div className="fixed inset-0 flex">
                            <TransitionChild
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <TransitionChild
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <HiXMark className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </TransitionChild>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-green-100 px-6 pb-2">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <Image
                                                width={100} height={100}
                                                className="h-8 w-auto"
                                                src="/logo.png"
                                                alt="Depra logo"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {navigation.map((item) => (
                                                            <li key={item.name}>
                                                                <Link
                                                                    href={item.href}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-green-800/40 text-white'
                                                                            : 'text-gray-800 hover:text-white hover:bg-green-700',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.current ? 'text-white' : '-gray-800 group-hover:text-white',
                                                                            'h-6 w-6 shrink-0'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-green-800/40 px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <Image
                                width={100} height={100}
                                className="h-8 w-auto"
                                src="/logo.png"
                                alt="Your Company"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-green-800/80 text-white'
                                                            : 'text-gray-800 hover:text-white hover:bg-green-800/80',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.current ? 'text-white' : 'text-gray-800 group-hover:text-white',
                                                            'h-6 w-6 shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="-mx-6 mt-auto">
                                    <Link
                                        href="#"
                                        className="flex items-center rounded-t-xl overflow-hidden gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-green-800/40"
                                    >
                                        <Image
                                            width={100} height={100}
                                            className="h-8 w-8 rounded-full bg-green-800"
                                            src="/avatar.png"
                                            alt=""
                                        />
                                        <span className="sr-only">Your profile</span>
                                        <span aria-hidden="true" className='text-gray-800 text-ellipsis '>{session?.data?.user?.email}</span>
                                        <span><SignOutButton /></span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="lg:pl-72 bg-green-200">
                <div className="sticky rounded-b-2xl overflow-clip top-0 z-40 flex items-center gap-x-6 bg-green-800/40 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button type="button" className="-m-2.5 p-2.5 text-indigo-200 lg:hidden" onClick={() => setSidebarOpen(true)}>

                        <FaBars className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
                    <Link href="#">
                        <span className="sr-only">Your profile</span>
                        <Image
                            width={100} height={100}
                            className="h-8 w-8 rounded-full bg-green-700"
                            src="/avatar.png"
                            alt=""
                        />
                    </Link>
                </div>
            </div>
        </>
    )
}
