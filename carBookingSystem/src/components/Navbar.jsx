import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { 
    Bars3Icon, 
    XMarkIcon, 
    UserCircleIcon, 
    ArrowRightOnRectangleIcon, 
    ArrowPathIcon, 
    MagnifyingGlassIcon,
    HomeIcon,
    ArrowsRightLeftIcon,
    ArrowPathRoundedSquareIcon,
    CalculatorIcon,
    InformationCircleIcon,
    QuestionMarkCircleIcon,
    PhoneIcon,
    ChartBarIcon,
    ListBulletIcon,
    PlusCircleIcon,
    ShoppingBagIcon,
    SparklesIcon,
    TagIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import logo from "/src/assets/logo.png"
import { getCurrentUser, logout, isSeller, switchRole } from '../utils/auth';
import GlobalSearch from './GlobalSearch';

// Buy dropdown items
const buyCarLinks = [
    { name: 'Used Cars', href: '/cars/used', icon: TagIcon },
    { name: 'New Cars', href: '/cars/new', icon: SparklesIcon },
    { name: 'Certified Cars', href: '/cars/certified', icon: ShoppingBagIcon },
];

// Main navigation items - all visible on desktop
const publicNavigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Compare', href: '/compare', icon: ArrowsRightLeftIcon },
    { name: 'Trade-In', href: '/trade-in', icon: ArrowPathRoundedSquareIcon },
    { name: 'Estimator', href: '/estimator', icon: CalculatorIcon },
    { name: 'About', href: '/about', icon: InformationCircleIcon },
    { name: 'FAQs', href: '/faqs', icon: QuestionMarkCircleIcon },
    { name: 'Contact', href: '/contact', icon: PhoneIcon },
];

const sellerNavigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/seller/dashboard', icon: ChartBarIcon },
    { name: 'My Listings', href: '/seller/listings', icon: ListBulletIcon },
    { name: 'Add Car', href: '/seller/add-car', icon: PlusCircleIcon },
    { name: 'Compare', href: '/compare', icon: ArrowsRightLeftIcon },
    { name: 'Trade-In', href: '/trade-in', icon: ArrowPathRoundedSquareIcon },
    { name: 'Estimator', href: '/estimator', icon: CalculatorIcon },
    { name: 'Contact', href: '/contact', icon: PhoneIcon },
];



function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const userIsSeller = isSeller();
    const navigation = userIsSeller ? sellerNavigation : publicNavigation;
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        window.location.reload(); // Refresh to update navbar
    };

    const handleSwitchRole = () => {
        const newRole = userIsSeller ? 'buyer' : 'seller';
        const result = switchRole(newRole);
        if (result.success) {
            if (newRole === 'seller') {
                navigate('/seller/dashboard');
            } else {
                navigate('/');
            }
            window.location.reload(); // Refresh to update navbar
        }
    };

    return (
        <>
        <Disclosure as="nav" className="bg-white/80 backdrop-blur-2xl shadow-lg sticky w-full top-0 z-50 border-b border-purple-100/50">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">

                            {/* Logo */}
                            <motion.div 
                                className="flex items-center"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link to="/" className="flex shrink-0 items-center gap-1 group transition-all duration-300 hover:opacity-80 hover:scale-105">
                                    <motion.img 
                                        src={logo} 
                                        alt="" 
                                        width={"50"}
                                        whileHover={{ rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />
                    <span className="font-bold text-xl bg-gradient-to-r from-purple-700 via-purple-600 to-cyan-600 bg-clip-text text-transparent whitespace-nowrap">
                    <p>AutoChoice</p>
                  </span>
                                </Link>
                            </motion.div>


                            {/* Desktop Navigation */}
                            <motion.div 
                                className="hidden lg:flex lg:items-center lg:gap-x-1"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {/* Buy Dropdown */}
                                <div className="relative group">
                                    <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 relative hover:scale-105 whitespace-nowrap">
                                        Buy Cars
                                        <ChevronDownIcon className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
                                    </button>
                                    <div className="absolute z-10 mt-2 w-48 origin-top-left rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-purple-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out scale-95 group-hover:scale-100 p-2">
                                        <div className="py-1">
                                            {buyCarLinks.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.name}
                                                        to={item.href}
                                                        className="text-gray-900 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 hover:text-white transition-all duration-200"
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                        {item.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Main Navigation Links */}
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <NavLink
                                            key={item.name}
                                            to={item.href}
                                            className={({ isActive }) => classNames(
                                                isActive
                                                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                                                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700',
                                                'rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap inline-flex items-center gap-1'
                                            )}
                                        >
                                            <Icon className="h-3.5 w-3.5" />
                                            {item.name}
                                        </NavLink>
                                    );
                                })}
                            </motion.div>

                            {/* Right side buttons */}
                            <motion.div 
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {/* Search Button */}
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="hidden lg:inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:scale-110 active:scale-95 transition-all duration-200"
                                    aria-label="Search"
                                >
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                </button>

                                {/* Conditional rendering based on login status */}
                                {currentUser ? (
                                    <Menu as="div" className="relative hidden lg:block">
                                        <MenuButton className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 hover:scale-105 active:scale-95 transition-all duration-200">
                                            <UserCircleIcon className="h-5 w-5" />
                                            <span>{currentUser.name}</span>
                                            <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                                        </MenuButton>
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-2xl border border-purple-100 focus:outline-none p-2">
                                            <MenuItem>
                                                <div className="px-4 py-3 border-b border-purple-100">
                                                    <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                                                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                                                    <p className="text-xs text-purple-600 mt-1 capitalize font-medium">{currentUser.role}</p>
                                                </div>
                                            </MenuItem>
                                            {userIsSeller && (
                                                <>
                                                    <MenuItem>
                                                        <Link
                                                            to="/seller/dashboard"
                                                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 data-focus:bg-purple-50 data-focus:text-purple-700 rounded-lg"
                                                        >
                                                            Dashboard
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Link
                                                            to="/seller/listings"
                                                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 data-focus:bg-purple-50 data-focus:text-purple-700 rounded-lg"
                                                        >
                                                            My Listings
                                                        </Link>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Link
                                                            to="/seller/add-car"
                                                            className="block px-4 py-2.5 text-sm font-medium text-gray-700 data-focus:bg-purple-50 data-focus:text-purple-700 rounded-lg"
                                                        >
                                                            Add Car
                                                        </Link>
                                                    </MenuItem>
                                                </>
                                            )}
                                            <MenuItem>
                                                <Link
                                                    to="/seller/profile"
                                                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 data-focus:bg-purple-50 data-focus:text-purple-700 rounded-lg"
                                                >
                                                    Profile
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    onClick={handleSwitchRole}
                                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-cyan-600 data-focus:bg-cyan-50 rounded-lg"
                                                >
                                                    <ArrowPathIcon className="h-4 w-4" />
                                                    {userIsSeller ? 'Switch to Buyer Mode' : 'Switch to Seller Mode'}
                                                </button>
                                            </MenuItem>
                                            <MenuItem>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-600 data-focus:bg-rose-50 rounded-lg"
                                                >
                                                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                                                    Logout
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                ) : (
                                    <>
                                        {/* Sell Your Car Button */}
                                        <Link
                                            to="/signup?as=seller"
                                            className="hidden lg:inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-green-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Sell Your Car
                                        </Link>
                                        {/* Login Button */}
                                        <Link
                                            to="/login"
                                            className="hidden lg:inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                                        >
                                            <UserCircleIcon className="h-5 w-5" />
                                            Login
                                        </Link>
                                    </>
                                )}

                                {/* Mobile menu button */}
                                <div className="flex lg:hidden">
                                    <DisclosureButton className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-200">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6 transition-transform duration-200 rotate-90" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6 transition-transform duration-200" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile & Tablet Menu Panel */}
                    <DisclosurePanel className="lg:hidden border-t border-gray-200/50 bg-white backdrop-blur-md shadow-xl">
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="space-y-1 px-4 pb-6 pt-4 max-h-[calc(100vh-4rem)] overflow-y-auto"
                        >

                            {/* Mobile "Buy Cars" Accordion */}
                            <Disclosure as="div" className="space-y-1">
                                {({ open: isOpen }) => (
                                    <>
                                        <DisclosureButton className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold text-gray-900 hover:bg-purple-50 hover:text-purple-700 transition-all duration-200 border-2 border-transparent hover:border-purple-200">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                <span>Buy Cars</span>
                                            </div>
                                            <ChevronDownIcon
                                                className={classNames(
                                                    isOpen ? 'rotate-180' : '',
                                                    'h-5 w-5 text-purple-500 transition-transform duration-300'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </DisclosureButton>
                                        <DisclosurePanel className="space-y-1 pl-4 mt-2">
                                            {buyCarLinks.map((item, index) => {
                                                const Icon = item.icon;
                                                return (
                                                    <motion.div
                                                        key={item.name}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                    >
                                                        <DisclosureButton
                                                            as={Link}
                                                            to={item.href}
                                                            className="flex items-center gap-2 rounded-lg py-2.5 pl-4 pr-3 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                                        >
                                                            <Icon className="h-4 w-4 text-purple-600" />
                                                            {item.name}
                                                        </DisclosureButton>
                                                    </motion.div>
                                                );
                                            })}
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>

                            {/* Mobile Navigation Links */}
                            {navigation.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <DisclosureButton
                                            as={NavLink}
                                            to={item.href}
                                            className={({ isActive }) => classNames(
                                                isActive
                                                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                                                    : 'text-gray-900 hover:bg-purple-50 hover:text-purple-700 border-2 border-transparent hover:border-purple-200',
                                                'flex items-center gap-2 rounded-2xl px-4 py-3.5 text-base font-bold transition-all duration-200'
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                            {item.name}
                                        </DisclosureButton>
                                    </motion.div>
                                );
                            })}

                            <div className="pt-4 mt-4 border-t-2 border-gray-200">
                                {/* Mobile User Section */}
                                {currentUser ? (
                                    <div className="space-y-3">
                                        <div className="px-4 py-3.5 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-2xl border-2 border-purple-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                                    {currentUser.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{currentUser.name}</p>
                                                    <p className="text-xs text-gray-600">{currentUser.email}</p>
                                                    <p className="text-xs text-purple-700 mt-0.5 capitalize font-semibold">{currentUser.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {userIsSeller && (
                                            <>
                                                <DisclosureButton
                                                    as={Link}
                                                    to="/seller/add-car"
                                                    className="block w-full text-center rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 text-base font-bold text-white shadow-lg hover:shadow-xl"
                                                >
                                                    Add Car
                                                </DisclosureButton>
                                            </>
                                        )}
                                        <button
                                            onClick={handleSwitchRole}
                                            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-cyan-300 px-4 py-3.5 text-base font-bold text-cyan-600 hover:bg-cyan-50 transition-all active:scale-95"
                                        >
                                            <ArrowPathIcon className="h-5 w-5" />
                                            <span>{userIsSeller ? 'Switch to Buyer' : 'Switch to Seller'}</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-rose-300 px-4 py-3.5 text-base font-bold text-rose-600 hover:bg-rose-50 transition-all active:scale-95"
                                        >
                                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {/* Sell Your Car Button - Mobile */}
                                        <DisclosureButton
                                            as={Link}
                                            to="/signup?as=seller"
                                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
                                        >
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            <span>Sell Your Car</span>
                                        </DisclosureButton>
                                        {/* Login Button - Mobile */}
                                        <DisclosureButton
                                            as={Link}
                                            to="/login"
                                            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
                                        >
                                            <UserCircleIcon className="h-6 w-6" />
                                            <span>Login</span>
                                        </DisclosureButton>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
        <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
