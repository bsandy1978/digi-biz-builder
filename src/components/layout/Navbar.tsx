
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/cardUtils";

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-2xl text-brand-600">
            CardFolio
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Home
          </Link>
          <Link to="/features" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-brand-600 transition-colors">
            Pricing
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-brand-600 transition-colors">
                Dashboard
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-sm font-medium hover:text-brand-600 transition-colors">
                  Admin
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{getInitials(user?.name || '')}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 p-4 border-t bg-background shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link to="/features" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Features
              </Link>
              <Link to="/pricing" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <Link to="/profile" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/settings" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Settings
                  </Link>
                  <Button variant="ghost" className="justify-start" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
