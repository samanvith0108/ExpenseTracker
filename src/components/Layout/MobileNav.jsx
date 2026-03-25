import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  PlusCircle,
  Wallet,
  BarChart3,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'History', icon: ArrowLeftRight },
  { path: '/transactions/new', label: 'Add', icon: PlusCircle, isCenter: true },
  { path: '/budget', label: 'Budget', icon: Wallet },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden
      bg-dark-900/90 backdrop-blur-xl border-t border-dark-700/60
      safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center -mt-6"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-br from-primary-500 to-accent-500 shadow-primary-500/30 scale-110'
                    : 'bg-gradient-to-br from-primary-600 to-accent-600 shadow-primary-500/20'
                  }`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-[10px] mt-1 ${isActive ? 'text-primary-400' : 'text-dark-400'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center py-1 px-2"
            >
              <div className={`p-2 rounded-xl transition-all duration-200
                ${isActive ? 'text-primary-400 bg-primary-500/10' : 'text-dark-500'}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-primary-400 font-medium' : 'text-dark-500'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
