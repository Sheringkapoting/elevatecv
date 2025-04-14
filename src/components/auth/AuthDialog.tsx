
import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog';
import SocialAuthButtons from './SocialAuthButtons';
import AuthForm from './AuthForm';
import AuthDivider from './AuthDivider';

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
  const title = isSignUp ? "Create an Account" : "Sign In";
  const description = isSignUp 
    ? "Create an account to save and manage your resumes." 
    : "Sign in to access your saved resumes and continue building your profile.";

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          <SocialAuthButtons onSocialSignIn={onSocialSignIn} />
          <AuthDivider />
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
