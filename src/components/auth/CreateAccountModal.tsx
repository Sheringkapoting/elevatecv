
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp: (data: { fullName: string; email: string; password: string }) => void;
  onToggleToSignIn: () => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onToggleToSignIn
}) => {
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data: { fullName: string; email: string; password: string }) => {
    onSignUp(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create an Account</DialogTitle>
          <DialogDescription>
            Create an account to save and manage your resumes.
          </DialogDescription>
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Sign Up Form - Removed social login options */}
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                placeholder="John Doe" 
                {...form.register('fullName', { required: true })} 
              />
            </div>
            
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
                onClick={onToggleToSignIn}
              >
                Already have an account? Sign In
              </Button>
            </div>
            
            <div className="text-right mt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountModal;
