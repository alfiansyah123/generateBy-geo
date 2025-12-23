import React from 'react';
import StatsGrid from '../components/dashboard/StatsGrid';
import ChartsSection from '../components/dashboard/ChartsSection';
import RecentLinksTable from '../components/dashboard/RecentLinksTable';

const Dashboard = () => {
    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                {/* Breadcrumbs */}
                <nav className="flex text-sm font-medium text-slate-500 dark:text-slate-400">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <a href="#" className="hover:text-primary transition-colors">Home</a>
                            <span className="material-symbols-outlined text-[16px] mx-2">chevron_right</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-slate-900 dark:text-white">Dashboard</span>
                        </li>
                    </ol>
                </nav>
                {/* Page Heading */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h2>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Welcome back, here is what's happening with your links today.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark p-1 rounded-lg border border-border-light dark:border-border-dark shadow-sm">
                        <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm">7 Days</button>
                        <button className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">30 Days</button>
                        <button className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">90 Days</button>
                    </div>
                </div>

                <StatsGrid />
                <ChartsSection />
                <RecentLinksTable />
            </div>
        </main>
    );
};

export default Dashboard;
