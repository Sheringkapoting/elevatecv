
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, BarChart2, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AuthDialog from './auth/AuthDialog';

const Navigation = () => {
  const location = useLocation();
  const [signInOpen, setSignInOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (data: { email: string; password: string }) => {
    // Simulate authentication
    console.log('Form data submitted:', data);
    toast.success(`${isSignUp ? 'Account created' : 'Signed in'} successfully!`);
    setSignInOpen(false);
  };

  const handleSocialSignIn = (provider: string) => {
    // Simulate social authentication
    console.log(`Signing in with ${provider}`);
    toast.success(`${provider} authentication initiated`);
    // In a real application, you would redirect to the provider's authentication page
    setTimeout(() => {
      toast.success(`Signed in with ${provider} successfully!`);
      setSignInOpen(false);
    }, 1000);
  };

  const navItems = [
    { name: 'Analyze Resume', path: '/', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Build Resume', path: '/builder', icon: <PlusCircle className="h-5 w-5" /> },
    { name: 'My Resumes', path: '/resumes', icon: <FileText className="h-5 w-5" /> }
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-brand-700">Elevate CV</span>
            </div>
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
          </div>
          <div className="flex items-center">
            <Button 
              variant="default" 
              className="ml-3 bg-brand-600 hover:bg-brand-700"
              onClick={() => setSignInOpen(true)}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
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

      <AuthDialog
        isOpen={signInOpen}
        isSignUp={isSignUp}
        onOpenChange={setSignInOpen}
        onSocialSignIn={handleSocialSignIn}
        onFormSubmit={handleSubmit}
        onToggleMode={() => setIsSignUp(!isSignUp)}
      />
    </nav>
  );
};

export default Navigation;
