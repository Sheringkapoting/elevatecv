import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, BarChart2, PlusCircle, Facebook, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const Navigation = () => {
  const location = useLocation();
  const [signInOpen, setSignInOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data) => {
    // Simulate authentication
    console.log('Form data submitted:', data);
    toast.success(`${isSignUp ? 'Account created' : 'Signed in'} successfully!`);
    setSignInOpen(false);
  };

  const handleSocialSignIn = (provider) => {
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
              <span className="text-xl font-bold text-brand-700">ElevateCV</span>
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

      {/* Sign In Dialog */}
      <AlertDialog open={signInOpen} onOpenChange={setSignInOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>{isSignUp ? "Create an Account" : "Sign In"}</AlertDialogTitle>
            <AlertDialogDescription>
              {isSignUp 
                ? "Create an account to save and manage your resumes." 
                : "Sign in to access your saved resumes and continue building your profile."
              }
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <Button variant="outline" onClick={() => handleSocialSignIn('Google')} className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="h-5 w-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                Continue with Google
              </Button>

              <Button variant="outline" onClick={() => handleSocialSignIn('Facebook')} className="flex items-center justify-center gap-2">
                <Facebook className="h-5 w-5 text-blue-600" />
                Continue with Facebook
              </Button>

              <Button variant="outline" onClick={() => handleSocialSignIn('Microsoft')} className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 text-blue-500">
                  <path fill="currentColor" d="M11.5 0H0v11.5h11.5V0zm12.5 0H12.5v11.5H24V0zM11.5 12.5H0V24h11.5V12.5zm12.5 0H12.5V24H24V12.5z"/>
                </svg>
                Continue with Microsoft
              </Button>

              <Button variant="outline" onClick={() => handleSocialSignIn('LinkedIn')} className="flex items-center justify-center gap-2">
                <Linkedin className="h-5 w-5 text-blue-700" />
                Continue with LinkedIn
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between mt-2">
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-xs text-blue-600"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                  </Button>
                  {!isSignUp && (
                    <Button type="button" variant="link" className="text-xs text-blue-600">
                      Forgot Password?
                    </Button>
                  )}
                </div>

                <div className="mt-4 text-right">
                  <Button type="submit" variant="default" className="bg-brand-600 hover:bg-brand-700">
                    {isSignUp ? "Create Account" : "Sign In"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
};

export default Navigation;
