
import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ) },
    { name: "My Cards", href: "/dashboard/cards", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
        <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9h3" />
      </svg>
    ) },
    { name: "Analytics", href: "/dashboard/analytics", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ) },
    { name: "Settings", href: "/dashboard/settings", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) }
  ];

  // Admin navigation items
  const adminNavigation = [
    { name: "Admin Dashboard", href: "/admin", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ) },
    { name: "Manage Users", href: "/admin/users", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" x2="19" y1="8" y2="14" />
        <line x1="22" x2="16" y1="11" y2="11" />
      </svg>
    ) }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/" className="font-bold text-xl text-brand-600">
              CardFolio
            </Link>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    location.pathname === item.href
                      ? "bg-brand-100 text-brand-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <div className={cn(
                    location.pathname === item.href
                      ? "text-brand-600"
                      : "text-gray-500 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0"
                  )}>
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              ))}
              
              {isAdmin && (
                <>
                  <div className="mt-8 pt-4 border-t border-gray-200">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Admin
                    </h3>
                    <div className="mt-1">
                      {adminNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={cn(
                            location.pathname === item.href
                              ? "bg-brand-100 text-brand-700"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                        >
                          <div className={cn(
                            location.pathname === item.href
                              ? "text-brand-600"
                              : "text-gray-500 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0"
                          )}>
                            {item.icon}
                          </div>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar button */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button 
          className="flex items-center justify-center" 
          size="icon"
          onClick={() => {
            const sidebar = document.getElementById('mobile-sidebar');
            if (sidebar) {
              sidebar.classList.toggle('translate-x-0');
              sidebar.classList.toggle('-translate-x-full');
            }
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
        </Button>
      </div>
      
      {/* Mobile sidebar */}
      <div 
        id="mobile-sidebar" 
        className="fixed inset-y-0 left-0 -translate-x-full transform transition-transform duration-300 ease-in-out z-40 md:hidden"
      >
        <div className="relative flex w-72 max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => {
                const sidebar = document.getElementById('mobile-sidebar');
                if (sidebar) {
                  sidebar.classList.remove('translate-x-0');
                  sidebar.classList.add('-translate-x-full');
                }
              }}
            >
              <span className="sr-only">Close sidebar</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-shrink-0 items-center px-4">
            <Link to="/" className="font-bold text-xl text-brand-600">
              CardFolio
            </Link>
          </div>
          
          <div className="mt-5 flex flex-1 flex-col">
            <nav className="flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    location.pathname === item.href
                      ? "bg-brand-100 text-brand-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                  )}
                  onClick={() => {
                    const sidebar = document.getElementById('mobile-sidebar');
                    if (sidebar) {
                      sidebar.classList.remove('translate-x-0');
                      sidebar.classList.add('-translate-x-full');
                    }
                  }}
                >
                  <div className={cn(
                    location.pathname === item.href
                      ? "text-brand-600"
                      : "text-gray-500 group-hover:text-gray-500",
                    "mr-4 flex-shrink-0"
                  )}>
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              ))}
              
              {isAdmin && (
                <>
                  <div className="mt-8 pt-4 border-t border-gray-200">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Admin
                    </h3>
                    <div className="mt-1">
                      {adminNavigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={cn(
                            location.pathname === item.href
                              ? "bg-brand-100 text-brand-700"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                          onClick={() => {
                            const sidebar = document.getElementById('mobile-sidebar');
                            if (sidebar) {
                              sidebar.classList.remove('translate-x-0');
                              sidebar.classList.add('-translate-x-full');
                            }
                          }}
                        >
                          <div className={cn(
                            location.pathname === item.href
                              ? "text-brand-600"
                              : "text-gray-500 group-hover:text-gray-500",
                            "mr-4 flex-shrink-0"
                          )}>
                            {item.icon}
                          </div>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
