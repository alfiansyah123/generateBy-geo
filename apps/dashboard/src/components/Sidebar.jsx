import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';

const Sidebar = () => {
    const { logout } = useAuth();
    const { isCollapsed, toggleSidebar } = useSidebar();
    const navigate = useNavigate();

    // Helper function for active link styling
    const getLinkClass = ({ isActive }) => {
        const baseClass = `flex items-center gap-3 ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2.5 rounded-lg transition-all duration-200 group`;
        const activeClass = "bg-[#6467f2]/10 text-[#6467f2] dark:text-white font-bold";
        const inactiveClass = "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium";

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} flex flex-col justify-between bg-white dark:bg-[#1a1b2e] border-r border-gray-200 dark:border-gray-800 h-full flex-shrink-0 z-10 transition-all duration-300`}>
            <div className="flex flex-col gap-4 p-4">
                {/* Brand + Toggle */}
                <div className={`flex ${isCollapsed ? 'flex-col' : 'flex-row'} gap-3 items-center mb-4 ${isCollapsed ? 'px-0' : 'px-2'}`}>
                    <div className="size-10 bg-gradient-to-br from-[#6467f2] to-[#4f52c9] rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                        <span className="material-symbols-outlined text-white text-xl">link</span>
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col flex-1">
                            <h1 className="text-[#0d0e1b] dark:text-white text-base font-bold leading-normal">LinkManager</h1>
                            <p className="text-[#6467f2] text-xs font-semibold uppercase tracking-wider">Pro Plan</p>
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {!isCollapsed && <span className="text-xs font-medium">Collapse</span>}
                    <span className="material-symbols-outlined text-[20px]">
                        {isCollapsed ? 'chevron_right' : 'chevron_left'}
                    </span>
                </button>

                {/* Navigation */}
                <nav className="flex flex-col gap-1">
                    <NavLink to="/dashboard" className={getLinkClass} title="Dashboard">
                        <span className="material-symbols-outlined text-gray-500 group-[.font-bold]:text-[#6467f2] group-hover:text-[#6467f2]">dashboard</span>
                        {!isCollapsed && <span className="text-sm">Dashboard</span>}
                    </NavLink>
                    <NavLink to="/links" className={getLinkClass} title="Links">
                        <span className="material-symbols-outlined text-gray-500 group-[.font-bold]:fill box-content group-[.font-bold]:text-[#6467f2]">link</span>
                        {!isCollapsed && <span className="text-sm">Links</span>}
                    </NavLink>
                    <NavLink to="/custom-domains" className={getLinkClass} title="Custom Domains">
                        <span className="material-symbols-outlined text-gray-500 group-[.font-bold]:text-[#6467f2] group-hover:text-[#6467f2]">language</span>
                        {!isCollapsed && <span className="text-sm">Custom Domains</span>}
                    </NavLink>
                </nav>
            </div>

            {/* Logout Button (Bottom of Sidebar) */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-3 ${isCollapsed ? 'justify-center px-2' : 'px-3'} py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium`}
                    title="Logout"
                >
                    <span className="material-symbols-outlined">logout</span>
                    {!isCollapsed && <span className="text-sm">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
