import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { linksApi } from '../api/links';
import { domainsApi } from '../api/domains';

const CreateLinkPage = () => {
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') === 'bulk' ? 'bulk' : 'single';
    const [activeTab, setActiveTab] = useState(initialTab);

    const [createdLinks, setCreatedLinks] = useState([]);

    // Form State
    const [destinationUrl, setDestinationUrl] = useState('');
    const [topTierUrl, setTopTierUrl] = useState('');
    const [domain, setDomain] = useState('shrt.lnk');
    const [slug, setSlug] = useState('');
    const [linkCount, setLinkCount] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [domains, setDomains] = useState([]);

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const data = await domainsApi.getAll();
                // Defensive check: Ensure data is an array
                const safeDomains = Array.isArray(data) ? data : [];
                setDomains(safeDomains);

                if (safeDomains.length > 0) {
                    setDomain(safeDomains[0].name);
                }
            } catch (err) {
                console.error("Failed to load domains", err);
                // Fallback to empty array on error
                setDomains([]);
            }
        };
        fetchDomains();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCreatedLinks([]); // Reset previous results

        try {
            // Generate random slug
            const generateRandomSlug = () => {
                const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                for (let i = 0; i < 12; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return result;
            };

            const createdLinksArray = [];
            const count = slug.trim() ? 1 : Math.min(Math.max(linkCount, 1), 100); // Max 100 links

            for (let i = 0; i < count; i++) {
                const finalSlug = slug.trim() || generateRandomSlug();

                const payload = {
                    destination_url: destinationUrl,
                    domain: domain,
                    slug: finalSlug,
                    geo_targets: topTierUrl ? [
                        {
                            country_code: 'TOP_TIER',
                            target_url: topTierUrl
                        }
                    ] : []
                };

                const response = await linksApi.create(payload);
                createdLinksArray.push(response);
            }

            setCreatedLinks(createdLinksArray);

            // Reset form
            setDestinationUrl('');
            setTopTierUrl('');
            setSlug('');
            setLinkCount(1);

        } catch (error) {
            console.error("Failed to create link:", error);
            alert("Failed to create link. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background-light dark:bg-background-dark">
            <div className="flex-1 overflow-y-auto">
                <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col w-full max-w-[800px] gap-8">


                        {/* Tabs */}
                        <div className="border-b border-slate-200 dark:border-slate-700">
                            <div className="flex gap-8">
                                <button
                                    onClick={() => setActiveTab('single')}
                                    className={`flex items-center justify-center border-b-2 pb-3 px-1 transition-colors ${activeTab === 'single' ? 'border-primary text-primary font-bold' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400 font-medium'}`}
                                >
                                    Single Link
                                </button>
                                <button
                                    onClick={() => setActiveTab('bulk')}
                                    className={`flex items-center justify-center border-b-2 pb-3 px-1 transition-colors ${activeTab === 'bulk' ? 'border-primary text-primary font-bold' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-400 font-medium'}`}
                                >
                                    Bulk Upload
                                </button>
                            </div>
                        </div>

                        {activeTab === 'single' ? (
                            /* Single Link Form */
                            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                                {/* Basic Information Card */}
                                <section className="bg-white dark:bg-[#1e2030] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="material-symbols-outlined text-primary">edit_square</span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Basic Information</h3>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        {/* Destination URL */}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="destination_url" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Default Destination URL (Link Kedua) <span className="text-red-500">*</span>
                                            </label>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                This is the fallback link for visitors from all countries <strong>EXCEPT</strong> Top Tier.
                                            </p>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                    <span className="material-symbols-outlined text-[20px]">link</span>
                                                </div>
                                                <input
                                                    type="url"
                                                    id="destination_url"
                                                    value={destinationUrl}
                                                    onChange={(e) => setDestinationUrl(e.target.value)}
                                                    className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#25283d] pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary sm:text-sm"
                                                    placeholder="https://example.com/fallback-link"
                                                    required
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        {/* Geo-Targeting (Top Tier) */}
                                        <div className="bg-slate-50 dark:bg-[#25283d] rounded-lg p-4 border border-slate-200 dark:border-slate-700/50 flex flex-col gap-4">
                                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                                                <div className="flex-1 w-full md:w-auto">
                                                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Country / Region</label>
                                                    <div className="relative">
                                                        <select className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1e2030] py-2.5 pl-3 pr-10 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm">
                                                            <optgroup label="Quick Groups">
                                                                <option value="top_tier">⭐ Top Tier Countries (US, UK, CA, AU, DE...)</option>
                                                            </optgroup>
                                                            <optgroup label="Countries">
                                                                <option value="US">United States</option>
                                                                <option value="GB">United Kingdom</option>
                                                                <option value="CA">Canada</option>
                                                                <option value="AU">Australia</option>
                                                                <option value="DE">Germany</option>
                                                                <option value="FR">France</option>
                                                                <option value="BR">Brazil</option>
                                                                <option value="ID">Indonesia</option>
                                                                <option value="IN">India</option>
                                                            </optgroup>
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                                                            <span className="material-symbols-outlined">expand_more</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-[2] w-full md:w-auto">
                                                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Target URL (Link Utama - Top Tier)</label>
                                                    <input
                                                        type="url"
                                                        value={topTierUrl}
                                                        onChange={(e) => setTopTierUrl(e.target.value)}
                                                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1e2030] px-3 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary sm:text-sm"
                                                        placeholder="https://toptier-offer.com (Link Utama)"
                                                    />
                                                </div>
                                                <button type="button" aria-label="Remove rule" className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Domain & Slug */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="flex flex-col gap-2 md:col-span-1">
                                                <label htmlFor="domain" className="text-sm font-medium text-slate-700 dark:text-slate-300">Domain</label>
                                                <div className="relative">
                                                    <select
                                                        id="domain"
                                                        value={domain}
                                                        onChange={(e) => setDomain(e.target.value)}
                                                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#25283d] py-3 pl-3 pr-10 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm appearance-none"
                                                    >
                                                        {domains.map((d) => (
                                                            <option key={d.id} value={d.name}>{d.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
                                                        <span className="material-symbols-outlined">expand_more</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 md:col-span-2">
                                                <label htmlFor="slug" className="text-sm font-medium text-slate-700 dark:text-slate-300">Custom Slug (Optional)</label>
                                                <div className="relative flex">
                                                    <span className="inline-flex items-center rounded-l-lg border border-r-0 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-[#1a1c35] px-3 text-slate-500 dark:text-slate-400 sm:text-sm">/</span>
                                                    <input
                                                        type="text"
                                                        id="slug"
                                                        value={slug}
                                                        onChange={(e) => setSlug(e.target.value)}
                                                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#25283d] px-3 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary sm:text-sm"
                                                        placeholder="summer-sale"
                                                    />
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Leave blank to auto-generate random slugs.</p>
                                            </div>
                                            {/* Number of Links - Only show when slug is empty */}
                                            {!slug.trim() && (
                                                <div className="flex flex-col gap-2 md:col-span-1">
                                                    <label htmlFor="linkCount" className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of Links</label>
                                                    <input
                                                        type="number"
                                                        id="linkCount"
                                                        min="1"
                                                        max="100"
                                                        value={linkCount}
                                                        onChange={(e) => setLinkCount(parseInt(e.target.value) || 1)}
                                                        className="block w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#25283d] px-3 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:border-primary focus:ring-primary sm:text-sm"
                                                        placeholder="1"
                                                    />
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Generate multiple links (max 100)</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Create Button inside card */}
                                    <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-700 mt-6">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">{isLoading ? 'progress_activity' : 'add_link'}</span>
                                            {isLoading ? 'Creating...' : 'Create Link'}
                                        </button>
                                    </div>
                                </section>

                                {/* Success Message Card - Below the form */}
                                {createdLinks.length > 0 && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 animate-fade-in-up">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="size-12 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center flex-shrink-0">
                                                <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">check_circle</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {createdLinks.length} Link{createdLinks.length > 1 ? 's' : ''} Created Successfully!
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                                            {createdLinks.map((link, index) => (
                                                <div key={index} className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg px-4 py-2 border border-slate-200 dark:border-slate-700">
                                                    <div className="flex items-center gap-2 text-primary font-medium text-sm truncate">
                                                        <a href={`http://${link.domain}/${link.slug}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                            {link.domain}/{link.slug}
                                                        </a>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(`http://${link.domain}/${link.slug}`)}
                                                        className="flex items-center gap-1 px-2 py-1 text-slate-500 hover:text-primary transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center mt-4">
                                            <button
                                                onClick={() => {
                                                    const allLinks = createdLinks.map(l => `http://${l.domain}/${l.slug}`).join('\n');
                                                    copyToClipboard(allLinks);
                                                }}
                                                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                                Copy All
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        ) : (
                            /* Bulk Upload Content */
                            <div className="flex flex-col gap-8">
                                {/* Upload Zone */}
                                <div className="group cursor-pointer">
                                    <div className="relative flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed border-[#e7e7f3] dark:border-slate-700 bg-white dark:bg-[#1a1c35] hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                            <div className="size-16 rounded-full bg-[#6467f2]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                                            </div>
                                            <p className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                                                <span className="text-primary">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                                                CSV, XLS, or XLSX files allowed. Max file size 5MB.
                                            </p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-[#4f52c9] font-bold transition-colors text-sm">
                                        <span className="material-symbols-outlined text-[18px]">download</span>
                                        Download Template
                                    </a>
                                </div>

                                {/* Post-Upload Preview Section */}
                                <div className="bg-white dark:bg-[#1e2030] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                    {/* Summary Stats */}
                                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-slate-400">analytics</span>
                                            Upload Summary
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Stat Card 1 */}
                                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-green-200 dark:border-green-900/50 shadow-sm flex items-center gap-4">
                                                <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">480</p>
                                                    <p className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wide">Ready to Shorten</p>
                                                </div>
                                            </div>
                                            {/* Stat Card 2 */}
                                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-yellow-200 dark:border-yellow-900/50 shadow-sm flex items-center gap-4">
                                                <div className="size-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">content_copy</span>
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                                                    <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400 uppercase tracking-wide">Duplicates Found</p>
                                                </div>
                                            </div>
                                            {/* Stat Card 3 */}
                                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-red-200 dark:border-red-900/50 shadow-sm flex items-center gap-4">
                                                <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                                                </div>
                                                <div>
                                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
                                                    <p className="text-xs font-medium text-red-700 dark:text-red-400 uppercase tracking-wide">Errors</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Data Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
                                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                                                <tr>
                                                    <th className="px-6 py-4" scope="col">Original URL</th>
                                                    <th className="px-6 py-4" scope="col">Custom Slug</th>
                                                    <th className="px-6 py-4" scope="col">Tags</th>
                                                    <th className="px-6 py-4" scope="col">Status</th>
                                                    <th className="px-6 py-4 text-right" scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                                {/* Row 1: Valid */}
                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="px-6 py-4 max-w-xs truncate font-medium text-slate-900 dark:text-white" title="https://example.com/products/marketing-campaign-2023/variant-a">
                                                        https://example.com/products/marketing-campaign-2023...
                                                    </td>
                                                    <td className="px-6 py-4">summer-sale-23</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                                            marketing
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                            <span className="size-1.5 rounded-full bg-green-500"></span>
                                                            Valid
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                                {/* Row 2: Duplicate */}
                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="px-6 py-4 max-w-xs truncate font-medium text-slate-900 dark:text-white" title="https://example.com/blog/how-to-optimize">
                                                        https://example.com/blog/how-to-optimize
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-400 italic">Auto-generated</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                                            blog
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 ml-1">
                                                            seo
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                                                            <span className="size-1.5 rounded-full bg-yellow-500"></span>
                                                            Duplicate
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                                {/* Row 3: Error */}
                                                <tr className="bg-red-50/30 dark:bg-red-900/10 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors">
                                                    <td className="px-6 py-4 max-w-xs truncate font-medium text-slate-900 dark:text-white">
                                                        htps://broken-link.com/missing-t
                                                    </td>
                                                    <td className="px-6 py-4">broken-link</td>
                                                    <td className="px-6 py-4 text-slate-400">-</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                                            <span className="size-1.5 rounded-full bg-red-500"></span>
                                                            Invalid Format
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                                {/* Row 4: Valid */}
                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="px-6 py-4 max-w-xs truncate font-medium text-slate-900 dark:text-white" title="https://example.com/shop/new-arrivals/shirts">
                                                        https://example.com/shop/new-arrivals/shirts
                                                    </td>
                                                    <td className="px-6 py-4">new-shirts-q3</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                                            shop
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                            <span className="size-1.5 rounded-full bg-green-500"></span>
                                                            Valid
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Table Footer / Pagination */}
                                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Showing 4 of 500 rows</span>
                                        <div className="flex items-center gap-2">
                                            <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 disabled:opacity-50" disabled>
                                                <span className="material-symbols-outlined">chevron_left</span>
                                            </button>
                                            <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500">
                                                <span className="material-symbols-outlined">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="flex items-center justify-end gap-4 pt-4 pb-12">
                                    <button type="button" className="px-6 py-3 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                                        Import & Shorten
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main >
    );
};

export default CreateLinkPage;
