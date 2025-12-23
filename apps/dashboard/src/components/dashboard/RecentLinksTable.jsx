import React from 'react';

const RecentLinksTable = () => {
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-border-light dark:border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Performing Links</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="text-sm bg-slate-50 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-500 focus:ring-1 focus:ring-primary w-full sm:w-64"
                        placeholder="Filter links..."
                    />
                    <button className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-border-light dark:border-border-dark">
                            <th className="px-6 py-4">Short Link</th>
                            <th className="px-6 py-4">Original URL</th>
                            <th className="px-6 py-4">Date Created</th>
                            <th className="px-6 py-4 text-center">Clicks</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light dark:divide-border-dark text-sm">
                        {/* Row 1 */}
                        <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-primary hover:underline cursor-pointer">link.co/summer24</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 max-w-[200px] truncate text-slate-500 dark:text-slate-400">
                                https://myshop.com/products/summer-sale-2024-special-edition
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                Oct 24, 2023
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                    24.5k
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-primary transition-colors rounded-md hover:bg-primary/10" title="Copy">
                                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700" title="Edit">
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                                        <span className="material-symbols-outlined text-[18px]">qr_code</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-primary hover:underline cursor-pointer">link.co/webinar</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 max-w-[200px] truncate text-slate-500 dark:text-slate-400">
                                https://zoom.us/j/98237492834?pwd=xyz
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                Oct 22, 2023
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                                    8.2k
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-primary transition-colors rounded-md hover:bg-primary/10" title="Copy">
                                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700" title="Edit">
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                                        <span className="material-symbols-outlined text-[18px]">qr_code</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {/* Row 3 */}
                        <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-primary hover:underline cursor-pointer">link.co/portfolio</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 max-w-[200px] truncate text-slate-500 dark:text-slate-400">
                                https://alexdesign.io
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                Sep 15, 2023
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                                    1.1k
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-primary transition-colors rounded-md hover:bg-primary/10" title="Copy">
                                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700" title="Edit">
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                                        <span className="material-symbols-outlined text-[18px]">qr_code</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {/* Row 4 */}
                        <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-primary hover:underline cursor-pointer">link.co/yt-channel</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 max-w-[200px] truncate text-slate-500 dark:text-slate-400">
                                https://youtube.com/channel/UCx987sf87...
                            </td>
                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                Aug 02, 2023
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                                    980
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1.5 text-slate-400 hover:text-primary transition-colors rounded-md hover:bg-primary/10" title="Copy">
                                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700" title="Edit">
                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
                                        <span className="material-symbols-outlined text-[18px]">qr_code</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-border-light dark:border-border-dark flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Showing <span className="font-medium text-slate-900 dark:text-white">1</span> to <span className="font-medium text-slate-900 dark:text-white">4</span> of <span className="font-medium text-slate-900 dark:text-white">45</span> results</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm rounded-md border border-border-light dark:border-border-dark text-slate-500 dark:text-slate-400 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 text-sm rounded-md border border-border-light dark:border-border-dark text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800">Next</button>
                </div>
            </div>
        </div>
    );
};

export default RecentLinksTable;
