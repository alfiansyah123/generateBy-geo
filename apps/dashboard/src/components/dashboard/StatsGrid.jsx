import React from 'react';

const StatsGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                        <span className="material-symbols-outlined">ads_click</span>
                    </div>
                    <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
                        +12%
                    </span>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Clicks</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">124,592</p>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                        <span className="material-symbols-outlined">today</span>
                    </div>
                    <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px] mr-1">trending_up</span>
                        +5%
                    </span>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Today's Clicks</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,204</p>
            </div>
            {/* Stat Card 3 */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                        <span className="material-symbols-outlined">link</span>
                    </div>
                    <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                        +2 new
                    </span>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Links</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">45</p>
            </div>
            {/* Stat Card 4 */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg">
                        <span className="material-symbols-outlined">public</span>
                    </div>
                    <span className="flex items-center text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                        No change
                    </span>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Domains</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">2</p>
            </div>
        </div>
    );
};

export default StatsGrid;
