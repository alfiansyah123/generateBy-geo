import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { linksApi } from '../api/links';

import InterstitialPage from './InterstitialPage';

const RedirectHandler = () => {
    const { slug } = useParams();
    const [error, setError] = useState(null);
    const [finalUrl, setFinalUrl] = useState(null);
    const [showInterstitial, setShowInterstitial] = useState(false);

    useEffect(() => {
        const resolveLink = async () => {
            try {
                // 1. Get Link Details
                const links = await linksApi.getBySlug(slug);

                if (!links || links.length === 0) {
                    setError('Link not found');
                    return;
                }

                const link = links[0];
                let resolvedUrl = link.destination_url;
                let clientInfo = null;

                // --- BOT PROTECTION / CLOAKING ---
                const userAgent = navigator.userAgent.toLowerCase();
                const bots = [
                    'facebookexternalhit',
                    'twitterbot',
                    'whatsapp',
                    'telegrambot',
                    'discordbot',
                    'googlebot',
                    'bingbot',
                    'linkedinbot',
                    'skypeuripreview',
                    'facebot'
                ];

                const isBot = bots.some(bot => userAgent.includes(bot));

                if (isBot) {
                    console.log("Bot detected, redirecting to Safe Page.");
                    // SAFE PAGE: Redirect bots here (e.g., News, Wikipedia, Google)
                    window.location.href = 'https://news.google.com';
                    return; // Stop execution
                }
                // ---------------------------------

                // 2. Check for Geo-Targeting
                if (link.geo_targets && link.geo_targets.length > 0) {
                    try {
                        const geoResponse = await fetch('https://ipapi.co/json/');
                        const geoData = await geoResponse.json();
                        clientInfo = {
                            country: geoData.country_code,
                            ip: geoData.ip
                        };
                        const userCountry = clientInfo.country;

                        // Define Top Tier Countries
                        const TOP_TIER_COUNTRIES = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'NL', 'NZ', 'IE'];

                        const matchingRule = link.geo_targets.find(rule => {
                            if (rule.country_code === 'TOP_TIER') {
                                return TOP_TIER_COUNTRIES.includes(userCountry);
                            }
                            return rule.country_code === userCountry;
                        });

                        if (matchingRule) {
                            resolvedUrl = matchingRule.target_url;
                        }
                    } catch (geoError) {
                        console.error("Geo lookup failed, using default.");
                    }
                }

                if (resolvedUrl) {
                    // Construct Fake Cloaker URL
                    // Example: /_meetups/?country_code=us&user_agent=web&ip_address=198.145.121.235&target=...

                    const params = new URLSearchParams();

                    // Add "Fake" or Real Data
                    if (clientInfo) {
                        params.append('country_code', clientInfo.country?.toLowerCase() || 'us');
                        params.append('ip_address', clientInfo.ip || '127.0.0.1');
                    } else {
                        params.append('country_code', 'us');
                        params.append('ip_address', '127.0.0.1');
                    }

                    params.append('user_agent', 'web');

                    // Pass the REAL destination (obfuscated/encoded if needed, but here just query param)
                    params.append('target', encodeURIComponent(resolvedUrl));

                    const cloakerUrl = `/_meetups/?${params.toString()}`;

                    console.log("Redirecting to Cloaker:", cloakerUrl);
                    window.location.href = cloakerUrl;
                } else {
                    setError('No destination URL found');
                }

            } catch (err) {
                console.error("Redirect error:", err);
                setError('Failed to resolve link');
            }
        };

        if (slug) {
            resolveLink();
        }
    }, [slug]);

    // We no longer render InterstitialPage here directly
    // Logic is: Slug -> RedirectHandler -> /_meetups -> InterstitialPage -> Final Destination

    if (error) {
        return (
            <div className="flex bg-slate-50 dark:bg-[#0f111a] w-screen h-screen items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-full inline-flex mb-4">
                        <span className="material-symbols-outlined text-4xl">link_off</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Link Error</h1>
                    <p className="text-slate-500 dark:text-slate-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-slate-50 dark:bg-[#0f111a] w-screen h-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">{status}</p>
                <p className="text-xs text-slate-400">Secure Redirecting...</p>
            </div>
        </div>
    );
};

export default RedirectHandler;
