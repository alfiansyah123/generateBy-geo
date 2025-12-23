import React, { useState, useEffect } from 'react';
import { domainsApi } from '../api/domains';

const CustomDomains = () => {
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showInstructions, setShowInstructions] = useState(null); // domain id to show instructions

    // TODO: Replace with your actual server IP or hostname when deploying
    const SERVER_IP = 'YOUR_SERVER_IP';
    const SERVER_HOSTNAME = 'app.yourdomain.com';

    useEffect(() => {
        loadDomains();
    }, []);

    const loadDomains = async () => {
        try {
            const data = await domainsApi.getAll();
            const safeDomains = Array.isArray(data) ? data : [];
            setDomains(safeDomains);
        } catch (error) {
            console.error("Failed to load domains", error);
            setDomains([]);
        }
    };

    const handleAddDomain = async (e) => {
        e.preventDefault();
        if (!newDomain) return;

        // Basic validation
        const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}$/;
        if (!domainPattern.test(newDomain)) {
            alert("Please enter a valid domain (e.g., link.mybrand.com)");
            return;
        }

        setIsLoading(true);
        try {
            const created = await domainsApi.create(newDomain);
            setNewDomain('');
            loadDomains();
            setShowInstructions(created.id); // Show instructions for newly added domain
        } catch (error) {
            console.error("Failed to add domain", error);
            alert("Failed to add domain");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this domain? Links using this domain will stop working.")) return;
        try {
            await domainsApi.delete(id);
            loadDomains();
            if (showInstructions === id) setShowInstructions(null);
        } catch (error) {
            console.error("Failed to delete domain", error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    return (
        <main className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Custom Domains</h1>
                    <p className="text-slate-500 dark:text-slate-400">Connect your own domains to brand your short links.</p>
                </div>

                {/* DNS Configuration Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                        <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">How to Connect Your Domain</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                After adding your domain below, configure your DNS with one of these options:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {/* Option A: A Record */}
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Option A: A Record</p>
                                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 rounded px-3 py-2">
                                        <code className="text-sm text-slate-700 dark:text-slate-300">A → {SERVER_IP}</code>
                                        <button onClick={() => copyToClipboard(SERVER_IP)} className="text-slate-400 hover:text-primary">
                                            <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Option B: CNAME */}
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Option B: CNAME Record</p>
                                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 rounded px-3 py-2">
                                        <code className="text-sm text-slate-700 dark:text-slate-300">CNAME → {SERVER_HOSTNAME}</code>
                                        <button onClick={() => copyToClipboard(SERVER_HOSTNAME)} className="text-slate-400 hover:text-primary">
                                            <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Domain Card */}
                <div className="bg-white dark:bg-[#1e2030] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add New Domain</h3>
                    <form onSubmit={handleAddDomain} className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="e.g. link.mybrand.com"
                                value={newDomain}
                                onChange={(e) => setNewDomain(e.target.value.toLowerCase())}
                                className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#25283d] px-4 py-2.5 text-slate-900 dark:text-white focus:ring-primary focus:border-primary"
                                required
                            />
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Use a subdomain like <code>go.yourdomain.com</code> or <code>link.yourdomain.com</code>
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 h-fit"
                        >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            {isLoading ? 'Adding...' : 'Add Domain'}
                        </button>
                    </form>
                </div>

                {/* Domain List */}
                <div className="bg-white dark:bg-[#1e2030] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Your Domains</h3>
                        <span className="text-sm text-slate-500">{domains.length} domain{domains.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="divide-y divide-slate-200 dark:divide-slate-800">
                        {domains.length === 0 ? (
                            <div className="p-8 text-center">
                                <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">language</span>
                                <p className="text-slate-500 dark:text-slate-400">No domains added yet</p>
                                <p className="text-sm text-slate-400 dark:text-slate-500">Add your first custom domain above!</p>
                            </div>
                        ) : (
                            domains.map((domain) => (
                                <div key={domain.id} className="flex flex-col">
                                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">{domain.name}</p>
                                                <p className="text-xs text-green-600 dark:text-green-400">Ready to use</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setShowInstructions(showInstructions === domain.id ? null : domain.id)}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                title="View DNS Instructions"
                                            >
                                                <span className="material-symbols-outlined">help</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(domain.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Delete Domain"
                                            >
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Expandable DNS Instructions */}
                                    {showInstructions === domain.id && (
                                        <div className="px-4 pb-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                                            <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                                                    Configure DNS for <strong>{domain.name}</strong>:
                                                </p>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 rounded px-3 py-2">
                                                        <span className="text-slate-500">Type:</span>
                                                        <code className="font-mono text-primary">A</code>
                                                        <span className="text-slate-500">|</span>
                                                        <span className="text-slate-500">Value:</span>
                                                        <code className="font-mono text-primary">{SERVER_IP}</code>
                                                    </div>
                                                    <p className="text-xs text-slate-500">or</p>
                                                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 rounded px-3 py-2">
                                                        <span className="text-slate-500">Type:</span>
                                                        <code className="font-mono text-primary">CNAME</code>
                                                        <span className="text-slate-500">|</span>
                                                        <span className="text-slate-500">Value:</span>
                                                        <code className="font-mono text-primary">{SERVER_HOSTNAME}</code>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-500 mt-3">
                                                    DNS changes may take up to 24-48 hours to propagate.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
};

export default CustomDomains;

