'use client';

import { useState } from 'react';
import Link from 'next/link';
import AuthModal from './AuthModal';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <header className="bg-background border-b border-primary/30">
            <div className="container-custom py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-white font-bold text-xl">GF</span>
                        </div>
                        <span className="text-white font-bold text-xl">GameForum</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="nav-link font-medium">Home</Link>
                        <Link href="/categories" className="nav-link font-medium">Categories</Link>
                        <Link href="/popular" className="nav-link font-medium">Popular</Link>
                        <Link href="/recent" className="nav-link font-medium">Recent</Link>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search forums..."
                                className="bg-secondary border border-primary/30 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </nav>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-4">

                        <button
                            className="btn-primary"
                            onClick={() => {
                                setIsAuthModalOpen(true);
                            }}
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/" className="nav-link font-medium">Home</Link>
                            <Link href="/categories" className="nav-link font-medium">Categories</Link>
                            <Link href="/popular" className="nav-link font-medium">Popular</Link>
                            <Link href="/recent" className="nav-link font-medium">Recent</Link>
                            <div className="pt-2">
                                <input
                                    type="text"
                                    placeholder="Search forums..."
                                    className="w-full bg-secondary border border-primary/30 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>
                            <div className="flex space-x-4 pt-2">

                                <button
                                    className="btn-primary flex-1"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsAuthModalOpen(true);
                                    }}
                                >
                                    Sign In
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>

            {/* Auth Modal */}
            <AuthModal
                open={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </header>
    );
};

export default Navbar;