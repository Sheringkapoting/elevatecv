
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: (data: { email: string; password: string }) => void;
  onSocialSignIn: (provider: string) => void;
  onToggleToSignUp: () => void;
  onForgotPassword: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSignIn,
  onSocialSignIn,
  onToggleToSignUp,
  onForgotPassword
}) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data: { email: string; password: string }) => {
    onSignIn(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Sign In</DialogTitle>
          <DialogDescription>
            Sign in to access your saved resumes and continue building your profile.
          </DialogDescription>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Social Sign In Buttons */}
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2"
            onClick={() => onSocialSignIn('google')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="h-5 w-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Continue with Google
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
            disabled
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Continue with Facebook
            <span className="text-xs">(Coming soon)</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2 opacity-60 cursor-not-allowed"
            disabled
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 text-blue-500">
              <path fill="currentColor" d="M11.5 0H0v11.5h11.5V0zm12.5 0H12.5v11.5H24V0zM11.5 12.5H0V24h11.5V12.5zm12.5 0H12.5V24H24V12.5z"/>
            </svg>
            Continue with Microsoft
            <span className="text-xs">(Coming soon)</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2"
            onClick={() => onSocialSignIn('linkedin_oidc')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-700">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            Continue with LinkedIn
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OR CONTINUE WITH
              </span>
            </div>
          </div>
          
          {/* Email/Password Form */}
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                {...form.register('email', { required: true })} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                {...form.register('password', { required: true })} 
              />
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <Button 
                type="button" 
                variant="link" 
                className="text-sm text-blue-600 p-0"
                onClick={onToggleToSignUp}
              >
                Don't have an account? Sign Up
              </Button>
              
              <Button 
                type="button" 
                variant="link" 
                className="text-sm text-blue-600 p-0"
                onClick={onForgotPassword}
              >
                Forgot Password?
              </Button>
            </div>
            
            <div className="text-right mt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
