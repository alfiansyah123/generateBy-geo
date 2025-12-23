import React from 'react';

const Header = () => {
    return (
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-6 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark sticky top-0 z-10">
            {/* Mobile Menu Toggle (Visible only on small screens) */}
            <button className="md:hidden p-2 text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined">menu</span>
            </button>
            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md">
                <div className="relative w-full text-slate-500 dark:text-slate-400">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Search links, domains..."
                    />
                </div>
            </div>
            {/* Right side - empty for now */}
            <div></div>
        </header>
    );
};

export default Header;
