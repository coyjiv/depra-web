// import classNames from "classnames"
import Link from "next/link"
import { BiCreditCard } from "react-icons/bi"
import { FaUserInjured } from "react-icons/fa6"
import { GiOfficeChair } from "react-icons/gi"
import { PiUserCircleDuotone } from "react-icons/pi"

const tabs = [
    { name: 'My Account', href: '#', icon: PiUserCircleDuotone, current: false },
    { name: 'Company', href: '#', icon: GiOfficeChair, current: false },
    { name: 'Team Members', href: '#', icon: FaUserInjured, current: true },
    { name: 'Billing', href: '#', icon: BiCreditCard, current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const BottomTabNavigator = () => {
    return (
        <div className="fixed bottom-0 w-screen sm:max-w-xl sm:left-1/2 sm:-translate-x-1/2 sm:bottom-8 sm:rounded-2xl border-b border-gray-200 bg-green-800/40 px-3 rounded-t-2xl">
            <div className="">
                <nav className=" flex flex-1 space-x-1 justify-between sm:space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                                tab.current
                                    ? 'border-green-500 text-white'
                                    : 'border-transparent text-green-900',
                                'group sm:gap-3 flex-col sm:flex-row inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                        >
                            <tab.icon
                                className={classNames(
                                    tab.current ? 'text-white' : 'text-green-900',
                                    '-ml-0.5 h-5 w-5'
                                )}
                                aria-hidden="true"
                            />
                            <span>{tab.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default BottomTabNavigator