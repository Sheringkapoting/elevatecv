
import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface AuthFormProps {
  isSignUp: boolean;
  onSubmit: (data: { email: string; password: string }) => void;
  onToggleMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp, onSubmit, onToggleMode }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            onClick={onToggleMode}
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
  );
};

export default AuthForm;
