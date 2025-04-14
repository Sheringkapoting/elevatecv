
import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import SocialAuthButtons from './SocialAuthButtons';
import AuthForm from './AuthForm';

interface AuthDialogProps {
  isOpen: boolean;
  isSignUp: boolean;
  onOpenChange: (open: boolean) => void;
  onSocialSignIn: (provider: string) => void;
  onFormSubmit: (data: { email: string; password: string }) => void;
  onToggleMode: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ 
  isOpen, 
  isSignUp, 
  onOpenChange, 
  onSocialSignIn, 
  onFormSubmit,
  onToggleMode
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
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
          <SocialAuthButtons onSocialSignIn={onSocialSignIn} />
          
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

          <AuthForm 
            isSignUp={isSignUp}
            onSubmit={onFormSubmit}
            onToggleMode={onToggleMode}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthDialog;
