
import React from 'react';
import { Facebook, Linkedin } from 'lucide-react';
import SocialButton from './SocialButton';
import { toast } from 'sonner';

interface SocialAuthButtonsProps {
  onSocialSignIn: (provider: string) => void;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ onSocialSignIn }) => {
  const handleProviderClick = (provider: string, isAvailable: boolean) => {
    if (isAvailable) {
      // Map LinkedIn provider to the correct OIDC version when clicking the button
      const mappedProvider = provider.toLowerCase() === 'linkedin' ? 'linkedin_oidc' : provider;
      onSocialSignIn(mappedProvider);
    } else {
      toast.info(`${provider} login is not available right now. It will be made available soon.`);
    }
  };

  const socialProviders = [
    {
      name: 'Google',
      isAvailable: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="h-5 w-5">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          <path d="M1 1h22v22H1z" fill="none"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      isAvailable: false,
      icon: <Facebook className="h-5 w-5 text-blue-600" />
    },
    {
      name: 'Microsoft',
      isAvailable: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 text-blue-500">
          <path fill="currentColor" d="M11.5 0H0v11.5h11.5V0zm12.5 0H12.5v11.5H24V0zM11.5 12.5H0V24h11.5V12.5zm12.5 0H12.5V24H24V12.5z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      isAvailable: true,
      icon: <Linkedin className="h-5 w-5 text-blue-700" />
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {socialProviders.map(provider => (
        <SocialButton
          key={provider.name}
          provider={provider.name}
          icon={provider.icon}
          onClick={() => handleProviderClick(provider.name, provider.isAvailable)}
          disabled={!provider.isAvailable}
        />
      ))}
    </div>
  );
};

export default SocialAuthButtons;
