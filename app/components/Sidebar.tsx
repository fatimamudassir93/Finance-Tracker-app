// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { Home, List, PlusCircle, DollarSign, LogOut, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useAuth } from '@/lib/auth';

const links = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/transactions', label: 'Transactions', icon: List },
  { href: '/dashboard/expense', label: 'Add Expense', icon: PlusCircle },
  { href: '/dashboard/income', label: 'Add Income', icon: DollarSign },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Notify Navbar when sidebar opens/closes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: isMobileMenuOpen }));
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
  };

  const SidebarContent = () => (
    <div className="p-4 space-y-2">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={clsx(
              'flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 group',
              isActive
                ? 'bg-indigo-700 text-white shadow-md'
                : 'text-gray-300 hover:bg-indigo-800 hover:text-white'
            )}
          >
            <Icon
              className={clsx(
                'w-5 h-5 transition-transform duration-300',
                isActive ? 'scale-110' : 'group-hover:scale-105'
              )}
            />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        );
      })}
      
      {isAuthenticated && (
        <div className="pt-4 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 text-gray-300 hover:bg-red-600 hover:text-white w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={clsx(
        'lg:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-900 shadow-lg z-50 transform transition-transform duration-300',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="pt-16">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 h-screen fixed top-0 left-0 bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-900 shadow-lg">
        <div className="pt-16">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
