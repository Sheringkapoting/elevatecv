
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, BarChart2, PlusCircle, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  const navItems = [
    { name: 'Analyze Resume', path: '/analyze', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Build Resume', path: '/builder', icon: <PlusCircle className="h-5 w-5" /> },
    { name: 'My Resumes', path: '/resumes', icon: <FileText className="h-5 w-5" /> }
  ];

  // Don't show the navigation bar on the landing page if not logged in
  if (location.pathname === '/' && !user) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-brand-700">ElevateCV</Link>
            </div>
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                      location.pathname === item.path
                        ? "border-brand-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <Button 
                variant="ghost" 
                className="ml-3 flex items-center text-gray-600"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            ) : (
              location.pathname !== '/' && (
                <Button 
                  variant="default" 
                  className="ml-3 bg-brand-600 hover:bg-brand-700"
                  onClick={() => navigate('/')}
                >
                  Sign In
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {user && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 border-l-4 text-base font-medium",
                  location.pathname === item.path
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
