import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Briefcase } from 'lucide-react';

interface UserData {
  email: string;
  name: string;
  organization?: string;
  userType: 'recruiter' | 'candidate';
}

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userType?: 'recruiter' | 'candidate' | null;
  userData?: UserData | null;
  isAuthenticated?: boolean;
}

export function Header({ currentPage, onNavigate, userType, userData, isAuthenticated }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'for-recruiters', label: 'For Recruiters' },
    { id: 'for-candidates', label: 'For Candidates' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">InternLink</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated && navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === item.id
                    ? 'text-primary'
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated && userType && userData ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome {userType === 'recruiter' ? 'Recruiter' : 'Candidate'}, {userData.name.split(' ')[0]}!
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate('home')}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate('signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!isAuthenticated && navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600">
                      Welcome {userType === 'recruiter' ? 'Recruiter' : 'Candidate'}, {userData?.name.split(' ')[0]}!
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        onNavigate('home');
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        onNavigate('login');
                        setIsMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        onNavigate('signup');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}