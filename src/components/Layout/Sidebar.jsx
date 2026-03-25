import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ArrowLeftRight,
  PlusCircle,
  Wallet,
  BarChart3,
  Sun,
  Moon,
  TrendingUp,
  X
} from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/transactions/new', label: 'Add New', icon: PlusCircle },
  { path: '/budget', label: 'Budget', icon: Wallet },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Sidebar({ isOpen, onClose }) {
  const { theme, toggleTheme } = useFinance();
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-dark-950/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-72 z-[60] flex flex-col
              bg-dark-900/95 backdrop-blur-xl border-r border-dark-700/60 shadow-2xl"
          >
            {/* Header / Logo */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-dark-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight">FinTrack</h1>
                  <p className="text-[11px] text-dark-400 -mt-0.5">Finance Analytics</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800/50 transition-all duration-200 lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className="relative block"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/15 to-accent-500/10 border border-primary-500/20"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <div
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive
                          ? 'text-primary-400 font-semibold'
                          : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/50'
                        }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-primary-400' : ''}`} />
                      <span className="text-sm">{item.label}</span>
                      {item.path === '/transactions/new' && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                      )}
                    </div>
                  </NavLink>
                );
              })}
            </nav>

            {/* Theme Toggle */}
            <div className="px-4 py-4 border-t border-dark-700/50 mt-auto">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-dark-400 hover:text-dark-200 hover:bg-dark-800/50 transition-all duration-200"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
                <span className="text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <div className="pt-4 text-center">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-dark-800/50 text-dark-400 text-sm font-medium hover:text-white hover:bg-dark-700/50 transition-all duration-200"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
