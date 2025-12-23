import React from 'react';
import { Link } from 'react-router-dom';

const LinksPage = () => {
    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
            {/* Top Scrollable Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto max-w-[1200px] px-6 py-8">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <a href="#" className="text-gray-500 hover:text-[#6467f2] text-sm font-medium transition-colors">Dashboard</a>
                        <span className="text-gray-400 text-sm font-medium">/</span>
                        <span className="text-[#0d0e1b] dark:text-white text-sm font-medium">Links</span>
                    </div>

                    {/* Header & Actions */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                        <div className="flex flex-col gap-2 max-w-xl">
                            <h1 className="text-[#0d0e1b] dark:text-white text-3xl font-black leading-tight tracking-tight">All Links</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-base font-normal">Manage, track, and optimize your short URLs from a single dashboard.</p>
                        </div>
                        <div className="flex gap-3 items-center self-start">
                            <Link to="/links/new?tab=bulk" className="flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-lg">upload_file</span>
                                <span className="truncate">Bulk Upload</span>
                            </Link>
                            <Link to="/links/new" className="flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-[#6467f2] hover:bg-[#5255d6] text-white text-sm font-bold shadow-md transition-all">
                                <span className="material-symbols-outlined text-lg">add</span>
                                <span className="truncate">Create Link</span>
                            </Link>
                        </div>
                    </div>

                    {/* Filters & Search Toolbar */}
                    <div className="bg-white dark:bg-[#1a1b2e] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-4 mb-6">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="flex-1">
                                <label className="relative flex w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                        <span className="material-symbols-outlined text-[20px]">search</span>
                                    </div>
                                    <input
                                        className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-[#6467f2] focus:border-[#6467f2] placeholder:text-gray-400"
                                        placeholder="Search by alias, target URL, or tag..."
                                        type="text"
                                    />
                                </label>
                            </div>
                            {/* Filters Group */}
                            <div className="flex flex-wrap gap-3">
                                {/* Domain Filter */}
                                <div className="relative min-w-[160px]">
                                    <select className="block w-full appearance-none rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 pl-3 pr-8 text-sm text-gray-700 dark:text-gray-200 focus:border-[#6467f2] focus:outline-none focus:ring-[#6467f2]">
                                        <option>All Domains</option>
                                        <option>shrt.co</option>
                                        <option>link.me</option>
                                        <option>custom.domain</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                                {/* Status Filter */}
                                <div className="relative min-w-[140px]">
                                    <select className="block w-full appearance-none rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2.5 pl-3 pr-8 text-sm text-gray-700 dark:text-gray-200 focus:border-[#6467f2] focus:outline-none focus:ring-[#6467f2]">
                                        <option>All Status</option>
                                        <option>Active</option>
                                        <option>Expired</option>
                                        <option>Disabled</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </div>
                                </div>
                                <button className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-[#6467f2] transition-colors">
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="bg-white dark:bg-[#1a1b2e] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Short Link</th>
                                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Original URL</th>
                                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Clicks</th>
                                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date Created</th>
                                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                                        <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {/* Row 1 */}
                                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded bg-[#e7e7f3] dark:bg-gray-700 text-[#6467f2] dark:text-[#8a8dff]">
                                                    <span className="material-symbols-outlined text-[18px]">link</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#0d0e1b] dark:text-white text-sm">shrt.co/summer24</span>
                                                    <span className="text-xs text-gray-400">Marketing</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 max-w-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="size-4 rounded-sm bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] text-gray-500">A</div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate font-mono">https://amazon.com/promotion/campaign/summer-sale-2024?ref=...</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-gray-900 dark:text-white">1,240</span>
                                                <span className="text-[11px] text-green-600 flex items-center gap-0.5">
                                                    <span className="material-symbols-outlined text-[12px]">trending_up</span> 12%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-500">Oct 24, 2023</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                                <span className="size-1.5 rounded-full bg-green-500"></span>
                                                Active
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-gray-400 hover:text-[#6467f2] hover:bg-[#6467f2]/10 rounded transition-colors" title="Copy Link">
                                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors" title="Edit">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Delete">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded bg-[#e7e7f3] dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                                                    <span className="material-symbols-outlined text-[18px]">language</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#0d0e1b] dark:text-white text-sm">mybrand.co/product</span>
                                                    <span className="text-xs text-gray-400">Social</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 max-w-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="size-4 rounded-sm bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] text-gray-500">S</div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate font-mono">https://shopify.com/store/products/id=992831...</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-gray-900 dark:text-white">842</span>
                                                <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                                                    <span className="material-symbols-outlined text-[12px]">trending_flat</span> 0%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-500">Oct 22, 2023</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800">
                                                <span className="size-1.5 rounded-full bg-green-500"></span>
                                                Active
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-gray-400 hover:text-[#6467f2] hover:bg-[#6467f2]/10 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 3 - Expired */}
                                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400">
                                                    <span className="material-symbols-outlined text-[18px]">timer_off</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-500 text-sm line-through decoration-gray-400">shrt.co/flash-sale</span>
                                                    <span className="text-xs text-gray-400">Email Campaign</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 max-w-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="size-4 rounded-sm bg-gray-200 dark:bg-gray-600"></div>
                                                <p className="text-sm text-gray-400 truncate font-mono">https://example.com/promotions/expired</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-gray-500">2,105</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-500">Sep 15, 2023</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                                                <span className="size-1.5 rounded-full bg-amber-500"></span>
                                                Expired
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-gray-400 hover:text-[#6467f2] hover:bg-[#6467f2]/10 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Row 4 - Disabled */}
                                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded bg-[#e7e7f3] dark:bg-gray-700 text-[#6467f2] dark:text-[#8a8dff]">
                                                    <span className="material-symbols-outlined text-[18px]">link</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#0d0e1b] dark:text-white text-sm">shrt.co/meet-invite</span>
                                                    <span className="text-xs text-gray-400">Internal</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 max-w-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="size-4 rounded-sm bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] text-gray-500">Z</div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 truncate font-mono">https://zoom.us/j/1234567890?pwd=...</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-gray-900 dark:text-white">45</span>
                                                <span className="text-[11px] text-green-600 flex items-center gap-0.5">
                                                    <span className="material-symbols-outlined text-[12px]">trending_up</span> 2%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-500">Oct 01, 2023</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                                                <span className="size-1.5 rounded-full bg-gray-400"></span>
                                                Disabled
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-gray-400 hover:text-[#6467f2] hover:bg-[#6467f2]/10 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">content_copy</span>
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Footer */}
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-900 dark:text-white">1</span> to <span className="font-medium text-gray-900 dark:text-white">4</span> of <span className="font-medium text-gray-900 dark:text-white">128</span> results
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center justify-center size-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <button className="flex items-center justify-center size-8 rounded-lg bg-[#6467f2] text-white text-sm font-medium">1</button>
                                <button className="flex items-center justify-center size-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium">2</button>
                                <button className="flex items-center justify-center size-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium">3</button>
                                <span className="text-gray-400 text-sm px-1">...</span>
                                <button className="flex items-center justify-center size-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium">12</button>
                                <button className="flex items-center justify-center size-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LinksPage;
