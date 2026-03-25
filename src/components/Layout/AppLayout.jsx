import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, TrendingUp } from 'lucide-react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen text-dark-100">
      {/* Top Header */}
      <header className="sticky top-0 z-[45] h-16 border-b border-dark-800/80 bg-dark-950/85 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 rounded-xl text-dark-400 hover:text-white hover:bg-dark-800/50 transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight hidden sm:block">FinTrack</h1>
          </div>
        </div>
      </header>

      {/* Slide-over Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)] pb-24 lg:pb-12 flex-1">
        <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
}
