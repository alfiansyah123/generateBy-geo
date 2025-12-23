import React from 'react';

const ChartsSection = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Line Chart */}
            <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Click Performance</h3>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
                {/* Simulated Chart Area */}
                <div className="relative h-64 w-full flex items-end justify-between gap-2 pt-8">
                    {/* Y-Axis Lines (Background) */}
                    <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400 pointer-events-none z-0">
                        <div className="w-full border-b border-dashed border-slate-200 dark:border-slate-700 pb-2">1500</div>
                        <div className="w-full border-b border-dashed border-slate-200 dark:border-slate-700 pb-2">1000</div>
                        <div className="w-full border-b border-dashed border-slate-200 dark:border-slate-700 pb-2">500</div>
                        <div className="w-full border-b border-slate-300 dark:border-slate-600">0</div>
                    </div>
                    {/* Chart SVG line */}
                    <svg className="absolute inset-0 w-full h-full z-10 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Gradient Area */}
                        <defs>
                            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#6467f2" stopOpacity="0.2"></stop>
                                <stop offset="100%" stopColor="#6467f2" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>
                        <path d="M0,80 Q10,75 16,60 T32,50 T48,65 T64,40 T80,30 T100,10 V100 H0 Z" fill="url(#gradient)"></path>
                        {/* Line */}
                        <path d="M0,80 Q10,75 16,60 T32,50 T48,65 T64,40 T80,30 T100,10" fill="none" stroke="#6467f2" strokeLinecap="round" strokeWidth="3" vectorEffect="non-scaling-stroke"></path>
                    </svg>
                    {/* X-Axis Labels */}
                    <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs font-medium text-slate-500">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                    </div>
                </div>
                <div className="h-6"></div> {/* Spacer for x-axis */}
            </div>
            {/* Geo Widget */}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Locations</h3>
                    <button className="text-primary text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-6">
                    {/* Country Item */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPzLNPADQ92SvTqdajtv2Ti_Ie5fs59GRY9g5lRBkdy5IBqKjaho_1lvr53ux0wkhRB_CH1SiOd5nS8B08ljDejuSA_p9CyJ0Vgyo_ru1NownGnSd5B8ihuBNXDszNdFbn0eEtjxdOqbgSVA8eIsS9Ud1FV22CNBJOY-weSZpSIwfWV0lv5yz0iZzItYRoGAl7VW6tCpMiwFMm0Uqn5SBXQGB2IQEP2aniGX9Seh8NlYkWE7R7F6bPVVLL2bKJbYaYWM3rxjORh7I')" }}></div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">United States</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">45%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                    {/* Country Item */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBorDoyrmLTBOMRsza9MVMTgTCy62p4GaTpkSTdQGUJty-sg0sIQO1ktl6yq_X9iJTHAF5tHyPy-3JBriPXRSOASnxBN6fsHnPGECNSD9x66PilVPa-_YUqbMrWHNEzq2zS2Sd8Dtphg1CZOKt5lsXupUiA0vCmMkbOEwAht7uuLgqhlhr2jmbP7T_JllgWunO3yQJH1V7xrDxKguZ1QWQ7LlaHF-9N9oDabjXRXsITvF8KZU-WRr6rrhF5-_eW5gMl-zj0_zsnaQE')" }}></div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">Germany</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">12%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-purple-400 h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                    </div>
                    {/* Country Item */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGrTHgNtB4dKBRiB6KlgEDZjVgzBBBagBWH5ThnK-oH09sX6S-_lS8ep-6zuXkqQ0tdyHkfbKSKmQQkQjny8exxIGiZEWmBr0cQS4ahovupJI4KbI3GDwJD0BM49OMfH3bKuEk0P81Zybmdo6j7u7OgK6B481-9k2hyhPloxGIss0cZwDIlBUBjtu3-4sgHoTf-4z-sRR3oe3I8ggsDcNHVC2GpjoTvJ7To_ndgz1uhlwcNvwXour6aEjMDdo79nnD8El55hIucac')" }}></div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">Brazil</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">8%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '8%' }}></div>
                        </div>
                    </div>
                    {/* Country Item */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvaA5dpMoaNM47qT58h-pqDdW6nQSiheiB-IIN5Xn47eo-nFsDWigm7-UeeB8fXjAC6-Mxrq9Q5yXwF7MMKBMr1Pm1wUaZ1-x24_kpttLMCfQ_wnzeG_OYna47hJF1tECuBxYaWp1EKCVBs9Q4xgohAWjVvZy-GRrfUXReVfCcZEEIj4HBeE4L_4aQrGphKKrVgJMGuajMrd3SIx865mZIMHxXO94hETRnqkzVjc2VDQSrAKKt_-b1aR0RaFDxW4ViB7vSzcJI_2A')" }}></div>
                                <span className="font-medium text-slate-700 dark:text-slate-200">India</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">5%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                            <div className="bg-blue-400 h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;
