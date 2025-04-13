import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { 
  Home, 
  User, 
  LogIn, 
  HelpCircle, 
  Menu, 
  X,
  Download,
  Star,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    closeMenu();
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/features', label: 'Features', icon: <Star className="h-5 w-5" /> },
    { path: '/how-it-works', label: 'How It Works', icon: <Download className="h-5 w-5" /> },
    { path: '/faq', label: 'FAQ', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  // Additional items based on auth status
  const authItems = user 
    ? [
        { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
        { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
        { action: handleLogout, label: 'Logout', icon: <LogIn className="h-5 w-5" /> }
      ]
    : [
        { path: '/auth', label: 'Login', icon: <LogIn className="h-5 w-5" /> }
      ];

  return (
    <>
      {/* Toggle Button - Fixed in corner */}
      <motion.button
        className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors duration-300"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X /> : <Menu />}
      </motion.button>

      {/* Overlay - Covers entire screen when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed top-16 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: -20, width: 0 }}
            animate={{ opacity: 1, y: 0, width: 'auto' }}
            exit={{ opacity: 0, y: -20, width: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 w-64">
              {/* User info if logged in */}
              {user && (
                <div className="border-b border-gray-100 dark:border-gray-700 pb-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Nav Links */}
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.li key={item.path} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.path}>
                      <a 
                        className={cn(
                          "flex items-center space-x-3 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
                          location === item.path ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-200"
                        )}
                        onClick={closeMenu}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {location === item.path && (
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-primary ml-auto"
                            layoutId="activeNav"
                          />
                        )}
                      </a>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Auth Links Section */}
              <div className="border-t border-gray-100 dark:border-gray-700 mt-3 pt-3">
                <ul className="space-y-2">
                  {authItems.map((item, index) => (
                    <motion.li key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (navItems.length + index) * 0.1 }}
                    >
                      {item.path ? (
                        <Link href={item.path}>
                          <a 
                            className={cn(
                              "flex items-center space-x-3 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700",
                              location === item.path ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-200"
                            )}
                            onClick={closeMenu}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                            {location === item.path && (
                              <motion.div 
                                className="w-1.5 h-1.5 rounded-full bg-primary ml-auto"
                                layoutId="activeAuthNav"
                              />
                            )}
                          </a>
                        </Link>
                      ) : (
                        <button
                          className="w-full flex items-center space-x-3 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                          onClick={item.action}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNav;